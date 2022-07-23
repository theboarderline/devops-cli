package network

import (
	"devopsctl/config"

	"github.com/hashicorp/hcl/v2/hclwrite"
	"github.com/zclconf/go-cty/cty"
)

type FirewallRule struct {
	Name              string
	Network           string
	ProjectID         string
	Description       string
	Direction         string
	Priority          int64
	DestRanges        FirewallRanges
	SrcRanges         FirewallRanges
	SrcTags           FirewallTags
	SrcSas            FirewallSas
	TargetTags        FirewallTags
	TargetSas         FirewallSas
	Allow             []Rule
	Deny              []Rule
	LogConfigMetadata string
}

type FirewallRanges []string

func (f FirewallRanges) ListParse() []cty.Value {
	return config.ListStringParse(f)
}

type FirewallTags []string

func (t FirewallTags) ListParse() []cty.Value {
	return config.ListStringParse(t)
}

type FirewallSas []string

func (s FirewallSas) ListParse() []cty.Value {
	return config.ListStringParse(s)
}

type Rule struct {
	Protocol string
	Ports    []string
}

func (r *Rule) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("protocol", cty.StringVal(r.Protocol))
	ports := make([]cty.Value, len(r.Ports))
	for i, v := range r.Ports {
		ports[i] = cty.StringVal(v)
	}
	b.SetAttributeValue("ports", cty.ListVal(ports))
	return b
}

func (r *FirewallRule) Block() *hclwrite.Block {
	block := hclwrite.NewBlock("resource", []string{"google_compute_firewall", config.FormatResourceName(r.Name)})
	body := block.Body()
	attrs := map[string]cty.Value{
		"name":        cty.StringVal(r.Name),
		"network":     cty.StringVal(r.Network),
		"project":     cty.StringVal(r.ProjectID),
		"description": cty.StringVal(r.Description),
		"direction":   cty.StringVal(r.Direction),
		"priority":    cty.NumberIntVal(r.Priority),
	}
	for k, v := range attrs {
		body.SetAttributeValue(k, v)
	}
	body.AppendNewline()
	for _, v := range r.Allow {
		blk := hclwrite.NewBlock("allow", nil)
		b := blk.Body()
		config.BodyParse(&v, b)
		body.AppendBlock(blk)
		body.AppendNewline()
	}
	for _, v := range r.Deny {
		blk := hclwrite.NewBlock("deny", nil)
		b := blk.Body()
		config.BodyParse(&v, b)
		body.AppendBlock(blk)
		body.AppendNewline()
	}

	lAttrs := map[string]config.ListParser{
		"destination_ranges":      r.DestRanges,
		"source_ranges":           r.SrcRanges,
		"source_tags":             r.SrcTags,
		"source_service_accounts": r.SrcSas,
		"target_tags":             r.TargetTags,
		"target_service_accounts": r.TargetSas,
	}
	for k, v := range lAttrs {
		if len(config.ListParse(v)) > 0 {
			body.SetAttributeValue(k, cty.ListVal(config.ListParse(v)))
		}
	}
	lBlk := body.AppendNewBlock("log_config", nil)
	lBody := lBlk.Body()
	lBody.SetAttributeValue("metadata", cty.StringVal(r.LogConfigMetadata))
	return block
}
