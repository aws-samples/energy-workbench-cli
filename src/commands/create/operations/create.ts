import arg from "arg";
import inquirer from "inquirer";
import boxen from "boxen";
import path from "path";
import { createProject } from "./main.js";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
    },
    { argv: rawArgs.slice(2) }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0],
    runInstall: args["--install"] || false,
  };
}
async function promptForMissingOptionsTemplate(options) {
  const defaultTemplate = "cdk-app-typescript";
  if (options.skipPrompts) {
    return { ...options, template: options.template || defaultTemplate };
  }
  const templateQuestions = [];
  if (!options.template) {
    templateQuestions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: [
        "cdk-app-typescript",
        "cdk-stack-typescript",
        "cdk-construct-typescript",
        "cdk-devops-gitlab",
        "cdk-devops-github",
      ],
      default: defaultTemplate,
    });
  }
  const answers = await inquirer.prompt(templateQuestions);
  return { ...options, template: options.template || answers.template };
}
async function promptForMissingOptionsComponent(options) {
  if (options.skipPrompts) {
    return { ...options, template: options.template || defaultTemplate };
  }
  const componentQuestions = [];
  if (!options.componentName) {
    componentQuestions.push({
      type: "input",
      name: "componentName",
      message: `What is the name of your ${options.template}?`,
      default: path.basename(path.resolve(process.cwd())),
    });
  }
  if (options.template === "cdk-app-typescript") {
    if (!options.git) {
      componentQuestions.push({
        type: "confirm",
        name: "git",
        message: "Initialize a git repository?",
        default: false,
      });
    }
    if (!options.devops) {
      componentQuestions.push({
        type: "confirm",
        name: "devops",
        message: "Initialize with a devops toolset and cicd pipeline?",
        default: false,
      });
      if (!options.versionControl) {
        componentQuestions.push({
          type: "list",
          name: "versionControl",
          message: "Please choose which version control system you are using",
          choices: ["Github", "Gitlab", "Other"],
          default: "Github",
        });
      }
    }
  }
  const answers = await inquirer.prompt(componentQuestions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git || false,
    devops: options.devops || answers.devops || false,
    componentName: options.componentName || answers.componentName,
    versionControl: options.versionControl || answers.versionControl,
  };
}
async function promptForMissingOptions(options) {
  const templateOptions = await promptForMissingOptionsTemplate(options);
  const componentOptions = await promptForMissingOptionsComponent(
    templateOptions
  );
  return componentOptions;
}
const boxenStyle = {
  title: "🚀 AWS CDK Powertools 🛠️",
  titleAlignment: "center",
  textAlignment: "center",
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "#fcba03",
};

export async function create(options: Options) {
  const welcomeText =
    "🪄 Create your CDK app or add components from opinionated templates. Created by Sam Ward Biddle (sambiddl@amazon.com) 🪄\nJoin #cdk-powertools-interest on slack\n";
  console.log(boxen(welcomeText, boxenStyle));
  options = await promptForMissingOptions(options);
  await createProject(options);
}
