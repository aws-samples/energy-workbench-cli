import cliTable from "cli-table";

export function displayGroupResults(results: any) {
  const table = new cliTable({
    head: ["Name", "Description", "Email"],
  });

  results.groups.forEach((result: any) => {
    table.push([
      result.name,
      result.description,
      result.email,
    ]);
  });

  console.log(table.toString());
  return;
}
