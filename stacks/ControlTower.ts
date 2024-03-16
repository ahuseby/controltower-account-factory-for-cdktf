import { DataAwsServicecatalogProduct } from "@cdktf/provider-aws/lib/data-aws-servicecatalog-product";
import { DataAwsServicecatalogProvisioningArtifacts } from "@cdktf/provider-aws/lib/data-aws-servicecatalog-provisioning-artifacts";
import { ServicecatalogProvisionedProduct } from "@cdktf/provider-aws/lib/servicecatalog-provisioned-product";
import { Fn, TerraformStack, propertyAccess, ref } from "cdktf";
import { Construct } from "constructs";
import { DataAwsServicecatalogLaunchPaths } from "@cdktf/provider-aws/lib/data-aws-servicecatalog-launch-paths";

export class ControlTower extends TerraformStack {
    readonly accountId: string
    constructor(scope: Construct, id: string, ouId: string) {
        super(scope, id);

        const product = new DataAwsServicecatalogProduct(this, "sc_product", {
            id: "prod-xyz",
            // name: "AWS Control Tower Account Factory", // Hopefully in the future
        })
        const productLaunchPaths = new DataAwsServicecatalogLaunchPaths(this, "launch_paths", { productId: product.id })
        const artifacts = new DataAwsServicecatalogProvisioningArtifacts(this, "sc_product_artifacts", { productId: product.id })

        const accountName = "Demo-Account"
        const acc = new ServicecatalogProvisionedProduct(this, "demo_account", {
            name: accountName,
            productId: product.id,
            provisioningArtifactId: artifacts.provisioningArtifactDetails.get(Fn.index(propertyAccess(ref(artifacts.provisioningArtifactDetails.toString()), ["*", "active"]), true)).id,
            pathId: productLaunchPaths.summaries.get(Fn.index(propertyAccess(ref(productLaunchPaths.summaries.toString()), ["*", "name"]), "AWS Control Tower Account Factory Portfolio")).pathId,
            provisioningParameters: [
                { key: "AccountName", value: accountName },
                { key: "AccountEmail", value: "demo-account@example.com" },
                { key: "ManagedOrganizationalUnit", value: `Demo-OU (${ouId})` },
                { key: "SSOUserEmail", value: "whatever@example.com" },
                { key: "SSOUserFirstName", value: "FirstName" },
                { key: "SSOUserLastName", value: "LastName" }
            ]
        })
        this.accountId = acc.outputs.get(Fn.index(propertyAccess(ref(acc.toString()), ["*", "key"]), "AccountId")).value
    }
}