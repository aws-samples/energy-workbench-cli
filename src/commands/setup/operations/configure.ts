import * as fs from "fs";
import * as os from "os";
import inquirer from "inquirer";

const credentialsPath = `${os.homedir()}/.osdu/credentials`;

interface Credentials {
  profile: string;
  apiKey: string;
  apiSecret: string;
}

export async function configure() {
  // Prompt for credentials
  const answers = await inquirer.prompt<Credentials>([
    {
      name: "profile",
      message: "Profile name:",
      default: "default",
    },
    {
      name: "apiKey",
      message: "API key:",
    },
    {
      name: "apiSecret",
      message: "API secret:",
    },
  ]);

  // Save credentials to file
  const credentials = `${answers.profile}\n${answers.apiKey}\n${answers.apiSecret}\n`;

  fs.writeFileSync(credentialsPath, credentials);

  // Inform user
  console.log(`Credentials saved to ${credentialsPath}`);
}
