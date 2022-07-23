package container

import (
	"devopsctl/config"
	"fmt"

	"github.com/hashicorp/hcl/v2/hclwrite"
	"github.com/zclconf/go-cty/cty"
)

type Cluster struct {
	Name          string
	Location      string
	NodeLocations Locations
	AddonsConfig
	DatabaseEncryption
	Description               string
	EnableBinaryAuthorization bool
	EnableShieldedNodes       bool
	IpAllocationPolicy
	NetworkingMode string
	LoggingConfig
	MaintPolicy
	MasterAuthNetworksConfig
	MonitoringConfig
	Network string
	NetworkPolicy
	PrivateClusterConf
	ProjectID string
	ResourceLabels
	Subnetwork string
	WorkloadIdentConf
}

type Locations []string

func (l Locations) ListParse() []cty.Value {
	return config.ListStringParse(l)
}

type AddonsConfig struct {
	HorizontalPodAutoscaling bool
	HttpLb                   bool
	NetworkPolicyConf        bool
	GcpFstoreCsiDriverConf   bool
}

func (a *AddonsConfig) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	hpaBlock := b.AppendNewBlock("horizontal_pod_autoscaling", nil)
	hpaBody := hpaBlock.Body()
	hpaBody.SetAttributeValue("disabled", cty.BoolVal(a.HorizontalPodAutoscaling))
	httpLbBlock := b.AppendNewBlock("http_load_balancing", nil)
	httpLbBody := httpLbBlock.Body()
	httpLbBody.SetAttributeValue("disabled", cty.BoolVal(a.HttpLb))
	netPolConfBlk := b.AppendNewBlock("network_policy_config", nil)
	netPolConfBody := netPolConfBlk.Body()
	netPolConfBody.SetAttributeValue("disabled", cty.BoolVal(a.NetworkPolicyConf))
	GcpFstoreCsiDriverConfBlk := b.AppendNewBlock("gcp_filestore_csi_driver_config", nil)
	GcpFstoreCsiDriverConfBody := GcpFstoreCsiDriverConfBlk.Body()
	GcpFstoreCsiDriverConfBody.SetAttributeValue("enabled", cty.BoolVal(a.GcpFstoreCsiDriverConf))
	return b
}

type DatabaseEncryption struct {
	State   string
	KeyName string
}

func (d *DatabaseEncryption) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("state", cty.StringVal(d.State))
	b.SetAttributeValue("key_name", cty.StringVal(d.KeyName))
	return b
}

type IpAllocationPolicy struct {
	PodRangeName      string
	ServicesRangeName string
}

func (p *IpAllocationPolicy) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("cluster_secondary_range_name", cty.StringVal(p.PodRangeName))
	b.SetAttributeValue("services_secondary_range_name", cty.StringVal(p.ServicesRangeName))
	return b
}

type LoggingConfig struct {
	EnableComponents []string
}

func (l *LoggingConfig) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("enable_components", cty.ListVal(config.ListStringParse(l.EnableComponents)))
	return b
}

type MaintPolicy struct {
	DailyMaintenanceWindow
	RecurringWindow
	MaintenanceExclusion
}

type DailyMaintenanceWindow struct {
	Start string
}

func (d *DailyMaintenanceWindow) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("start_time", cty.StringVal(d.Start))
	return b
}

type RecurringWindow struct {
	Start      string
	End        string
	Recurrence string
}

func (r *RecurringWindow) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("start_time", cty.StringVal(r.Start))
	b.SetAttributeValue("end_time", cty.StringVal(r.End))
	b.SetAttributeValue("recurrence", cty.StringVal(r.Recurrence))
	return b
}

type MaintenanceExclusion struct {
	Start      string
	End        string
	Recurrence string
}

func (m *MaintenanceExclusion) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("start_time", cty.StringVal(m.Start))
	b.SetAttributeValue("end_time", cty.StringVal(m.End))
	b.SetAttributeValue("recurrence", cty.StringVal(m.Recurrence))
	return b
}

func (m *MaintPolicy) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	var dayMaint DailyMaintenanceWindow
	if m.DailyMaintenanceWindow != dayMaint {
		dayBlk := b.AppendNewBlock("daily_maintenance_window", nil)
		dayBody := dayBlk.Body()
		config.BodyParse(&m.DailyMaintenanceWindow, dayBody)
	}
	var recMaint RecurringWindow
	if m.RecurringWindow != recMaint {
		recBlk := b.AppendNewBlock("recurring_window", nil)
		recBody := recBlk.Body()
		config.BodyParse(&m.RecurringWindow, recBody)
	}
	var excludeMaint MaintenanceExclusion
	if m.MaintenanceExclusion != excludeMaint {
		excludeBlk := b.AppendNewBlock("maintenance_exclusion", nil)
		excludeBody := excludeBlk.Body()
		config.BodyParse(&m.MaintenanceExclusion, excludeBody)
	}
	return b
}

type MasterAuthNetworksConfig struct {
	CidrBlocks []AuthCidrBlock
}

type AuthCidrBlock struct {
	CidrBlock string
	Name      string
}

func (m *MasterAuthNetworksConfig) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	for _, v := range m.CidrBlocks {
		cidrBlk := b.AppendNewBlock("cidr_blocks", nil)
		cidrBody := cidrBlk.Body()
		cidrBody.SetAttributeValue("cidr_block", cty.StringVal(v.CidrBlock))
		cidrBody.SetAttributeValue("display_name", cty.StringVal(v.Name))
	}
	return b
}

type MonitoringConfig struct {
	EnableComponents []string
}

func (m *MonitoringConfig) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("enable_components", cty.ListVal(config.ListStringParse(m.EnableComponents)))
	return b
}

type NetworkPolicy struct {
	Provider string
	Enabled  bool
}

func (n *NetworkPolicy) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	if n.Provider != "" {
		b.SetAttributeValue("provider", cty.StringVal(n.Provider))
	} else {
		b.SetAttributeValue("provider", cty.StringVal("PROVIDER_UNSPECIFIED"))
	}
	b.SetAttributeValue("enabled", cty.BoolVal(n.Enabled))
	return b
}

type PrivateClusterConf struct {
	PrivateNodes        bool
	PrivateEndpoint     bool
	MasterIpv4CidrBlock string
}

func (p *PrivateClusterConf) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("enable_private_nodes", cty.BoolVal(p.PrivateNodes))
	b.SetAttributeValue("enable_private_endpoint", cty.BoolVal(p.PrivateEndpoint))
	b.SetAttributeValue("master_ipv4_cidr_block", cty.StringVal(p.MasterIpv4CidrBlock))
	return b
}

type ResourceLabels map[string]string

func (r ResourceLabels) ObjectParse() map[string]cty.Value {
	obj := make(map[string]cty.Value)
	for k, v := range r {
		obj[k] = cty.StringVal(v)
	}
	return obj
}

type WorkloadIdentConf struct {
	WorkloadPool string
}

func (w *WorkloadIdentConf) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	b.SetAttributeValue("workload_pool", cty.StringVal(w.WorkloadPool))
	return b
}

func (g *Cluster) Block() *hclwrite.Block {
	block := hclwrite.NewBlock("resource", []string{"google_container_cluster", fmt.Sprintf("%s_%s", config.FormatResourceName(g.Name), config.FormatResourceName(g.Location))})
	body := block.Body()
	body.SetAttributeValue("name", cty.StringVal(fmt.Sprintf("%s-%s", g.Name, g.Location)))
	body.SetAttributeValue("location", cty.StringVal(g.Location))
	if len(g.NodeLocations) > 0 {
		body.SetAttributeValue("node_locations", cty.ListVal(config.ListStringParse(g.NodeLocations)))
	}
	addonsBlk := body.AppendNewBlock("addons_config", nil)
	addonsBody := addonsBlk.Body()
	config.BodyParse(&g.AddonsConfig, addonsBody)
	if g.DatabaseEncryption.State == "ENCRYPTED" {
		dbEncBlk := body.AppendNewBlock("database_encryption", nil)
		dbEncBody := dbEncBlk.Body()
		config.BodyParse(&g.DatabaseEncryption, dbEncBody)
	}
	body.SetAttributeValue("description", cty.StringVal(g.Description))
	body.SetAttributeValue("enable_binary_authorization", cty.BoolVal(g.EnableBinaryAuthorization))
	body.SetAttributeValue("enable_shielded_nodes", cty.BoolVal(g.EnableShieldedNodes))
	body.SetAttributeValue("initial_node_count", cty.NumberIntVal(1))
	if g.NetworkingMode == "VPC_NATIVE" {
		ipAlocBlk := body.AppendNewBlock("ip_allocation_policy", nil)
		ipAlocBody := ipAlocBlk.Body()
		config.BodyParse(&g.IpAllocationPolicy, ipAlocBody)
	}
	body.SetAttributeValue("networking_mode", cty.StringVal(g.NetworkingMode))
	logConfBlk := body.AppendNewBlock("logging_config", nil)
	logConfBody := logConfBlk.Body()
	config.BodyParse(&g.LoggingConfig, logConfBody)
	maintPolBlk := body.AppendNewBlock("maintenance_policy", nil)
	maintPolBody := maintPolBlk.Body()
	config.BodyParse(&g.MaintPolicy, maintPolBody)
	authNetBlk := body.AppendNewBlock("master_authorized_networks_config", nil)
	authNetBody := authNetBlk.Body()
	config.BodyParse(&g.MasterAuthNetworksConfig, authNetBody)
	monitorBlk := body.AppendNewBlock("monitoring_config", nil)
	monitorBody := monitorBlk.Body()
	config.BodyParse(&g.MonitoringConfig, monitorBody)
	body.SetAttributeValue("network", cty.StringVal(g.Network))
	netPolBlk := body.AppendNewBlock("network_policy", nil)
	netPolBody := netPolBlk.Body()
	config.BodyParse(&g.NetworkPolicy, netPolBody)
	privClusterConfBlk := body.AppendNewBlock("private_cluster_config", nil)
	privClusterConfBody := privClusterConfBlk.Body()
	config.BodyParse(&g.PrivateClusterConf, privClusterConfBody)
	body.SetAttributeValue("project", cty.StringVal(g.ProjectID))
	body.SetAttributeValue("remove_default_node_pool", cty.BoolVal(true))
	body.SetAttributeValue("resource_labels", cty.ObjectVal(config.ObjectParse(g.ResourceLabels)))
	body.SetAttributeValue("subnetwork", cty.StringVal(g.Subnetwork))
	workIdentConfBlk := body.AppendNewBlock("workload_identity_config", nil)
	workIdentConfBody := workIdentConfBlk.Body()
	config.BodyParse(&g.WorkloadIdentConf, workIdentConfBody)
	return block
}
