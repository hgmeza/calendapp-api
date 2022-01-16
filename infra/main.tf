terraform {
  backend "s3" {
    bucket         = "calendapp-ops-tfstate"
    key            = "ops.tfstate"
    region         = "us-east-2"
    encrypt        = true
    dynamodb_table = "calendapp-ops-tfstate-lock"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.34.0"
    }
  }
}

provider "aws" {
  region = var.region
}

locals {
  prefix = "calendapp-${var.environment}"
  common_tags = {
    Environment        = var.environment
    Project            = "calendapp"
    ManagedBy          = "Terraform"
    TerraformWorkspace = terraform.workspace
  }
}
