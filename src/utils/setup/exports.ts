import { readFileSync } from "fs";

function exportVariable(key: string, value: string) {
  process.env[key.trim()] = value.trim();
}

export function exportEnv(
  profile = "default",
  path: string,
  beginsWith: string
): string {
  const config = readFileSync(path, "utf8");

  let exporting = false;

  config.split("\n").forEach((line) => {
    if (line.startsWith("[") && line.endsWith("]")) {
      exporting = false;
    }
    if (line.startsWith(`[${profile}]`)) {
      exporting = true;
    }
    if (exporting && line.startsWith(beginsWith)) {
      const [key, value] = line.split("=");
      exportVariable(key, value);
      // print export command
      console.log(`export ${key.replace(/\s+/g, '')}=${value.replace(/\s+/g, '')}`);
    }
  });
  return config;
}
