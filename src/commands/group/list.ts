import { Args, Command, Flags } from "@oclif/core";
import { GROUP } from "@aws/energy-workbench-sdk";
import { displayGroupResults } from "../../utils/group/groupListTable";
import { validateEnv } from "../../utils/config/config";

export default class GroupSearch extends Command {
  static description = "List all groups for a specific instance.";
  static examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(GroupSearch);

    const config = validateEnv();

    const group = new GROUP.GroupList(config.endpoint, config.region);
    const response = await group.query();

    displayGroupResults(response);
  }
}
