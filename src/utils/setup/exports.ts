import * as fs from "fs";
/**
 * Exports credential variables from file as environment variables.
 *
 * @param credsPath - Path to credentials file
 * @param profile - The profile to extract and export
 * @returns Promise resolving when variables are exported
 */
export async function exportCreds(credsPath: string, profile: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const creds = fs.readFileSync(credsPath, "ascii");
    const profileSection = creds.split(`[${profile}]`)[1].split(/\[.*?\]/)[0];
    // console.log("profileSection...")
    // console.log(profileSection)
    // console.log("...end of profileSection...")

    const parsed: { [key: string]: string } = profileSection
      .split("\n")
      .reduce((acc: { [key: string]: string }, line) => {
        const [key, value] = line.split("=");
        // console.log(`Adding ${key}=${value} to environmental variables`);
        if (key && value) { // making sure both key and value exist
          // console.log(`Adding ${key.trim()}=${value.trim()} to environmental variables`);
          acc[key.trim()] = value.trim();
        }
        return acc;
      }, {});

      console.log("\n\nPlease copy and run the following commands to set your environment variables:\n");
      Object.keys(parsed).forEach((key) => {
          console.log(`export ${key}=${parsed[key]}`);
      });
      console.log("\n***********************\n");

    resolve();
  });
}
