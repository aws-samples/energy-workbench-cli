import {Args, Command, Flags} from '@oclif/core'
import { GROUP } from "osdu-workbench-sdk";

export default class GroupAdd extends Command {
  static description = 'Adds a group'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = {
    groupToAdd: Args.string({ description: "Group to add" }),
  };
  public async run(): Promise<void> {
    const {args, flags} = await this.parse(GroupAdd)
    const baseURL = "https://osdu.osdupsdemo.install.osdu.aws";
    const group = new GROUP.GroupAdd(baseURL, "us-east-1");

    const g = args.groupToAdd || "";

    const response = await group.add(g);

    console.log(JSON.stringify(response, null, 2))

  }
}
