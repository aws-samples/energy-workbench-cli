import { Args, Command, Flags } from "@oclif/core";
import { configure } from "../utils/setup/configure.js";
import * as os from "os";
import { exportEnv } from "../utils/setup/exports.js";

export default class Export extends Command {
  static description = "Export credentials to local command line session.";

  static examples = ["<%= config.bin %> <%= command.id %> --profile 'example'"];

  static flags = {
    // flag with a value (-s, --source=VALUE)
    profile: Flags.string({
      char: "p",
      description: "Local configuration profile to use",
      default: "default",
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Export);

    try {
      await exportEnv(
        flags.profile || "default",
        `${os.homedir()}/.osdu/configuration`,
        "OSDU"
      );

      await exportEnv(
        flags.profile || "default",
        `${os.homedir()}/.osdu/credentials`,
        "OSDU"
      );

      this.log('Credentials exported successfully.');
    } catch (error) {
      this.error('Failed to export credentials.');
    }
  }
}
