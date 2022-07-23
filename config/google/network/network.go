package network

import (
	"devopsctl/config"
	"fmt"

	"github.com/hashicorp/hcl/v2/hclwrite"
	"github.com/zclconf/go-cty/cty"
)

type Network struct {
	ProjectId         string
	Name              string
	Description       string
	AutoCreateSubnets bool
	RoutingMode       string
	DeleteRoutes      bool
}

func (n *Network) Block() *hclwrite.Block {
	block := hclwrite.NewBlock("resource", []string{"google_compute_network", fmt.Sprintf("%s_network", config.FormatResourceName(n.Name))})
	body := block.Body()
	attrs := map[string]cty.Value{
		"name":                            cty.StringVal(n.Name),
		"project":                         cty.StringVal(n.ProjectId),
		"description":                     cty.StringVal(n.Description),
		"auto_create_subnetworks":         cty.BoolVal(n.AutoCreateSubnets),
		"routing_mode":                    cty.StringVal(n.RoutingMode),
		"delete_default_routes_on_create": cty.BoolVal(n.DeleteRoutes),
	}
	for k, v := range attrs {
		body.SetAttributeValue(k, v)
	}
	return block
}
