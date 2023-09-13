import { Args, Command, Flags } from "@oclif/core";
import { create } from "./operations/create";

export default class CreateProject extends Command {
  static description = "Start new application or project";

  static examples = [
    "<%= config.bin %> <%= command.id %> 'app' --template 'example' --git 'true' --cicd 'true'",
  ];

  static flags = {
    // flag with a value (-s, --source=VALUE)
    git: Flags.string({
      char: "g",
      description: "Option for creating git repository",
      default: "true",
      required: false,
    }),
    cicd: Flags.string({
      char: "c",
      description: "Option to include cicd pipeline.",
      default: "github",
      required: false,
    }),
  };

  static args = {
    template: Args.string({
      description: "Template",
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(CreateProject);

    this.log(
      `Creating new ${args.template} with Git repository: ${flags.git} and CICD of type: ${flags.cicd}.`
    );

    create(flags);
  }
}
