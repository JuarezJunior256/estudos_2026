import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import {
  getCurrentPrice,
  get24hPriceChancePercent,
  getTools,
} from './BinanceTools';

const server = new Server(
  {
    name: 'binance-mcp-server',
    version: '1.0.0',
  },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: getTools(),
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'getCurrentPrice':
      return await getCurrentPrice(args);
    case 'get24hPriceChancePercent':
      return await get24hPriceChancePercent(args);
    default:
      throw new Error(`Tool ${name} not found`);
  }
});

export default server;
