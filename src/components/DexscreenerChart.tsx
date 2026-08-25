import React from 'react';
import { Activity, ExternalLink, RefreshCw } from 'lucide-react';
import { TOKEN_SYMBOL, ROBINHOOD_CHAIN_NAME } from '../data/memeData';
import { useDexscreenerStats } from '../hooks/useDexscreenerStats';

interface DexscreenerChartProps {
  muted: boolean;
  onOpenBuy: () => void;
}

export const DexscreenerChart: React.FC<DexscreenerChartProps> = ({ onOpenBuy }) => {
  const dexscreener = useDexscreenerStats();

  return (
    <section id="chart" className="py-16 bg-[#080d0a] text-white border-b-4 border-black font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 bg-[#00C805] text-black font-black text-xs px-3 py-1 border border-black uppercase">
                <Activity className="w-3.5 h-3.5 animate-pulse" /> LIVE DEXSCREENER CHART
              </span>
              <span className="text-xs font-bold text-[#00C805] bg-black px-2.5 py-1 border border-[#00C805]">
                PAIR: WETH / USD
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white">
              DEXSCREENER <span className="text-[#00C805]">LIVE</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={dexscreener.pairUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#121c17] hover:bg-[#1a2820] text-[#00C805] font-black text-xs px-4 py-2 border-2 border-[#00C805] shadow-[3px_3px_0px_0px_#00C805] uppercase transition-all"
            >
              <span>VIEW ON DEXSCREENER</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onOpenBuy}
              className="flex items-center gap-1.5 bg-[#FFD700] hover:bg-[#ffe234] text-black font-black text-xs px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_#000000] uppercase transition-all"
            >
              <span>TRADE ON ROBINHOOD DEX</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Metrics Bar from Dexscreener API */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-[#121d17] p-3 border-3 border-black shadow-[4px_4px_0px_0px_#00C805]">
            <span className="text-[10px] font-black uppercase text-gray-400 block">TOKEN PRICE</span>
            <span className="text-lg font-black text-[#00C805]">{dexscreener.formattedPrice}</span>
            <span className="text-[10px] font-bold text-gray-300 ml-2">{dexscreener.formattedPriceChange} (24h)</span>
          </div>

          <div className="bg-[#1c2214] p-3 border-3 border-black shadow-[4px_4px_0px_0px_#FFD700]">
            <span className="text-[10px] font-black uppercase text-gray-400 block">MARKET CAP</span>
            <span className="text-lg font-black text-[#FFD700]">{dexscreener.formattedMarketCap}</span>
            <span className="text-[10px] font-bold text-gray-300 ml-2">Dexscreener FDV</span>
          </div>

          <div className="bg-[#121d17] p-3 border-3 border-black shadow-[4px_4px_0px_0px_#00E5FF]">
            <span className="text-[10px] font-black uppercase text-gray-400 block">24H VOLUME</span>
            <span className="text-lg font-black text-[#00E5FF]">{dexscreener.formattedVolume}</span>
            <span className="text-[10px] font-bold text-gray-300 ml-2">DEX Volume</span>
          </div>

          <div className="bg-[#1c2214] p-3 border-3 border-black shadow-[4px_4px_0px_0px_#00C805]">
            <span className="text-[10px] font-black uppercase text-gray-400 block">TOTAL HOLDERS</span>
            <span className="text-lg font-black text-[#00C805]">{dexscreener.formattedHolders}</span>
            <span className="text-[10px] font-bold text-gray-300 ml-2">Robinhood Chain</span>
          </div>
        </div>

        {/* Pixel Arcade Terminal Console Container */}
        <div className="bg-[#101b15] border-4 border-black shadow-[10px_10px_0px_0px_#00C805] overflow-hidden relative">
          
          {/* Header Toolbar Info */}
          <div className="p-4 bg-[#17271e] border-b-3 border-black flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-[#00C805]">
                CONNECTING DIRECTLY TO ETHEREUM NETWORK (CHAIN ID 1)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {dexscreener.isLoading && (
                <span className="text-[10px] font-black text-yellow-400 flex items-center gap-1 uppercase">
                  <RefreshCw className="w-3 h-3 animate-spin" /> FETCHING API...
                </span>
              )}
              <span className="text-[10px] font-black text-gray-400 bg-black/60 px-2 py-0.5 border border-white/10 uppercase">
                SECURE WEB3 MODEM
              </span>
            </div>
          </div>

          {/* Dexscreener Live Embed with user-requested exact styles */}
          <div className="bg-black relative">
            <style dangerouslySetInnerHTML={{__html: `
              #dexscreener-embed {
                position: relative;
                width: 100%;
                padding-bottom: 125%;
              }
              @media(min-width: 1400px) {
                #dexscreener-embed {
                  padding-bottom: 65%;
                }
              }
              #dexscreener-embed iframe {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                border: 0;
              }
            `}} />
            <div id="dexscreener-embed">
              <iframe 
                src="https://dexscreener.com/ethereum/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
                title="Dexscreener Terminal Embed"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Chart Footer Terminal Info */}
          <div className="p-3 bg-[#132019] border-t-3 border-black text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              REAL-TIME DIRECT DEFI PRICE FEED FROM ETHEREUM • PAIR 0x88e6...5640
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
