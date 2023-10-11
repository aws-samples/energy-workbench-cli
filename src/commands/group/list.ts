import {Args, Command, Flags} from '@oclif/core'
import { Group } from "osdu-workbench-sdk";
import { displayGroupResults } from "../../utils/group/groupListTable";

export default class GroupSearch extends Command {
  static description = 'Run entitlements for a given instance'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  static args = {
    file: Args.string({description: 'file to read'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(GroupSearch)
    const baseURL = "https://osdu.osdupsdemo.install.osdu.aws";
    const group = new Group.GroupClient(baseURL, "us-east-1");
    const response = await group.query();

    displayGroupResults(response);

  // console.log(response);
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
