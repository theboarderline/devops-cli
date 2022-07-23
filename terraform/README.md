# Terraform Workspace: Application

This is the Terraform workspace directory for deploying application resources like Cloudbuild Triggers, Artifact Registries, and DNS resources.

<img alt="Terraform" src="https://www.terraform.io/assets/images/logo-text-8c3ba8a6.svg" width="600px">

Documentation is available on the [Terraform website](http://www.terraform.io):

- [Intro](https://www.terraform.io/intro/index.html)
- [Docs](https://www.terraform.io/docs/index.html)

## Developer Setup

- [Install Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html)
  - Mac/Linux users should use [tfenv](https://github.com/tfutils/tfenv) to manage Terraform versions. If you use homebrew, `brew install tfenv`.
  - `tfenv use` will automatically install and use the Terraform version specified in the `.terraform-version` file.
- In root directory, run `terraform login` to connect to authenticate with TFC Cloud. Then `terraform init`; now you'll be able to see your proposed changes by running `terraform plan`
- The preferred IDE for Terraform is [VS Code](https://code.visualstudio.com/download)
- Install the [Terraform VS Code plugin](https://marketplace.visualstudio.com/items?itemName=mauve.terraform)
- Use the VS Code workspace settings from the `.vscode` directory (should be applied automatically). Among other settings, this will trigger `terraform fmt` to format your HCL code per default settings on save.
- Install [TFLint](https://github.com/terraform-linters/tflint#installation) to lint Terraform code and catch errors. After install, run `tflint --install` to configure out AWS linting settings.
- Install [pre-commit](https://pre-commit.com/#installation). Then run `pre-commit install` to install linting and other commands as pre-commit git hooks. You can also run these manually at any time via `pre-commit run`.

## Local development workflow

- Use `tflint`, `terraform validate` as you write Terraform code to help you understand and validate the impact of your changes. These are defined as VS Code tasks.
  - **Pro tip**: Use `pre-commit run` (either via CLI or VS Code task) to bundle all these helpers into single command.
- Use `terraform plan` locally to run plans against the remote Terraform Cloud backend
  - **Pro tip**: Use `grep` to summarize locally-run `plan` output and see only the resources names that are changing, like `terraform plan | grep destroy`.

## Deploys

All deploys are managed from the [The Boarderline Terraform Cloud Account](https://app.terraform.io/app/lakegames/workspaces)

## Coding Standards

When writing code, keep inclusivity and diversity in mind. Avoid using non-inclusive terms, unnecessarily violent, ableist, or gendered language. There isn't a comprehensive list of what we should avoid, but follow these suggestions if you think something is questionable.

- Consult [Google's Documentation Style Guide](https://developers.google.com/style/inclusive-documentation) for more examples.
- Ask team members for opinions and advice.

## Naming

- **Folder/File Names:**
  - Separate words with underscores e.g. `worker_farm`
- **Terraform Variable Names:**
  - Separate words with underscores e.g. `worker_template`
  - _For resources,_ don't repeat their type in names, since resources are accessed in code with `{resource_type}.{resource_name}` e.g. use `backlog_per_instance`, not `backlog_per_instance_lambda_function`
  - _For module instances,_ be specific and include the module name, since module names are not used when accessing module instances in code with `module.{module_instance_name}`
- **AWS Resource Names:**
  - Separate words with dashes e.g. `s-farm-use1-stream-ingest`
  - Use environment prefixes: `p` for production, `t` for Thor, `s` for Stage, etc.


<!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | = 1.0.9 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_google"></a> [google](#provider\_google) | n/a |
| <a name="provider_google-beta"></a> [google-beta](#provider\_google-beta) | n/a |
| <a name="provider_terraform"></a> [terraform](#provider\_terraform) | n/a |

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_dns"></a> [dns](#module\_dns) | app.terraform.io/hudl-aml/dns/google | n/a |

## Resources

| Name | Type |
|------|------|
| [google-beta_google_artifact_registry_repository.docker_repos](https://registry.terraform.io/providers/hashicorp/google-beta/latest/docs/resources/google_artifact_registry_repository) | resource |
| [google_cloudbuild_trigger.cloudbuild_trigger](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloudbuild_trigger) | resource |
| [terraform_remote_state.automl_projects](https://registry.terraform.io/providers/hashicorp/terraform/latest/docs/data-sources/remote_state) | data source |
| [terraform_remote_state.gke](https://registry.terraform.io/providers/hashicorp/terraform/latest/docs/data-sources/remote_state) | data source |
| [terraform_remote_state.network](https://registry.terraform.io/providers/hashicorp/terraform/latest/docs/data-sources/remote_state) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_artifact_repo_names"></a> [artifact\_repo\_names](#input\_artifact\_repo\_names) | Name of Artifact Registry docker repos in GCP | `list(string)` | <pre>[<br>  "automl-repo"<br>]</pre> | no |
| <a name="input_domain"></a> [domain](#input\_domain) | DNS Domain | `string` | `"igniteme.dev"` | no |
| <a name="input_filename"></a> [filename](#input\_filename) | Cloudbuild script filepath | `string` | `"sample-app/cloudbuild.yaml"` | no |
| <a name="input_github_owner"></a> [github\_owner](#input\_github\_owner) | Github repo owner | `string` | `"hudl"` | no |
| <a name="input_lifecycle_name"></a> [lifecycle\_name](#input\_lifecycle\_name) | Lifecycle name | `string` | n/a | yes |
| <a name="input_repo_name"></a> [repo\_name](#input\_repo\_name) | Name of application code repo in Github | `string` | `""` | no |

## Outputs

No outputs.
<!-- END_TF_DOCS -->
