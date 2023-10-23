import { Args, Command, Flags } from "@oclif/core";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import { configure } from "../utils/setup/configure";

const orange = chalk.hex("#FFA500");

async function welcome() {
  console.clear();
  console.log(
    chalk.hex("#FFA500")(
      figlet.textSync("EDI Workbench", {
        font: "Banner3",
        horizontalLayout: "full",
        whitespaceBreak: true,
      })
    )
  );
  console.log(
    chalk.green(
      `\n\n🛠️  Get started with your workbench by following the prompts below...\n`
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
      "🔐  configure credentials",
      "📩  query an api",
      "🚀  deploy a component",
      "🏗️  build a new component",
      "👋  get help",
    ];
    const prompt: any = await inquirer.prompt([
      {
        type: "list",
        message: "what would you like to do?",
        name: "start",
        choices: choices,
      },
    ]);

    const answer = prompt.start;

    if (answer === "🔐  configure credentials") {
      console.log("Configuring credentials 🪄");
      configure();
    }
    if (answer === "📩  query an api") {
      console.log("This feature is coming soon!");
    }
    if (answer === "🚀  deploy a component") {
      console.log("This feature is coming soon!");
    }
    if (answer === "🏗️  build a new component") {
      console.log("This feature is coming soon!");
    }
    if (answer === "👋  get help") {
      console.log("This feature is coming soon!");
    }
  }
}
