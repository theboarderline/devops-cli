package cmd

import (
	tenants "devopsctl/config/yaml/basic"
	"devopsctl/repository"
	"fmt"
	"log"
	"os"
	"path"
)

func GetMembers(s string) []tenants.Member {
	fmt.Println("\nNew", s, ":")

	var ms []tenants.Member
	var done = false
	for !done {
		fmt.Print("Enter member's identifier (e.g. first name): ")
		var id string
		fmt.Scanln(&id)

		fmt.Print("Enter member's email address: ")
		var email string
		fmt.Scanln(&email)

		fmt.Print("Enter member's Github username: ")
		var githubUsername string
		fmt.Scanln(&githubUsername)

		fmt.Print("Add another member? (y/n): ")
		var cont string
		fmt.Scanln(&cont)
		if cont == "n" {
			done = true
		}

		member := tenants.Member{Id: id, Email: email, GithubUsername: githubUsername}
		ms = append(ms, member)
	}
	return ms
}

func GetTenant() tenants.Tenant {
	fmt.Println("\nNEW TENANT")

	fmt.Print("Enter tenant name (e.g. team1): ")
	var name string
	fmt.Scanln(&name)

	var tenant = tenants.Tenant{Name: name}

	tenant.Admins = GetMembers("TENANT ADMIN")
	//tenant.Editors = GetMembers("TENANT EDITOR")
	//tenant.Viewers = GetMembers("TENANT VIEWER")
	tenant.Apps = GetApps()

	return tenant
}

func GetApp() tenants.App {
	fmt.Println("\nNEW app")

	fmt.Print("Enter app name (e.g. myapp): ")
	var name string
	fmt.Scanln(&name)

	fmt.Print("Enter app domain (e.g. example.com): ")
	var domain string
	fmt.Scanln(&domain)

	var app = tenants.App{Name: name, Domain: domain, Enabled: true}

	//app.Lifecycles = GetLifecycles()
	//app.Admins = GetMembers("APP ADMIN")
	//app.Editors = GetMembers("APP EDITOR")
	//app.Viewers = GetMembers("APP VIEWER")

	return app
}

func GetTenants() tenants.TenantConfig {
	fmt.Println("\nAdding new tenants")
	var tenantConfig tenants.TenantConfig
	var done = false
	for !done {
		tenantConfig.Tenants = append(tenantConfig.Tenants, GetTenant())

		fmt.Print("Add another tenant? (y/n): ")
		var cont string
		fmt.Scanln(&cont)
		if cont == "n" {
			done = true
		}
	}
	return tenantConfig
}

func GetApps() []tenants.App {
	fmt.Println("\nAdding new apps")
	var apps []tenants.App
	var done = false
	for !done {
		apps = append(apps, GetApp())

		fmt.Print("Add another app? (y/n): ")
		var cont string
		fmt.Scanln(&cont)
		if cont == "n" {
			done = true
		}
	}
	return apps
}

func GetLifecycles() []tenants.Lifecycle {
	fmt.Println("Enter additional lifecycle besides dev, test, stage, prod:")
	var cycles []tenants.Lifecycle
	var done = false
	for !done {
		fmt.Print("Enter lifecycle name: ")
		var name string
		fmt.Scanln(&name)

		fmt.Print("Add another lifecycle? (y/n): ")
		var cont string
		fmt.Scanln(&cont)
		if cont == "n" {
			done = true
		}

		cycle := tenants.Lifecycle{Name: name}
		cycles = append(cycles, cycle)
	}
	return cycles
}

func SaveApps(appsDir string, apps []tenants.App) {
	for i, a := range apps {
		fmt.Println("APP:", i, a)

		_, err := repository.CreateDir(appsDir)
		if err != nil {
			log.Fatal(err)
		}

		var appConfigFilePath = path.Join(appsDir, fmt.Sprintf("%s.yaml", a.Name))
		file, err := os.Create(appConfigFilePath)
		if err != nil {
			log.Fatal(err)
		}
		a.File(appConfigFilePath)

		file.Close()
	}
}
