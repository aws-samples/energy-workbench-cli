import { Args, Command, Flags } from "@oclif/core";
import { configure } from "../../utils/setup/configure";
import * as os from "os";

export default class SetupCreds extends Command {
  static description = "Configures credentials and saves them to local file.";

  static examples = [
    "<%= config.bin %> <%= command.id %> --profile 'example' --ApiKey 'yourKey' --ApiSecret 'abc123'",
  ];

  static flags = {
    // flag with a value (-s, --source=VALUE)
    source: Flags.string({
      char: "p",
      description: "OSDU User Profile to Use",
      default: "default",
      required: false,
    }),
    format: Flags.string({
      char: "k",
      description: "API Key",
      required: false,
    }),
    display: Flags.string({
      char: "s",
      description: "API Secret",
      required: false,
    }),
  };

  static args = {
    encrypt: Args.string({
      description: "Encrypt secret",
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(SetupCreds);

    this.log(`Saving API Key to ${os.homedir()}/.osdu/credentials`);

    // configure();
  }
}
