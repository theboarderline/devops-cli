package cmd

import (
	"devopsctl/config/yaml/basic"
	"devopsctl/repository"
	"fmt"
	"log"
	"os"
	"path"

	"github.com/spf13/cobra"
)

//controllerCmd represents the controller command
var appCmd = &cobra.Command{
	Use:   "app",
	Short: "Manipulate app config files",
	Long:  `Manipulate config files for an app deployed to a Kubernetes platform`,
	Args:  cobra.ExactArgs(0),

	Run: func(cmd *cobra.Command, args []string) {

		r, err := os.Getwd()
		fmt.Println("WORKING DIR:", r)
		if err != nil {
			log.Fatal(err)
		}

		if AppName == "" {
			log.Fatal("No app provided")
		}

		var tenantDir = path.Join(r, "tenants", TenantName)
		var appsDir = path.Join(tenantDir, "apps")

		_, err = repository.CreateDir(appsDir)
		if err != nil {
			log.Fatal(err)
		}

		Apps = GetApps()
		SaveApps(appsDir, Apps)

	},
}

var (
	Apps []tenants.App
)

func init() {
	rootCmd.AddCommand(appCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	//controllerCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	//controllerCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
