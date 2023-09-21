import * as fs from "fs";
import * as os from "os";
import inquirer from "inquirer";

import { Command, ux } from "@oclif/core";

const credentialsDir = `${os.homedir()}/.osdu`;
const credentialsPath = `${credentialsDir}/credentials`;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Check if .osdu directory exists, create if needed
if (!fs.existsSync(credentialsDir)) {
  fs.mkdirSync(credentialsDir, { recursive: true });
}

interface Credentials {
  profile: string;
  clientId: string;
  cognitoUsername: string;
  cognitoPassword: string;
}

export async function configure(): Promise<string> {
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

  // Save credentials to file
  const credentials = `[${answers.profile}]\nosdu_client_id = ${answers.clientId}\nosdu_cognito_username = ${answers.cognitoUsername}\nosdu_cognito_password = ${answers.cognitoPassword}\n`;

  // Inform user
  console.log(`\n###########################################\n`);
  ux.action.start("💾 Saving credentials...");
  fs.writeFileSync(credentialsPath, credentials);
  await delay(2000);
  ux.action.stop(`✅`);
  console.log(`\n👾 Credentials saved to ${credentialsPath}\n`);
  ux.action.start("🔑🔓 Securing credentials...");
  fs.chmodSync(credentialsPath, 0o600);
  await delay(2000);
  ux.action.stop(`✅`);
  console.log(
    `\n👾 Credential permissions modified so they are only readable and writable by current user.\n`
  );
  ux.action.start("🔐📚 Reading up on security best practices...");
  await delay(3000);

  ux.action.stop(`✅`);
  console.log(
    `\n👾 Make sure you keep your local machine secure through the use of system passwords and physical keys.\n`
  );
  console.log(`\n###########################################\n`);
  return credentials;
}
