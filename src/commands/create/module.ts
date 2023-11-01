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
  path.join(path.dirname(__filename), "../../../src/templates/constructs");

export default class CreateModule extends Command {
  static description = "Add a new module to an existing project";

  static examples = [
    "<%= config.bin %> <%= command.id %> 'app' --template 'example' --git 'true' --cicd 'true'",
  ];

  static args = {
    template: Args.string({
      description: "Template",
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(CreateModule);

    const templateList = templateMover.listAllTemplates(templatesDir);

    const prompt: any = await inquirer.prompt([
      {
        type: "list",
        message: "\n🏗️ what module would you like to add?\n",
        name: "start",
        choices: templateList.templates,
      },
    ]);

    const answer = await prompt.start;
    ux.action.stop();

    ux.action.start(`📦 Moving ${answer} templates`);
    const bar = ux.progress();
    bar.start(200, 0);
    await delay(3000);
    bar.update(100);
    await delay(3000);
    bar.stop();

    await delay(3000);

    const selectedTemplateDir = path.join(templatesDir, answer);

    const move = await templateMover.moveTemplateDirectory(
      selectedTemplateDir,
      process.cwd(),
      [
        {
          searchTerm: "APPLICATION_NAME",
          replaceWith: "Enerdy Workbench Demo",
        },
      ]
    );
    ux.action.stop("✅");
    console.log(
      `Replaced all instances of APPLICATION_NAME with Energy Workbench Demo`
    );
    console.log(`🚀 Moved ${answer} template to ${path.dirname(__filename)}`);
  }
}
