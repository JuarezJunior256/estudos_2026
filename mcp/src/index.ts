import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import server from './mcpServer';

async function startServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`Server is running and connected via stdio transport.`);
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
  process.exit(1);
});
