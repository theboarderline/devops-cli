package tenants

import (
	"fmt"
	"github.com/hashicorp/hcl/v2/hclwrite"
	"gopkg.in/yaml.v2"
	"log"
	"os"
)

type InfraLocation int64

const (
	Ops InfraLocation = iota
	Dev
	Stage
	Prod
)

type Lifecycle struct {
	Name           string
	Enabled        bool
	DeployLocation InfraLocation
}

type App struct {
	Name       string
	Domain     string
	Lifecycles []Lifecycle
	Admins     []Member
	Editors    []Member
	Viewers    []Member
	Enabled    bool
}

func (a *App) BodyParse(b *hclwrite.Body) *hclwrite.Body {
	return b
}

func (a App) File(configFile string) {

	d, err := yaml.Marshal(&a)
	if err != nil {
		log.Fatalf("error: %v", err)
	}
	fmt.Printf("--- t dump:\n%s\n\n", string(d))
	err = os.WriteFile(configFile, d, 0644)
	if err != nil {
		log.Fatalf("error: %v", err)
	}
}
