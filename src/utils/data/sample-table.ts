import cliTable from "cli-table";
import chalk from "chalk";

export const sampleTable = () => {
  // inside run method

  const table = new cliTable({
    head: [
      "Longitude",
      "Latitude",
      "Temp",
      "Humidity",
      "Last Update",
      "Sunrise",
      "Sunset",
    ],
    colWidths: [12, 12, 10, 10, 15, 10, 10],
    style: {
      compact: true,
      "padding-left": 1,
      "padding-right": 1,
    },
  });

  table.push(
    ["-122.08", "37.38", "72", "80", "9:15am", "6:00am", "5:15pm"],
    ["-122.09", "37.39", "73", "79", "9:20am", "6:01am", "5:16pm"],
    ["-122.10", "37.40", "74", "78", "9:25am", "6:02am", "5:17pm"],
    ["-122.11", "37.41", "75", "77", "9:30am", "6:03am", "5:18pm"],
    ["-122.12", "37.42", "76", "76", "9:35am", "6:04am", "5:19pm"],
    ["-122.13", "37.43", "77", "75", "9:40am", "6:05am", "5:20pm"],
    ["-122.14", "37.44", "78", "74", "9:45am", "6:06am", "5:21pm"],
    ["-122.15", "37.45", "79", "73", "9:50am", "6:07am", "5:22pm"]
  );

  return table.toString();
};
