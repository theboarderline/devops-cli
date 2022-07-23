

variable "lifecycle_name" {
  description = "Lifecycle name"
  type        = string
}


variable "github_owner" {
  description = "Github org name"
  type        = string
  default     = "theboarderline"
}


variable "tf_org" {
  description = "TF Cloud org name"
  type        = string
  default     = "lakegames"
}


variable "repo_name" {
  description = "DNS Domain"
  type        = string
  default     = "coleman"
}


variable "domain" {
  description = "DNS Domain"
  type        = string
  default     = "colemangroupsolutions.com"
}


variable "admin" {
  description = "Storage bucket admin for private bucket"
  type        = string
  default     = "user:colemangroupsolutions@gmail.com"
}


variable "disabled" {
  description = "Whether triggers and DNS/IP should be disabled"
  type        = bool
  default     = false
}


variable "use_helm" {
  description = "Whether triggers should deploy with helm"
  type        = bool
  default     = true
}


