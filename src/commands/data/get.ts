import { Args, Command, Flags } from "@oclif/core";
import { table, TableUserConfig } from "table";
import { sampleTable } from "../../utils/sample-table";

export default class DataGet extends Command {
  static description = "Gets data via API using local SDK.";

  static examples = [
    "<%= config.bin %> <%= command.id %> 'geo' --source 'example' --format 'csv' --display 'shell'",
  ];

  static flags = {
    // flag with a value (-s, --source=VALUE)
    source: Flags.string({
      char: "s",
      description: "Source of data",
      default: "test",
      required: true,
    }),
    format: Flags.string({
      char: "f",
      description: "Format of data to get.",
      default: "csv",
      required: false,
    }),
    display: Flags.string({
      char: "d",
      description: "Format to display data",
      default: "csv",
      required: false,
    }),
  };

  static args = {
    data: Args.string({
      description: "Data type",
      required: false,
    }),
    comment: Args.string({
      description: "Comment",
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(DataGet);

    this.log(
      `Getting ${args.data} data from ${flags.source} in ${flags.format} displayed as ${flags.display}`
    );

    const table = sampleTable();

    this.log(table);
  }
}
