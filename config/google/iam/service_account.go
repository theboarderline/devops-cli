package iam

import (
	"devopsctl/config"
	"fmt"

	"github.com/hashicorp/hcl/v2/hclwrite"
	"github.com/zclconf/go-cty/cty"
)

type ServiceAccount struct {
	Name        string
	DisplayName string
	Description string
	ProjectID   string
}

func (s *ServiceAccount) Block() *hclwrite.Block {
	block := hclwrite.NewBlock("resource", []string{"google_service_account", fmt.Sprintf("%s", config.FormatResourceName(s.Name))})
	body := block.Body()
	body.SetAttributeValue("account_id", cty.StringVal(s.Name))
	body.SetAttributeValue("display_name", cty.StringVal(s.DisplayName))
	body.SetAttributeValue("description", cty.StringVal(s.Description))
	body.SetAttributeValue("project", cty.StringVal(s.ProjectID))
	return block
}
