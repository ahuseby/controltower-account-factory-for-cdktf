# controltower-account-factory-for-cdktf

This repo demonstrates how it is possible to provision new accounts in Control Tower using IaC by provisioning the AWS Service Catalog Product in Terraform/CDKTF. This is how Control Tower provisions a new account when done manually from the Console.

## Please note

* The code in this repo has not been tested in AWS.
* The configuration assumes a landing zone is already set up in Control Tower. You may want to take a look at the [aws_controltower_landing_zone](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/controltower_landing_zone) resoure.
  * Due to a current limitation in the [aws_servicecatalog_portfolio](https://registry.terraform.io/providers/hashicorp/aws/5.41.0/docs/data-sources/servicecatalog_portfolio) and [aws_servicecatalog_product](https://registry.terraform.io/providers/hashicorp/aws/5.41.0/docs/data-sources/servicecatalog_product) data sources, not having a `name` argument, this configuration will have to be run twice. First with with the `aws_controltower_landing_zone` resource, then another run with the Service Catalog resources. This is because the portfolio ID and product ID is not known until the landing zone is ready.