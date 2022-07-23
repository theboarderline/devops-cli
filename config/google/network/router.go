package network

import (
	"devopsctl/config"
	"fmt"

	"github.com/hashicorp/hcl/v2/hclwrite"
	"github.com/zclconf/go-cty/cty"
)

type Router struct {
	Name    string
	Region  string
	Network string
	Bgp     Bgp
}

type Bgp struct {
	Asn int64
}

func (r *Router) Block() *hclwrite.Block {
	block := hclwrite.NewBlock("resource", []string{"google_compute_router", fmt.Sprintf("%s_%s_router", config.FormatResourceName(r.Name), config.FormatResourceName(r.Region))})
	body := block.Body()
	attrs := map[string]cty.Value{
		"name":    cty.StringVal(fmt.Sprintf("%s-%s", r.Name, r.Region)),
		"region":  cty.StringVal(r.Region),
		"network": cty.StringVal(r.Network),
	}
	for k, v := range attrs {
		body.SetAttributeValue(k, v)
	}
	bgpBlk := body.AppendNewBlock("bgp", nil)
	bgpBody := bgpBlk.Body()
	bgpBody.SetAttributeValue("asn", cty.NumberIntVal(r.Bgp.Asn))
	return block
}
