package cmd

import (
	"fmt"
	"log"
	"os"
	"path"

	"github.com/spf13/cobra"
)

//tenantCmd represents the controller command
var tenantCmd = &cobra.Command{
	Use:   "tenant",
	Short: "Manipulate tenant config files",
	Long:  `Manipulate config files for a tenant to deploy apps to a Kubernetes platform`,
	Args:  cobra.ExactArgs(0),

	Run: func(cmd *cobra.Command, args []string) {

		r, err := os.Getwd()
		fmt.Println("WORKING DIR:", r)
		if err != nil {
			log.Fatal(err)
		}

		var tenantsDir = path.Join(r, "tenants", TenantName)

		var tenantConfigFilePath = path.Join(tenantsDir, "tenants.yaml")
		file, err := os.Create(tenantConfigFilePath)
		if err != nil {
			log.Fatal(err)
		}

		var tc = GetTenants()
		tc.File(tenantConfigFilePath)

		file.Close()

	},
}

//var (
//	EditTenantAdmins  bool
//	EditTenantEditors bool
//	EditTenantViewers bool
//)

func init() {
	rootCmd.AddCommand(tenantCmd)

	//tenantCmd.Flags().BoolVar(&EditTenantAdmins, "tenantAdmin", false, "Edit tenant admins")
	//tenantCmd.Flags().BoolVar(&EditTenantEditors, "tenantEditor", false, "Edit tenant editors")
	//tenantCmd.Flags().BoolVar(&EditTenantViewers, "tenantViewer", false, "Edit tenant viewers")
	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	//controllerCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	//controllerCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
