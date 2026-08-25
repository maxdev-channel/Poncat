import { ChartPoint, HowToBuyStep, RpcConfig, TokenomicItem, TradeOrder } from '../types';

export const CONTRACT_ADDRESS = "0x000000000000000000000000000000";
export const ROBINHOOD_CHAIN_NAME = "Robinhood Chain";
export const TOKEN_SYMBOL = "$PONCAT";
export const TOKEN_NAME = "Ponkotsu Cat $PONCAT";
export const getProxyUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("https://sf4service.site")) {
    return `/api/proxy-image?url=${encodeURIComponent(url)}`;
  }
  return url;
};

export const WEBSITE_LOGO = getProxyUrl("https://sf4service.site/raw/img_mz5sm7cpd.jpg");
export const WEBSITE_BANNER = getProxyUrl("https://sf4service.site/raw/img_l2iigqp12.jpg");

export const ROBINHOOD_RPC_CONFIG: RpcConfig = {
  networkName: "Robinhood Chain Mainnet",
  rpcUrl: "https://rpc.robinhoodchain.org",
  chainId: "7051 (0x1B8B)",
  currencySymbol: "HOOD",
  blockExplorer: "https://explorer.robinhoodchain.org"
};

export const INITIAL_STATS = {
  priceUsd: 0.00004285,
  priceChange24h: 38.6,
  marketCapUsd: 42850000,
  volume24hUsd: 12450000,
  liquidityUsd: 3850000,
  holdersCount: 18420,
  totalSupply: "1,000,000,000",
  symbol: "$PONCAT",
  chain: "Robinhood Chain (L2)"
};

export const TOKENOMICS_DATA: TokenomicItem[] = [
  {
    label: "Liquidity Pool (Locked)",
    value: "800,000,000 $PONCAT",
    description: "100% LP burned & locked on Robinhood Chain DEX permanently.",
    color: "#00C805", // Robinhood Green
    percentage: 80,
  },
  {
    label: "Community Airdrop & Rewards",
    value: "100,000,000 $PONCAT",
    description: "For Robinhood Wallet users, active traders, and meme contests.",
    color: "#FFD700", // Gold
    percentage: 10,
  },
  {
    label: "Ecosystem & Robinhood Marketing",
    value: "100,000,000 $PONCAT",
    description: "Partnerships, exchange listings, and Robinhood Chain growth.",
    color: "#00E5FF", // Cyan
    percentage: 10,
  }
];

export const HOW_TO_BUY_STEPS: HowToBuyStep[] = [
  {
    step: 1,
    title: "Download Robinhood Wallet or MetaMask",
    description: "Get the official Robinhood Wallet app or use MetaMask on mobile/desktop browser extension.",
    iconName: "Wallet",
  },
  {
    step: 2,
    title: "Add Robinhood Chain Network",
    description: "Switch your wallet network to Robinhood Chain (L2). Use our 1-click network configuration preset below.",
    iconName: "Network",
    actionText: "Copy RPC Info",
    actionPayload: "rpc"
  },
  {
    step: 3,
    title: "Get $HOOD or $ETH for Gas",
    description: "Transfer $HOOD or $ETH to your wallet on Robinhood Chain. Gas fees are ultralow (< $0.001 per transaction).",
    iconName: "Zap",
  },
  {
    step: 4,
    title: "Swap for $PONCAT on Robinhood DEX",
    description: "Paste contract address into Robinhood Swap / Dexscreener widget, enter amount, set slippage (0.5%), and hit Swap!",
    iconName: "ArrowLeftRight",
    actionText: "Open Swap Calculator",
    actionPayload: "swap"
  }
];

export const FAQ_LIST = [
  {
    q: "What is Ponkotsu Cat?",
    a: "Born from the Pons ecosystem, Ponkotsu Cat ($PONCAT) brings the clumsy, mischievous, and lovable energy of a cat into the world of PON as the mascot watching over Robinhood Chain L2."
  },
  {
    q: "Why build on Robinhood Chain?",
    a: "Robinhood Chain offers lightning-fast block times, near-zero gas fees, seamless integration with Robinhood Wallet, and massive mainstream retail adoption potential."
  },
  {
    q: "Is liquidity locked?",
    a: "YES! 100% of initial liquidity pool tokens were burned permanently at launch. 0% team tax."
  },
  {
    q: "How do I add $PONCAT to my wallet?",
    a: "Simply copy our official Contract Address and import custom token in Robinhood Wallet or MetaMask under Robinhood Chain."
  }
];

// Generate realistic mock candlestick data points for Dexscreener chart
export const GENERATE_INITIAL_CHART = (): ChartPoint[] => {
  const points: ChartPoint[] = [];
  let currentPrice = 0.00002100;
  const now = Date.now();
  
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now - i * 3600 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const volatility = (Math.random() - 0.42) * 0.000004; // bullish trend
    const open = currentPrice;
    const close = Math.max(0.00001500, open + volatility);
    const high = Math.max(open, close) + Math.random() * 0.000002;
    const low = Math.min(open, close) - Math.random() * 0.0000015;
    const volume = Math.floor(250000 + Math.random() * 600000);

    currentPrice = close;
    points.push({ time, open, high, low, close, volume });
  }
  return points;
};

export const INITIAL_TRADES: TradeOrder[] = [
  { id: 'tx-1', type: 'buy', amountHood: 4.5, amountPoncat: 105000, priceUsd: 0.00004285, time: 'Just now', txHash: '0x3f8a...8c12' },
  { id: 'tx-2', type: 'buy', amountHood: 12.0, amountPoncat: 280000, priceUsd: 0.00004280, time: '12s ago', txHash: '0x992b...110f' },
  { id: 'tx-3', type: 'sell', amountHood: 1.2, amountPoncat: 28000, priceUsd: 0.00004275, time: '35s ago', txHash: '0x10ae...918b' },
  { id: 'tx-4', type: 'buy', amountHood: 8.8, amountPoncat: 205000, priceUsd: 0.00004278, time: '1m ago', txHash: '0x74bc...339a' },
  { id: 'tx-5', type: 'buy', amountHood: 25.0, amountPoncat: 583000, priceUsd: 0.00004270, time: '2m ago', txHash: '0x4421...90fe' },
];
