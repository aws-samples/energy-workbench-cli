import cliTable from "cli-table";

export function displayMemberResults(results: any) {
  const table = new cliTable({
    head: ["Email", "Role"],
  });

  results.members.forEach((result: any) => {
    table.push([
      result.email,
      result.role
    ]);
  });

  console.log(table.toString());
  return;
}
