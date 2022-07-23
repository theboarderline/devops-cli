package kms

import (
	"devopsctl/config"
	"fmt"

	"github.com/hashicorp/hcl/v2/hclwrite"
	"github.com/zclconf/go-cty/cty"
)

type Keyring struct {
	Name      string
	Location  string
	ProjectID string
}

func (k *Keyring) Block() *hclwrite.Block {
	block := hclwrite.NewBlock("resource", []string{"google_kms_key_ring", fmt.Sprintf("%s_%s", config.FormatResourceName(k.Name), config.FormatResourceName(k.Location))})
	body := block.Body()
	body.SetAttributeValue("name", cty.StringVal(k.Name))
	body.SetAttributeValue("location", cty.StringVal(k.Location))
	body.SetAttributeValue("project", cty.StringVal(k.ProjectID))
	return block
}
