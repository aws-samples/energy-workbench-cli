import { Args, Command, Flags } from "@oclif/core";
import { MEMBER } from "@aws/energy-workbench-sdk";
import { validateEnv } from "../../utils/config/config.js";
import * as fs from 'fs/promises';

export default class MemberBootstrap extends Command {
  static description = "Adds a member to all the default groups needed to perform basic tasks.";
  static examples = [
    "<%= config.bin %> <%= command.id %> test@testing.com osdu example.com",
  ];

  static args = {
    memberName: Args.string({
      required: true,
      description: "Member to add to the groups.",
    }),
    partitionName: Args.string({
      required: true,
      description: "Partition to add the members to.",
    }),
    domainName: Args.string({
      required: true,
      description: "Domain to add the members to.",
    }),
  };

  public async run(): Promise<void> {
    const { args: { memberName, partitionName, domainName }, flags } = await this.parse(MemberBootstrap);
    const filePath = './src/utils/group/groups.json';
    const { endpoint, region } = validateEnv();

    try {
      const memberRole = "OWNER";
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      const memberAdd = new MEMBER.MemberAdd(endpoint, region);

      for (const category in data) {
        for (const item of data[category]) {
          const groupEmail = item + '@' + partitionName + '.' + domainName;
          console.log(`Adding ${memberName} to ${groupEmail}`);
          const response = await memberAdd.add(groupEmail, memberName, memberRole);
          console.log(`Response for ${item}: ${response}`);
        }
      }
    } catch (error) {
      console.error('Error processing the file:', error);
    }
  }
}