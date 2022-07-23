package network

import (
	"devopsctl/config"
	"fmt"

	"github.com/hashicorp/hcl/v2/hclwrite"
	"github.com/zclconf/go-cty/cty"
)

type Subnetwork struct {
	ProjectId     string
	Name          string
	Region        string
	Description   string
	Network       string
	Cidr          string
	PrivateAccess bool
	FlowLogs      bool
	PodCidr       string
	ServicesCidr  string
	LogMetadata   string
	SecondaryIPs  []SecondaryIP
}

type SecondaryIP struct {
	Name string
	Cidr string
}

func (s *SecondaryIP) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("range_name", cty.StringVal(s.Name))
	b.SetAttributeValue("ip_cidr_range", cty.StringVal(s.Cidr))
	return b
}

func (s *Subnetwork) Block() *hclwrite.Block {
	block := hclwrite.NewBlock("resource", []string{"google_compute_subnetwork", fmt.Sprintf("%s_%s_gke", config.FormatResourceName(s.Name), config.FormatResourceName(s.Region))})
	body := block.Body()
	attrs := map[string]cty.Value{
		"name":                     cty.StringVal(fmt.Sprintf("%s-%s", s.Name, s.Region)),
		"ip_cidr_range":            cty.StringVal(s.Cidr),
		"network":                  cty.StringVal(s.Network),
		"region":                   cty.StringVal(s.Region),
		"description":              cty.StringVal(s.Description),
		"private_ip_google_access": cty.BoolVal(s.PrivateAccess),
		"project":                  cty.StringVal(s.ProjectId),
	}
	for k, v := range attrs {
		body.SetAttributeValue(k, v)
	}
	body.AppendNewline()
	for _, v := range s.SecondaryIPs {
		blk := hclwrite.NewBlock("secondary_ip_range", nil)
		b := blk.Body()
		config.BodyParse(&v, b)
		body.AppendBlock(blk)
		body.AppendNewline()
	}
	logBlock := body.AppendNewBlock("log_config", nil)
	logBody := logBlock.Body()
	logBody.SetAttributeValue("metadata", cty.StringVal(s.LogMetadata))
	return block
}
