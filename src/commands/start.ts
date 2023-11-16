import { Command } from "@oclif/core";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import os from "os";
import { execFile } from "child_process";
import { configure } from "../utils/setup/configure";

async function welcome() {
  console.clear();
  console.log(
    chalk.hex("#FFA500")(
      figlet.textSync("EDI Energy Workbench", {
        font: "Banner3",
        horizontalLayout: "full",
        whitespaceBreak: true,
      })
    )
  );
  console.log(
    chalk.green(
      `\n\n🛠️  Get started with the workbench by following the prompts below...\n`
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
    const choices = ["🔐  configure credentials", "👋  get help"];
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
      configure(`${os.homedir()}/.osdu/`);
    }
    if (answer === "👋  get help") {
      execFile("ewb", ["--help"], (error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        console.log(stdout);
      });
    }
  }
}
