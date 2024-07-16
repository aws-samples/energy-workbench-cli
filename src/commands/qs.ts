import { Args, Command } from '@oclif/core'
import { validateEnv } from "../utils/config/config.js";
import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";

import { fromIni } from "@aws-sdk/credential-providers";
import { join } from "path";

export default class QSearch extends Command {
  static override description = 'Sends a natural language search to Energy Data Insights search agent.'
  static override examples = [
    '<%= config.bin %> <%= command.id %> what are the coordinates for well BRK-06',
  ]

  static override args = {
    qPrompt: Args.string({
      required: true,
      description: 'Prompt to send to the agent.'
    }),
  }

  public async run(): Promise<void> {
    const { args } = await this.parse(QSearch)

    const config = validateEnv();
    const profileName = config.aws_profile;

    const credentials = fromIni({
      profile: profileName,
      filepath: join(process.env.HOME, ".aws/credentials"),
    });

    const client = new BedrockAgentRuntimeClient({ region: config.region, credentials });

    const p = args.qPrompt || "What can you do?";

    const agentId = "OWALQZA4WC";
    const agentAliasId = "OI9NY9FWNU";
    const sessionId = "edisearch";

    const command = new InvokeAgentCommand({
      agentId,
      agentAliasId,
      sessionId,
      inputText: p,
    });

    try {
      const response = await client.send(command);
      if (response.completion === undefined) {
        throw new Error("Completion is undefined");
      }

      let completion = '';

      for await (const chunkEvent of response.completion) {
        const chunk = chunkEvent.chunk;
        const decodedResponse = new TextDecoder("utf-8").decode(chunk.bytes);
        completion += decodedResponse;
        console.log(completion);
      }

    } catch (err) {
      console.error(err);
    }
  }
}
