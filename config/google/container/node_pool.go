package container

import (
	"devopsctl/config"
	"fmt"

	"github.com/hashicorp/hcl/v2/hclwrite"
	"github.com/zclconf/go-cty/cty"
)

type NodePool struct {
	Name     string
	Cluster  string
	Location string
	Autoscaling
	Management
	NodeLocations []string
	NodeConfig
	ProjectID string
	UpgradeSettings
}

type Autoscaling struct {
	Min int64
	Max int64
}

func (a *Autoscaling) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("min_node_count", cty.NumberIntVal(a.Min))
	b.SetAttributeValue("max_node_count", cty.NumberIntVal(a.Max))
	return b
}

type Management struct {
	AutoRepair  bool
	AutoUpgrade bool
}

func (m *Management) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("auto_repair", cty.BoolVal(m.AutoRepair))
	b.SetAttributeValue("auto_upgrade", cty.BoolVal(m.AutoUpgrade))
	return b
}

type NodeConfig struct {
	DiskSizeGb int64
	DiskType   string
	GcfsConfig bool
	Labels
	MachineType          string
	ServiceAccount       string
	ShieldedInstance     bool
	Tags                 []string
	WorkloadMetadataMode string
}

type Labels map[string]string

func (l Labels) ObjectParse() map[string]cty.Value {
	lMap := make(map[string]cty.Value)
	for k, v := range l {
		lMap[k] = cty.StringVal(v)
	}
	return lMap
}

func (n *NodeConfig) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("disk_size_gb", cty.NumberIntVal(n.DiskSizeGb))
	b.SetAttributeValue("disk_type", cty.StringVal(n.DiskType))
	gcfsBlk := b.AppendNewBlock("gcfs_config", nil)
	gcfsBody := gcfsBlk.Body()
	gcfsBody.SetAttributeValue("enabled", cty.BoolVal(n.GcfsConfig))
	b.SetAttributeValue("labels", cty.ObjectVal(config.ObjectParse(n.Labels)))
	b.SetAttributeValue("machine_type", cty.StringVal(n.MachineType))
	b.SetAttributeValue("service_account", cty.StringVal(n.ServiceAccount))
	shieldBlk := b.AppendNewBlock("shielded_instance_config", nil)
	shieldBody := shieldBlk.Body()
	shieldBody.SetAttributeValue("enable_secure_boot", cty.BoolVal(n.ShieldedInstance))
	if len(n.Tags) > 0 {
		b.SetAttributeValue("tags", cty.ListVal(config.ListStringParse(n.Tags)))
	}
	workMetaConfBlk := b.AppendNewBlock("workload_metadata_config", nil)
	workMetaConfBody := workMetaConfBlk.Body()
	workMetaConfBody.SetAttributeValue("mode", cty.StringVal(n.WorkloadMetadataMode))
	return b
}

type WorkloadMetadataConfig struct {
	Mode string
}

type UpgradeSettings struct {
	MaxSurge       int64
	MaxUnavailable int64
}

func (g *NodePool) Block() *hclwrite.Block {
	block := hclwrite.NewBlock("resource", []string{"google_container_node_pool", fmt.Sprintf("%s_%s", config.FormatResourceName(g.Name), config.FormatResourceName(g.Location))})
	body := block.Body()
	body.SetAttributeValue("cluster", cty.StringVal(g.Cluster))
	body.SetAttributeValue("location", cty.StringVal(g.Location))
	autoScalBlk := body.AppendNewBlock("autoscaling", nil)
	autoScalBody := autoScalBlk.Body()
	config.BodyParse(&g.Autoscaling, autoScalBody)
	manageBlk := body.AppendNewBlock("management", nil)
	manageBody := manageBlk.Body()
	config.BodyParse(&g.Management, manageBody)
	if len(g.NodeLocations) > 0 {
		body.SetAttributeValue("node_locations", cty.ListVal(config.ListStringParse(g.NodeLocations)))
	}
	body.SetAttributeValue("name", cty.StringVal(g.Name))
	nodeConfBlk := body.AppendNewBlock("node_config", nil)
	nodeConfBody := nodeConfBlk.Body()
	config.BodyParse(&g.NodeConfig, nodeConfBody)
	return block
}
