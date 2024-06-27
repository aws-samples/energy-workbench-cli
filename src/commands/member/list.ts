import { Args, Command, Flags } from "@oclif/core";
import { MEMBER } from "@aws/energy-workbench-sdk";
import { displayMemberResults } from "../../utils/member/memberListTable.js";
import { validateEnv } from "../../utils/config/config.js";

export default class MemberList extends Command {
  static description = "List all members for a specific group.";
  static examples = [
    "<%= config.bin %> <%= command.id %> users.datalake.admins@osdu.example.com",
  ];

  static args = {
    groupToList: Args.string({
      required: true,
      description: "Group to list members from.",
    }),
  };
  public async run(): Promise<void> {
    const { args, flags } = await this.parse(MemberList);

    const config = validateEnv();

    const member = new MEMBER.Members(config.endpoint, config.region);
    const g = args.groupToList || "";
    const response = await member.query(g);
    displayMemberResults(response);
  }
}
