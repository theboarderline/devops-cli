
data "terraform_remote_state" "bootstrap" {
  backend = "remote"
  config = {
    organization = var.tf_org
    workspaces = {
      name = "gcp-org-bootstrap"
    }
  }
}


data "terraform_remote_state" "folders" {
  backend = "remote"
  config = {
    organization = var.tf_org
    workspaces = {
      name = "${var.lifecycle_name}-platform-folders"
    }
  }
}


data "terraform_remote_state" "network" {
  backend = "remote"
  config = {
    organization = var.tf_org
    workspaces = {
      name = "${var.lifecycle_name}-platform-folders"
    }
  }
}


data "terraform_remote_state" "app_projects" {
  backend = "remote"
  config = {
    organization = var.tf_org
    workspaces = {
      name = "gcp-application-projects"
    }
  }
}
