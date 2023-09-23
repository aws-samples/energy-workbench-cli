import * as fs from "fs";
import { exec } from "child_process";

/**
 * Exports credential variables from file as environment variables.
 *
 * @param credsPath - Path to credentials file
 * @returns Promise resolving when variables are exported
 */
export async function exportCreds(credsPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const creds = fs.readFileSync(credsPath, "ascii");

    const parsed: { [key: string]: string } = creds
      .split("\n")
      .reduce((acc, line) => {
        const [key, value] = line.split("=");
        console.log(`Adding ${key}=${value} to environmental variables`);
        return {
          ...acc,
          [key]: value,
        };
      }, {});

    Object.keys(parsed).forEach(async (key) => {
      console.log(key);
      console.log(parsed[key]);

      exec(`export ${key}=${parsed[key]}`);
      exec(`echo this is the key: ${key}`);
      console.log(`Exported ${key}`);

      exec(`printenv ${key}`, (error, stdout) => {
        console.log(`Value is: ${stdout}`);
      });
    });

    exec(`export potato=greatest`);
    resolve();
  });
}
