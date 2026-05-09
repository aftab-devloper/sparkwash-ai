variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-1"
}

variable "key_name" {
  description = "EC2 Key Pair Name"
  type        = string
  default     = "sparkwash-key"
}

variable "db_password" {
  description = "RDS Database Password"
  type        = string
  default     = "SparkWash2026!"
  sensitive   = true
}
