import { Args, Command, Flags } from "@oclif/core";
import { Search } from "@aws/energy-workbench-sdk";
import { displaySearchResults } from "../../utils/search/searchQueryTable";
import { validateEnv } from "../../utils/config/config";

export default class SearchKind extends Command {
  static description =
    "Perform a search call using the kind key and flags for query and limit.";

  static examples = [
    "<%= config.bin %> <%= command.id %> osdu:wks:master-data--Well:1.0.0",
  ];

  static args = {
    kind: Args.string({ description: "kind to query" }),
  };

  static flags = {
    query: Flags.string({ description: "Specific query to run", char: "q" }),
    limit: Flags.integer({ description: "How many lines to return" }),
    table: Flags.string({
      description: "What format to display search results",
    }),
  };

  
  public async run(): Promise<void> {
    const { args, flags } = await this.parse(SearchKind);
    const specificQuery = flags.query || "";
    const specificLimit = flags.limit || 10;
    const tableFormat = flags.table || "no";

    // check to environmental variable presence
    const config = validateEnv();

    // instantiate an instance of the search client
    const search = new Search.SearchClient(config.endpoint, config.region);

    const k = args.kind || "";

    const response = await search.query({
      kind: k,
      query: specificQuery,
      limit: specificLimit,
    });

    console.log(tableFormat);

    if (tableFormat == "yes") {
      displaySearchResults(response);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
}
