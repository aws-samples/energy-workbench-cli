import { Args, Command, Flags } from "@oclif/core";
import { MEMBER } from "@aws/energy-workbench-sdk";
import { displayGroupResults } from "../../utils/group/groupListTable";

export default class GroupList extends Command {
  static description = "List all groups for a specific member.";
  static examples = ["<%= config.bin %> <%= command.id %> user@testing.com"];

  static args = {
    memberToList: Args.string({
      required: true,
      description: "Member to list groups from.",
    }),
  };
  public async run(): Promise<void> {
    const { args, flags } = await this.parse(GroupList);
    const baseURL = "https://osdu.osdupsdemo.install.osdu.aws";
    const groupList = new MEMBER.Groups(baseURL, "us-east-1");
    const m = args.memberToList || "";
    const response = await groupList.query(m);
    displayGroupResults(response);
  }
}
