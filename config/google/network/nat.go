package network

import (
	"devopsctl/config"
	"fmt"

	"github.com/hashicorp/hcl/v2/hclwrite"
	"github.com/zclconf/go-cty/cty"
)

type Nat struct {
	Name                     string
	Router                   string
	Region                   string
	NatIpAllocateOption      string
	SrcSubnetworkIpRangesNat string
	LogConfig                NatLogConfig
}

type NatLogConfig struct {
	Enable bool
	Filter string
}

func (n *Nat) Block() *hclwrite.Block {
	block := hclwrite.NewBlock("resource", []string{"google_compute_router_nat", fmt.Sprintf("%s_%s_nat", config.FormatResourceName(n.Name), config.FormatResourceName(n.Region))})
	body := block.Body()
	attrs := map[string]cty.Value{
		"name":                               cty.StringVal(fmt.Sprintf("%s-%s", n.Name, n.Region)),
		"router":                             cty.StringVal(n.Router),
		"region":                             cty.StringVal(n.Region),
		"nat_ip_allocate_option":             cty.StringVal(n.NatIpAllocateOption),
		"source_subnetwork_ip_ranges_to_nat": cty.StringVal(n.SrcSubnetworkIpRangesNat),
	}
	for k, v := range attrs {
		body.SetAttributeValue(k, v)
	}
	logBlk := body.AppendNewBlock("log_config", nil)
	logBody := logBlk.Body()
	logBody.SetAttributeValue("enable", cty.BoolVal(n.LogConfig.Enable))
	logBody.SetAttributeValue("filter", cty.StringVal(n.LogConfig.Filter))
	return block
}
