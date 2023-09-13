import chalk from "chalk";
import ncp from "ncp";
import ora from "ora";
import path from "path";
import { promisify } from "util";
import replace from "replacestream";
import fs from "graceful-fs";
import { execa } from "execa";
import Listr from "listr";
import { projectInstall } from "pkg-install";
import { Observable } from "rxjs";
import { Stream } from "stream";

const copy = promisify(ncp);
const access = promisify(fs.access);

interface Options {
  template: string;
  componentName: string;
  targetDirectory: string;
  templateDirectory: string;
  versionControl: "Github" | "Gitlab" | "Other";
}

/**
 * Checks if a file is present in a directory
 * Continues to check for 10 seconds and returns true if it is there
 * Returns false if it is not present
 */
async function checkFileExists(fileName: string, targetDirectory?: string) {
  const workingDirectory = targetDirectory || process.cwd();

  try {
    const { stdout } = await execa("ls", ["-a", workingDirectory]);
    const files = stdout.split("\n");
    return files.includes(fileName);
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
}

async function monitorFileExists(
  directoryPath: string,
  fileName: string,
  delaySeconds: number,
  maxAttempts: number
) {
  let workingDirectory = directoryPath || process.cwd();
  let attempts = 0;

  return new Promise<boolean>((resolve, reject) => {
    const checkInterval = setInterval(async () => {
      attempts++;
      const exists = await checkFileExists(fileName, workingDirectory);
      if (exists) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (attempts === maxAttempts) {
        clearInterval(checkInterval);
        resolve(false);
      } else {
        process.stdout.write(
          `Waiting for ${fileName} to be in ${workingDirectory}`
        );
      }
    }, delaySeconds * 1000);
  });
}

/**
 * Checks if the files in a template directory match
 * the files in the target directory.
 */
async function checkFilesMoved(
  templateDirectory: string,
  targetDirectory: string
) {
  let workingDirectory = targetDirectory || process.cwd();

  try {
    const targetFiles = await execa("ls", ["-a", workingDirectory]);
    if (targetFiles.length > 0) {
      const targetFileList = targetFiles.split("\n");

      const templateFiles = await execa("ls", ["-a", templateDirectory]);

      const templateFileList = templateFiles.split("\n");

      return (templateFileList = targetFileList);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
}

/**
 * Checks if the files in a template directory match
 * the files in the target directory.
 */
async function monitorFilesMoved(
  template: string,
  targetDirectory: string,
  delaySeconds: number,
  maxAttempts: number
) {
  let workingDirectory = targetDirectory || process.cwd();

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    template.toLowerCase()
  );
  const templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  let attempts = 0;

  return new Promise<boolean>((resolve, reject) => {
    const checkInterval = setInterval(async () => {
      attempts++;
      const exists = await checkFilesMoved(templateDirectory, workingDirectory);
      if (exists) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (attempts === maxAttempts) {
        clearInterval(checkInterval);
        resolve(false);
      } else {
        process.stdout.write(
          `Files not moved yet. Trying again for the ${attempts} time...`
        );
      }
    }, delaySeconds * 1000);
  });
}

/**
 * Renames a file
 */
async function renameFile(
  originalFileName: string,
  newFileName: string,
  directory?: string
) {
  await monitorFileExists(directory, originalFileName, 1, 3);

  const result = execa("mv", [originalFileName, newFileName], {
    cwd: directory,
  });

  if (result.failed) {
    return Promise.reject(new Error("Failed to rename npm ignore"));
  } else {
    return result;
  }
}

/**
 * Renames a directory
 */
async function renameDirectory(
  currentName: string,
  newName: string,
  targetDirectory?: string
) {
  const result = await execa("mv", [currentName, newName], {
    cwd: targetDirectory,
  });

  console.log(
    `Renaming template directory to ${newName}`,
    chalk.green.bold("DONE")
  );

  if (result.failed) {
    return Promise.reject(new Error("Failed to rename directory"));
  }
}

/**
 * Copies template files
 */
async function copyTemplateFiles(options: Options) {
  const output = await copy(
    options.templateDirectory,
    options.targetDirectory,
    {
      clobber: false,
      stopOnErr: true,
      transform: function (read, write, file) {
        if (
          path.extname(file.name) === ".md" ||
          path.extname(file.name) === ".ts" ||
          path.extname(file.name) === ".py" ||
          path.extname(file.name) === ".json"
        ) {
          read
            .pipe(replace(options.template, options.componentName))
            .pipe(write);
        } else {
          read.pipe(write);
        }
      },
      function(err) {
        if (err) {
          return console.error(err);
        }
      },
    }
  );

  const filesMoved = await monitorFilesMoved(
    options.template,
    options.targetDirectory,
    1,
    3
  );

  return filesMoved;
}

/**
 * Initialize a git repository
 */
async function initGit(options: Options) {
  const result = await execa("git", ["init"], {
    cwd: options.targetDirectory,
  });

  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }

  return;
}

/**
 * Initialize devops
 */
async function addDevops(options: Options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const currentFileUrl = import.meta.url;
  const devops = `cdk-devops-${options.versionControl}`;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    devops.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  await copyTemplateFiles(options);

  await copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

/**
 * Progress spinner
 */
async function progressSpinner(
  startText: string,
  succeedText: string,
  actionFunction: () => Promise<void>
) {
  const spinner = ora({
    text: startText,
    stream: process.stdout,
  }).start();

  setTimeout(() => {
    spinner.color = "yellow";
    spinner.text = `🤔 ${startText}`;
  }, 1000);

  await actionFunction();

  spinner.succeed(`👏 ${succeedText}`);
}

export {
  checkFileExists,
  monitorFileExists,
  checkFilesMoved,
  monitorFilesMoved,
  renameFile,
  renameDirectory,
  copyTemplateFiles,
  initGit,
  addDevops,
  progressSpinner,
};
