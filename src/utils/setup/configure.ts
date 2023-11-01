import * as fs from "fs";
import * as os from "os";
import inquirer from "inquirer";
import { Command, ux } from "@oclif/core";
import { config } from "dotenv";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface Credentials {
  profile: string;
  clientId: string;
  cognitoUsername: string;
  cognitoPassword: string;
  osduRegion: string;
  osduEndpoint: string;
}

export async function configure(credentialsDir: string): Promise<string> {
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
    {
      name: "osduRegion",
      message: "OSDU Region:",
    },
    {
      name: "osduEndpoint",
      message: "OSDU Endpoint:",
    },
  ]);

  const credentialsPath = `${credentialsDir}/credentials`;
  const configPath = `${credentialsDir}/configuration`;

  // Check if .osdu directory exists, create if needed
  if (!fs.existsSync(credentialsDir)) {
    fs.mkdirSync(credentialsDir, { recursive: true });
  }

  const existingCredentials = fs.readFileSync(credentialsPath, "utf8");
  const hasProfileCredentials = existingCredentials.includes(
    `[${answers.profile}]`
  );

  const existingConfig = fs.readFileSync(credentialsPath, "utf8");
  const hasProfileConfig = existingConfig.includes(`[${answers.profile}]`);

  // Save credentials to file
  const credentials = `\n[${answers.profile}]\nOSDU_CLIENT_ID = ${answers.clientId}\nOSDU_COGNITO_USERNAME = ${answers.cognitoUsername}\nOSDU_COGNITO_PASSWORD = ${answers.cognitoPassword}\nOSDU_REGION = ${answers.osduRegion}\nOSDU_Endpoint = ${answers.osduEndpoint}\n`;

  const configuration = `\n[${answers.profile}]\nOSDU_REGION = ${answers.osduRegion}\nOSDU_ENDPOINT = ${answers.osduEndpoint}\n`;

  // Inform user
  console.log(`\n###########################################`);

  if (hasProfileCredentials) {
    fs.writeFileSync(credentialsPath, credentials, {
      encoding: "ascii",
    });
  } else {
    fs.appendFileSync(credentialsPath, credentials, {
      encoding: "ascii",
    });
  }

  if (hasProfileConfig) {
    fs.writeFileSync(configPath, configuration, {
      encoding: "ascii",
    });
  } else {
    fs.appendFileSync(configPath, configuration, {
      encoding: "ascii",
    });
  }
  ux.action.start("💾 Saving config...");
  await delay(1000);
  ux.action.stop(`✅`);
  console.log(`\n👾 Config saved to ${configPath}`);
  ux.action.start("💾 Saving credentials...");
  await delay(1000);
  ux.action.stop(`✅`);
  console.log(`\n👾 Credentials saved to ${credentialsPath}`);
  ux.action.start("🔑🔓 Securing credentials...");
  fs.chmodSync(credentialsPath, 0o600);
  await delay(1000);
  ux.action.stop(`✅`);
  console.log(
    `👾 Credential permissions modified so they are only readable and writable by current user.`
  );
  console.log(
    `👾 Make sure you keep your local machine secure through the use of system passwords and physical keys.`
  );
  console.log(`###########################################\n`);
  return credentials;
}
