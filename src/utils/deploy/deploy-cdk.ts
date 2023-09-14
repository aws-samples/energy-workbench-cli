import { execSync } from "child_process";
import chalk from "chalk";
import fs from "fs";
/**
Updates the CDK CLI tool to its latest version.
@returns {void}
 */
function updateCdkCliToLatest(): void {
  console.log("Updating CDK CLI to the latest version...");
  execSync("npm install -g aws-cdk");
}
/**
Deploys a CDK application.
@param {string} awsProfile - The name of the AWS CLI profile to use.
@returns {void}
 */
export function deployCDKApp(awsProfile: string): void {
  // Update CDK CLI
  updateCdkCliToLatest();
  // Set AWS profile
  process.env.AWS_PROFILE = awsProfile;
  // Bootstrap and deploy the CDK app
  console.log("Bootstrapping CDK app...");
  execSync("cdk bootstrap");
  console.log("Deploying CDK app...");
  execSync("cdk deploy --all --outputs-file cdk.outputs.json");
}
/**
Reads the cdk.outputs.json and returns the keys and values as a styled table.
@returns {string} - The styled table as a string.
 */
export function getCdkOutputsTable(): string {
  const rawData = fs.readFileSync("cdk.outputs.json", "utf-8");
  const outputs = JSON.parse(rawData);
  let table = "";
  for (const [key, value] of Object.entries(outputs)) {
    table += chalk.cyan(key) + "\t" + chalk.bgMagenta(value) + "\n";
  }
  return table;
}
// Example usage:
deployCDKApp("myAwsProfile");
console.log(getCdkOutputsTable());
