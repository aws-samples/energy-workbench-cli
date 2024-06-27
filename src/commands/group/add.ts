import { Args, Command, Flags } from "@oclif/core";
import { GROUP } from "@aws/energy-workbench-sdk";
import { validateEnv } from "../../utils/config/config.js";

export default class GroupAdd extends Command {
  static description = "Adds a group";
  static examples = ["<%= config.bin %> <%= command.id %>"];

  static args = {
    groupToAdd: Args.string({ description: "Group to add" }),
  };
  public async run(): Promise<void> {
    const { args, flags } = await this.parse(GroupAdd);

    const config = validateEnv();

    const group = new GROUP.GroupAdd(config.endpoint, config.region);

    const g = args.groupToAdd || "";

    const response = await group.add(g);

    console.log(JSON.stringify(response, null, 2));
  }
}
