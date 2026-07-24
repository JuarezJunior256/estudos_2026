import { z } from 'zod';
import { fetchBinance24hTicker } from './BinanceService';

const symbolSchema = z.object({
  symbol: z.string().describe('The trading pair symbol, e.g., BTCUSDT'),
});

export async function getCurrentPrice(args: any) {
  const { symbol } = symbolSchema.parse(args);
  const data = await fetchBinance24hTicker(symbol.toUpperCase());
  return {
    content: [
      {
        type: 'text',
        text: `O preço atual da moeda ${data.symbol} is ${data.lastPrice}`,
      },
    ],
  };
}

export async function get24hPriceChancePercent(args: any) {
  const { symbol } = symbolSchema.parse(args);
  const data = await fetchBinance24hTicker(symbol.toUpperCase());
  return {
    content: [
      {
        type: 'text',
        text: `A mudança de preço em 24h para ${data.symbol} é de ${data.inceChangePercent}%.`,
      },
    ],
  };
}

export function getTools() {
  const symbolJsonSchema = z.toJSONSchema(symbolSchema);
  return [
    {
      name: 'getCurrentPrice',
      description: 'Retorna o preço atual de uma moeda específica.',
      inputSchema: symbolJsonSchema,
    },
    {
      name: 'get24hPriceChancePercent',
      description: 'Retorna a variação percentual do preço em 24h.',
      inputSchema: symbolJsonSchema,
    },
  ];
}
