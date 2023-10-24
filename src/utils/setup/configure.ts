import * as fs from "fs";
import * as os from "os";
import inquirer from "inquirer";
import { Command, ux } from "@oclif/core";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface Credentials {
  profile: string;
  clientId: string;
  cognitoUsername: string;
  cognitoPassword: string;
}

export async function configure(credentialsDir: string, credentialsPath: string): Promise<string> {
  // Prompt for credentials
  const answers = await inquirer.prompt<Credentials>([
    {
      name: "profile",
      message: "Profile name:",
      default: "default",
    },
    {
      name: "clientId",
      message: "Cognito Client ID:",
    },
    {
      name: "cognitoUsername",
      message: "Cognito Username:",
    },
    {
      name: "cognitoPassword",
      message: "Cognito Password:",
    },
  ]);

// Check if .osdu directory exists, create if needed
if (!fs.existsSync(credentialsDir)) {
  fs.mkdirSync(credentialsDir, { recursive: true });
}

  // Save credentials to file
  const credentials = `[${answers.profile}]\nOSDU_CLIENT_ID = ${answers.clientId}\nOSDU_USERNAME = ${answers.cognitoUsername}\nOSDU_PASSWORD = ${answers.cognitoPassword}\n`;

  // Inform user
  console.log(`\n###########################################\n`);
  ux.action.start("💾 Saving credentials...");

  if (fs.existsSync(credentialsPath)) {
    fs.appendFileSync(credentialsPath, credentials);
  } else {
    fs.writeFileSync(credentialsPath, credentials);
  }

  await delay(1000);
  ux.action.stop(`✅`);
  console.log(`\n👾 Credentials saved to ${credentialsPath}\n`);
  ux.action.start("🔑🔓 Securing credentials...");
  fs.chmodSync(credentialsPath, 0o600);
  await delay(1000);
  ux.action.stop(`✅`);
  console.log(
    `\n👾 Credential permissions modified so they are only readable and writable by current user.\n`
  );

  ux.action.stop(`✅`);
  console.log(
    `\n👾 Make sure you keep your local machine secure through the use of system passwords and physical keys.\n`
  );
  console.log(`\n###########################################\n`);
  return credentials;
}
