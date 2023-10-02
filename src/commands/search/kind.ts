import { Args, Command, Flags } from "@oclif/core";
import { Search } from "osdu-workbench-sdk";
import { displaySearchResults } from "../../utils/search/searchQueryTable";

export default class SearchKind extends Command {
  static description = "Perform a search call using the kind key";

  static examples = [
    "<%= config.bin %> <%= command.id %> osdu:wks:master-data--Well:1.0.0",
  ];

  static args = {
    query: Args.string({ description: "query to run" }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(SearchKind);

    this.log(`Searching with parameter: kind and query: ${args.query}. `);

    // instantiate an instance of the search client
    const search = new Search.SearchClient(
      "https://osdu.osdupsdemo.install.osdu.aws",
      "us-east-1"
    );

    const q = args.query;

    if (!q) {
      this.error("No query supplied!");
    }

    const response = await search.query({
      kind: q,
    });

    displaySearchResults(response);
  }
}
