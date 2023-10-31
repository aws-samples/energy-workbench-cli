import { Args, Command, Flags } from "@oclif/core";
import { MEMBER } from "@aws/energy-workbench-sdk";

export default class MemberAdd extends Command {
  static description = "Add a member to a specific group with a defined role.";
  static examples = [
    "<%= config.bin %> <%= command.id %> users.datalake.admins@osdu.example.com test@testing.com OWNER",
  ];

  static args = {
    groupName: Args.string({
      required: true,
      description: "Group to add member to.",
    }),
    memberName: Args.string({
      required: true,
      description: "Member to add to the group.",
    }),
    role: Args.string({
      required: true,
      description: "Role to add member with.",
    }),
  };
  public async run(): Promise<void> {
    const { args, flags } = await this.parse(MemberAdd);
    const baseURL = "https://osdu.osdupsdemo.install.osdu.aws";
    const memberAdd = new MEMBER.MemberAdd(baseURL, "us-east-1");

    const g = args.groupName || "";
    const m = args.memberName || "";
    const r = args.role || "";

    const response = await memberAdd.add(g, m, r);

    console.log(response);
  }
}
