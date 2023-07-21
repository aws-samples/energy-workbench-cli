import { Args, Command, Flags } from "@oclif/core";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

const orange = chalk.hex("#FFA500");

async function welcome() {
  console.clear();
  console.log(
    chalk.hex("#FFA500")(
      figlet.textSync("OSDU Workbench", {
        font: "Banner3",
        horizontalLayout: "full",
        whitespaceBreak: true,
      })
    )
  );
  console.log(
    chalk.green(
      `\n\n🛠️  Get started building by following the prompts below...\n`
    )
  );
  console.log("\n");
}

export default class Start extends Command {
  static description =
    "Basic start command implements a command prompt input workflow.";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<void> {
    welcome();
    const choices = [
      "📩  query an api",
      "🚀  deploy a component",
      "🏗️  build a new component",
      "👋  get help",
    ];
    const prompt: any = await inquirer
      .prompt([
        {
          type: "list",
          message: "what would you like to build?",
          name: "start",
          choices: choices,
        },
      ])
      .then((answer: any) => {
        console.log(answer.build);
      });

    prompt.start;
  }
}
