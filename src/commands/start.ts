import { Args, Command, Flags } from "@oclif/core";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import fs from "fs";
import os from "os";
import { configure } from "../utils/setup/configure";
import { exportCreds } from "../utils/setup/exports";

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
      `\n\n🛠️  Get started with the workbench by following the prompts below...\n`
    )
  );
  console.log("\n");
}

function parseProfiles(credentialsPath: string): string[] {
  const fileContent = fs.readFileSync(credentialsPath, "utf-8");
  const lines = fileContent.split("\n");
  const profiles = lines
    .filter((line) => line.startsWith("["))
    .map((profile) => profile.replace(/[\[\]]/g, ""));
  return profiles;
}

export default class Start extends Command {
  static description =
    "Basic start command implements a command prompt input workflow.";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<void> {
    welcome();
    const choices = [
      "🔐  configure credentials",
      "📩  export your credentials",
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

    const credentialsDir = `${os.homedir()}/.osdu`;
    const credentialsPath = `${credentialsDir}/credentials`;

    const answer = prompt.start;

    if (answer === "🔐  configure credentials") {
      console.log("Configuring credentials 🪄");
      configure(credentialsDir, credentialsPath);
    }
    if (answer === "📩  export your credentials") {
      console.log("Exporting default credentials");
      const profiles = parseProfiles(credentialsPath);
      const profilePrompt: any = await inquirer.prompt([
        {
          type: "list",
          message: "Which profile would you like to export?",
          name: "profile",
          choices: profiles,
        },
      ]);
      console.log(profilePrompt);
      exportCreds(credentialsPath, profilePrompt.profile);
    }
    if (answer === "👋  get help") {
      console.log("This feature is coming soon!");
    }
  }
}
