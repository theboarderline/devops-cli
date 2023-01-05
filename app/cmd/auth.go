package cmd

import (
	auth "devopsctl/gcp"
	"github.com/spf13/cobra"
	"log"
)

// controllerCmd represents the controller command
var authCmd = &cobra.Command{
	Use:   "auth",
	Short: "Authenticate with app hosting environment",
	Long:  "Authenticate with app hosting environment",
	Args:  cobra.ExactArgs(0),

	Run: func(cmd *cobra.Command, args []string) {

		log.Println("LIFECYCLE:", Lifecycle)

		if AppName == "" {
			log.Println("No app provided")
		}

		auth.Auth("p-platform-gke-project-qjo")

	},
}

func init() {
	rootCmd.AddCommand(authCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	//controllerCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	//controllerCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
