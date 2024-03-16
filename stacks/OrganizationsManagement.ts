import { OrganizationsOrganization } from "@cdktf/provider-aws/lib/organizations-organization";
import { OrganizationsOrganizationalUnit } from "@cdktf/provider-aws/lib/organizations-organizational-unit";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";

export class OrganizationsManagement extends TerraformStack {
    readonly ou: OrganizationsOrganizationalUnit
    constructor(scope: Construct, id: string) {
        super(scope, id);

        new AwsProvider(this, "aws")

        const org = new OrganizationsOrganization(this, "organization", {
            featureSet: "ALL"
        })

        this.ou = new OrganizationsOrganizationalUnit(this, "ou", {
            name: "Demo-OU",
            parentId: org.roots.get(0).id
        })
    }
}