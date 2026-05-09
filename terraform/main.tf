terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.0"
}

provider "aws" {
  region = var.aws_region
}

# ─── VPC ───────────────────────────────────────────
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name    = "sparkwash-vpc"
    Project = "sparkwash"
  }
}

# ─── PUBLIC SUBNET ─────────────────────────────────
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name    = "sparkwash-public-subnet"
    Project = "sparkwash"
  }
}

# ─── PRIVATE SUBNET ────────────────────────────────
resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1b"

  tags = {
    Name    = "sparkwash-private-subnet"
    Project = "sparkwash"
  }
}

# ─── INTERNET GATEWAY ──────────────────────────────
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name    = "sparkwash-igw"
    Project = "sparkwash"
  }
}

# ─── ROUTE TABLE ───────────────────────────────────
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name    = "sparkwash-public-rt"
    Project = "sparkwash"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# ─── SECURITY GROUP (EC2) ──────────────────────────
resource "aws_security_group" "ec2" {
  name        = "sparkwash-ec2-sg"
  description = "SparkWash EC2 Security Group"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "SSH"
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP"
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS"
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "App Port"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "sparkwash-ec2-sg"
    Project = "sparkwash"
  }
}

# ─── SECURITY GROUP (RDS) ──────────────────────────
resource "aws_security_group" "rds" {
  name        = "sparkwash-rds-sg"
  description = "SparkWash RDS Security Group"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2.id]
    description     = "MySQL from EC2"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "sparkwash-rds-sg"
    Project = "sparkwash"
  }
}

# ─── EC2 INSTANCE ──────────────────────────────────
resource "aws_instance" "web" {
  ami                    = "ami-0eb38b817b93460ac"
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.ec2.id]
  key_name               = var.key_name

  tags = {
    Name    = "sparkwash-server-2"
    Project = "sparkwash"
  }
}

# ─── S3 BUCKET ─────────────────────────────────────
resource "aws_s3_bucket" "assets" {
  bucket = "sparkwash-assets-502867101229"

  tags = {
    Name    = "sparkwash-assets"
    Project = "sparkwash"
  }
}
