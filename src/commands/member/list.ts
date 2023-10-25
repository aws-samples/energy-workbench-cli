import {Args, Command, Flags} from '@oclif/core'
import { MEMBER } from "osdu-workbench-sdk";
import { displayMemberResults } from "../../utils/member/memberListTable";

export default class MemberList extends Command {
  static description = 'List all members for a specific group.'
  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = {
    groupToList: Args.string({ description: "Group to list members from" }),
  };
  public async run(): Promise<void> {
    const {args, flags} = await this.parse(MemberList)
    const baseURL = "https://osdu.osdupsdemo.install.osdu.aws";
    const member = new MEMBER.Members(baseURL, "us-east-1");
    const g = args.groupToList || "";
    const response = await member.query(g);
    displayMemberResults(response)
  }
}
