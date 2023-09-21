import { Args, Command, Flags } from "@oclif/core";
import { configure } from "../../utils/setup/configure";
import * as os from "os";
import { exportCreds } from "../../utils/setup/exports";

export default class SetupExportCreds extends Command {
  static description = "Exports credentials for use as environmental variables";

  static examples = [
    "<%= config.bin %> <%= command.id %> --profile 'example' --ApiKey 'yourKey' --ApiSecret 'abc123'",
  ];

  static flags = {
    // flag with a value (-s, --source=VALUE)
    path: Flags.string({
      char: "p",
      description: "Path to credentials file",
      default: `${os.homedir()}/.osdu/credentials`,
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(SetupExportCreds);

    this.log(`Exporting credentials from ${os.homedir()}/.osdu/credentials`);

    exportCreds(flags.path).then(() => {
      this.log("Credentials exported and now available for use!");
    });
  }
}
