resource "aws_dynamodb_table" "specialty_data" {
  name           = "${local.prefix}-specialty-data"
  billing_mode   = "PAY_PER_REQUEST"
  read_capacity  = 0
  write_capacity = 0
  hash_key       = "specialty"

  attribute {
    name = "specialty"
    type = "S"
  }

  point_in_time_recovery {
    enabled = false
  }

  tags = local.common_tags

}

resource "aws_dynamodb_table" "specialty_providers" {
  name           = "${local.prefix}-specialty-providers"
  billing_mode   = "PAY_PER_REQUEST"
  read_capacity  = 0
  write_capacity = 0
  hash_key       = "specialty"
  range_key      = "provider"

  attribute {
    name = "specialty"
    type = "S"
  }

  attribute {
    name = "provider"
    type = "S"
  }

  point_in_time_recovery {
    enabled = false
  }

  tags = local.common_tags
}

resource "aws_dynamodb_table" "provider_availability" {
  name           = "${local.prefix}-provider-availability"
  billing_mode   = "PAY_PER_REQUEST"
  read_capacity  = 0
  write_capacity = 0
  hash_key       = "specialty"
  range_key      = "provider"

  attribute {
    name = "specialty"
    type = "S"
  }

  attribute {
    name = "provider"
    type = "S"
  }

  point_in_time_recovery {
    enabled = false
  }

  tags = local.common_tags
}
