import { App } from "cdktf";
import { OrganizationsManagement } from "./stacks/OrganizationsManagement";
import { ControlTower } from "./stacks/ControlTower";

const app = new App();

const orgMgmt = new OrganizationsManagement(app, "org_mgmt")

new ControlTower(app, "ct", orgMgmt.ou.id)

app.synth();
