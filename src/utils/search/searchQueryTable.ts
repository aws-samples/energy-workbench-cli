import cliTable from "cli-table";

export function displaySearchResults(results: any) {
  const table = new cliTable({
    head: ["ID", "Kind", "Type", "Version", "Create Time"],
  });

  results.results.forEach((result: any) => {
    table.push([
      result.id,
      result.kind,
      result.type,
      result.version,
      result.createTime,
    ]);
  });

  console.log(table.toString());
  return;
}
