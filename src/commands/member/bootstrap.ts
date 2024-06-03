import { Args, Command, Flags } from "@oclif/core";
import { MEMBER } from "@aws/energy-workbench-sdk";
import { validateEnv } from "../../utils/config/config";
import * as fs from 'fs/promises';

export default class MemberBootstrap extends Command {
  static description = "Add a member to all the default groups needed to perform basic tasks.";
  static examples = [
    "<%= config.bin %> <%= command.id %> test@testing.com",
  ];

  static args = {
    memberName: Args.string({
      required: true,
      description: "Member to add to the groups.",
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(MemberBootstrap);
    const filePath = 'energy-workbench-cli/src/utils/group/groups.json';
    const config = validateEnv();

    try {
      const m = args.memberName || "";
      const r = "OWNER";
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      const memberAdd = new MEMBER.MemberAdd(config.endpoint, config.region);

      for (const category in data) {
        for (const item of data[category]) {
          const response = await memberAdd.add(item, m, r);
          console.log(`Response for ${item}:`, response);
        }
      }
    } catch (error) {
      console.error('Error processing the file:', error);
    }
  }
}
44