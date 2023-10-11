import { Args, Command, Flags } from "@oclif/core";
import { Search } from "osdu-workbench-sdk";
import { displaySearchResults } from "../../utils/search/searchQueryTable";

export default class SearchKind extends Command {
  static description = "Perform a search call using the kind key and flag for query";

  static examples = [
    "<%= config.bin %> <%= command.id %> osdu:wks:master-data--Well:1.0.0",
  ];

  static args = {
    qk: Args.string({ description: "kind to query" }),
  };

  static flags = {
    query: Flags.string({ description: "Specific query to run", char: 'q' }),
    limit: Flags.integer( {description: "How many lines to return"})
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(SearchKind);

    this.log(`Searching with parameter: kind and query: ${args.qk}. `);

    const specificQuery = flags.query;
    if (specificQuery) {
      this.log(`Specific query provided: ${specificQuery}`);
    }

    const specificLimit = flags.limit;

    // instantiate an instance of the search client
    const search = new Search.SearchClient(
      "https://osdu.osdupsdemo.install.osdu.aws",
      "us-east-1"
    );

    const q = args.qk;

    if (!q) {
      this.error("No query supplied!");
    }

    const response = await search.query({
      kind: q,
      query: specificQuery,
      limit: specificLimit
    });

    displaySearchResults(response);
  }
}
