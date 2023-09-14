import chalk from "chalk";

export function displayUpdatedWorkbench(): void {
  console.log(chalk.green("Welcome to OSDU Workbench"));
  console.log();
  console.log(chalk.blue("      +-------------+"));
  console.log(chalk.blue("     /  osdu        /|"));
  console.log(chalk.blue("    /  workbench   / |"));
  console.log(chalk.blue("   +-------------+  |"));
  console.log(chalk.blue("   |   🔨 🛠 🪛  |  /"));
  console.log(chalk.blue("   |             | /"));
  console.log(chalk.blue("   +------|------+"));
  console.log(chalk.blue("          |"));
  console.log(chalk.blue("          +"));
}
