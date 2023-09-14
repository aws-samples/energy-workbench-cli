import { Args, Command, Flags, ux } from "@oclif/core";
import inquirer from "inquirer";
import * as templateMover from "../../utils/create/templates";
import delay from "../../utils/ui/delay";
import path from "path";

// OPTIONAL: you can set your template directory path as a custom path
// Do so by running the following command on linux.

// Set it temporarily
// export OWB_TEMPLATE_DIR=/path/to/templates

// Set it in your shell profile (insert your shell of choice)
// echo 'export OWB_TEMPLATE_DIR=/path/to/templates' >> ~/.bashrc

// Set it on windows
// $env:OWB_TEMPLATE_DIR = "C:\path\to\templates"
const templatesDir =
  process.env.OWB_TEMPLATE_DIR ||
  path.join(path.dirname(__filename), "../../../src/templates/boilerplate");

export default class CreateProject extends Command {
  static description = "Start new application or project from a template";

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

    const templateList = templateMover.listAllTemplates(templatesDir);

    const prompt: any = await inquirer.prompt([
      {
        type: "list",
        message: "what would you like to build?",
        name: "start",
        choices: templateList.templates,
      },
    ]);

    const answer = await prompt.start;

    console.log(answer);

    ux.action.start(`📦 Moving ${answer} templates`);

    await delay(3000);

    const selectedTemplateDir = path.join(
      path.dirname(__filename),
      "../../../src/templates",
      answer
    );

    const move = await templateMover.moveTemplateDirectory(
      selectedTemplateDir,
      process.cwd(),
      [
        {
          searchTerm: "APPLICATION_NAME",
          replaceWith: "OSDU Workbench Demo",
        },
      ]
    );
    ux.action.stop("✅");
    console.log(
      `Replaced all instances of APPLICATION_NAME with OSDU Workbench Demo`
    );
    console.log(`🚀 Moved ${answer} template to ${path.dirname(__filename)}`);
  }
}
