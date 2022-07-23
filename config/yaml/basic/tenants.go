package tenants

import (
	"fmt"
	"github.com/hashicorp/hcl/v2/hclwrite"
	"gopkg.in/yaml.v2"
	"log"
	"os"
)

type Tenant struct {
	Name    string
	Admins  []Member
	Editors []Member
	Viewers []Member
	Apps    []App
}

type Member struct {
	Id             string
	Email          string
	GithubUsername string
}

type TenantConfig struct {
	Tenants []Tenant
}

func (t *Tenant) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	return b
}

func (t Tenant) File(configFile string) {

	d, err := yaml.Marshal(&t)
	if err != nil {
		log.Fatalf("error: %v", err)
	}
	fmt.Printf("--- t dump:\n%s\n\n", string(d))
	err = os.WriteFile(configFile, d, 0644)
	if err != nil {
		log.Fatalf("error: %v", err)
	}
}

func (tc TenantConfig) File(configFile string) {

	d, err := yaml.Marshal(&tc)
	if err != nil {
		log.Fatalf("error: %v", err)
	}
	fmt.Printf("--- t dump:\n%s\n\n", string(d))
	err = os.WriteFile(configFile, d, 0644)
	if err != nil {
		log.Fatalf("error: %v", err)
	}
}
