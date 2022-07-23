package project

import "github.com/hashicorp/hcl/v2/hclwrite"

type ProjectData struct{}

func (p *ProjectData) Block() *hclwrite.Block {
	block := hclwrite.NewBlock("data", []string{"google_project", "project"})
	return block
}
