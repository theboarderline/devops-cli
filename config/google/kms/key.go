package kms

import (
	"devopsctl/config"
	"fmt"

	"github.com/hashicorp/hcl/v2/hclwrite"
	"github.com/zclconf/go-cty/cty"
)

type Key struct {
	Name           string
	KeyRing        string
	RotationPeriod string
}

func (k *Key) Block() *hclwrite.Block {
	block := hclwrite.NewBlock("resource", []string{"google_kms_crypto_key", fmt.Sprintf("%s", config.FormatResourceName(k.Name))})
	body := block.Body()
	body.SetAttributeValue("name", cty.StringVal(k.Name))
	body.SetAttributeValue("key_ring", cty.StringVal(k.KeyRing))
	body.SetAttributeValue("rotation_period", cty.StringVal(k.RotationPeriod))
	lifeCycleBlk := body.AppendNewBlock("lifecycle", nil)
	lifeCycleBody := lifeCycleBlk.Body()
	lifeCycleBody.SetAttributeValue("prevent_destroy", cty.BoolVal(true))
	return block
}
