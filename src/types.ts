export interface TokenomicItem {
  label: string;
  value: string;
  description: string;
  color: string;
  percentage: number;
}

export interface TradeOrder {
  id: string;
  type: 'buy' | 'sell';
  amountHood: number;
  amountPoncat: number;
  priceUsd: number;
  time: string;
  txHash: string;
}

export interface ChartPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface HowToBuyStep {
  step: number;
  title: string;
  description: string;
  iconName: string;
  actionText?: string;
  actionPayload?: string;
}

export interface RpcConfig {
  networkName: string;
  rpcUrl: string;
  chainId: string;
  currencySymbol: string;
  blockExplorer: string;
}
