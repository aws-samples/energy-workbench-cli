import { Args, Command, Flags } from "@oclif/core";
import { configure } from "../utils/setup/configure.js";
import * as os from "os";

export default class Config extends Command {
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
    const { args, flags } = await this.parse(Config);

    this.log(`Saving API Key to ${os.homedir()}/.osdu/credentials`);

    try {
      await configure(`${os.homedir()}/.osdu/`);
      this.log('Configuration completed successfully.');
    } catch (error) {
      this.error('Failed to configure.');
    }
  }
}
