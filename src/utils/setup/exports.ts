import { env } from "process";
import * as fs from "fs";

/**
 * Exports credential variables from file as environment variables.
 *
 * @param credsPath - Path to credentials file
 * @returns Promise resolving when variables are exported
 */
export function exportCreds(credsPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const creds = fs.readFileSync(credsPath, "utf8");

    const parsed: { [key: string]: string } = creds
      .split("\n")
      .reduce((acc, line) => {
        const [key, value] = line.split("=");
        return {
          ...acc,
          [key]: value,
        };
      }, {});

    Object.keys(parsed).forEach((key) => {
      env[key] = parsed[key];
    });

    resolve();
  });
}
