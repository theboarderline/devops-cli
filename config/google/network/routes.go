package network

import (
	"devopsctl/config"

	"github.com/hashicorp/hcl/v2/hclwrite"
	"github.com/zclconf/go-cty/cty"
)

type Route struct {
	Name             string
	Description      string
	Network          string
	DestinationRange string
	Tags             string
	Priority         int64
	NextHopGateway   string
}

func (r *Route) Block() *hclwrite.Block {
	block := hclwrite.NewBlock("resource", []string{"google_compute_route", config.FormatResourceName(r.Name)})
	body := block.Body()
	attrs := map[string]cty.Value{
		"name":             cty.StringVal(r.Name),
		"dest_range":       cty.StringVal(r.DestinationRange),
		"network":          cty.StringVal(r.Network),
		"priority":         cty.NumberIntVal(r.Priority),
		"description":      cty.StringVal(r.Description),
		"next_hop_gateway": cty.StringVal(r.NextHopGateway),
	}
	for k, v := range attrs {
		body.SetAttributeValue(k, v)
	}
	return block
}
