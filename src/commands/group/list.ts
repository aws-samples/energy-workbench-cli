import { Command } from "@oclif/core";
import { GROUP } from "@aws/energy-workbench-sdk";
import { displayGroupResults } from "../../utils/group/groupListTable.js";
import { validateEnv } from "../../utils/config/config.js";

export default class GroupSearch extends Command {
  static description = "List all groups for a specific instance.";
  static examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<void> {
    try {
 
      // Validate environment configuration
      const config = validateEnv();

      // Initialize GROUP object and fetch group list
      const group = new GROUP.GroupList(config.endpoint, config.region);
      const response = await group.query();

      // Display the results
      displayGroupResults(response);
    } catch (error) {
      if (error instanceof Error) {
        this.error(`Error fetching group list: ${error.message}`);
      } else {
        this.error('An unknown error occurred');
      }
    }
  }
}
