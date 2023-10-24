import chalk from "chalk";

export function displayUpdatedWorkbench(): void {
  console.log(chalk.green("Welcome to EDI Workbench"));
  console.log();
  console.log(chalk.blue("      +-------------+"));
  console.log(chalk.blue("     /    EDI       /|"));
  console.log(chalk.blue("    /  workbench   / |"));
  console.log(chalk.blue("   +-------------+  |"));
  console.log(chalk.blue("   |   🔨 🛠 🪛  |  /"));
  console.log(chalk.blue("   |             | /"));
  console.log(chalk.blue("   +------|------+"));
  console.log(chalk.blue("          |"));
  console.log(chalk.blue("          +"));
}
