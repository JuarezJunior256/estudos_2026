import axios from 'axios';

interface Binance24hTicker {
  symbol: string;
  lastPrice: string;
  inceChangePercent: string;
}

export async function fetchBinance24hTicker(
  symbol: string,
): Promise<Binance24hTicker> {
  const response = await axios.get(
    `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`,
  );
  const data = response.data;
  return {
    symbol: data.symbol,
    lastPrice: data.lastPrice,
    inceChangePercent: data.priceChangePercent,
  };
}
