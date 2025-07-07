// SpinAI MCP Configuration
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"
import { createSmitheryUrl } from "@smithery/sdk/shared/config.js"

export default function mcpConfig(smitheryKey: string, notionApiKey: string) {

  const config = { notionApiKey }

  const serverUrl = createSmitheryUrl("https://server.smithery.ai/@smithery/notion", { config, apiKey: smitheryKey })

  const transport = new StreamableHTTPClientTransport(serverUrl)

  return { transport };

}