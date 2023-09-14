import fs from "fs-extra";
import path from "path";
/**
Lists all templates in the specified directory.
@param {string} dirPath - The path to the template directory.
@returns {Object} - An object containing the directory path and a list of template names.
 */
export function listAllTemplates(dirPath: string): {
  dirPath: string;
  templates: string[];
} {
  const templates = fs.readdirSync(dirPath);
  return { dirPath, templates };
}
/**
Moves a template directory and replaces keywords in files.
@param {string} srcDirPath - Source template directory path.
@param {string} destDirPath - Destination directory path.
@param {Array<{searchTerm: string, replaceWith: string}>} keywordChanges - List of keyword changes.
 */
export async function moveTemplateDirectory(
  srcDirPath: string,
  destDirPath: string,
  keywordChanges: { searchTerm: string; replaceWith: string }[]
): Promise<void> {
  await fs.copy(srcDirPath, destDirPath);
  const replaceInFiles = async (dir: string) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        await replaceInFiles(filePath);
      } else {
        let content = fs.readFileSync(filePath, "utf-8");
        keywordChanges.forEach((change) => {
          const regex = new RegExp(change.searchTerm, "g");
          content = content.replace(regex, change.replaceWith);
        });
        fs.writeFileSync(filePath, content, "utf-8");
      }
    }
  };
  await replaceInFiles(destDirPath);
}
/**
Verifies if all files were moved correctly.
@param {string} srcDirPath - Source template directory path.
@param {string} destDirPath - Destination directory path.
@returns {boolean} - True if all files were moved, false otherwise.
 */
export function verifyMovedTemplates(
  srcDirPath: string,
  destDirPath: string
): boolean {
  const getFiles = (dir: string): string[] => {
    let filesList: string[] = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        filesList = filesList.concat(getFiles(filePath));
      } else {
        filesList.push(filePath);
      }
    }
    return filesList;
  };
  const srcFiles = getFiles(srcDirPath).map((file) =>
    path.relative(srcDirPath, file)
  );
  const destFiles = getFiles(destDirPath).map((file) =>
    path.relative(destDirPath, file)
  );
  return JSON.stringify(srcFiles) === JSON.stringify(destFiles);
}
