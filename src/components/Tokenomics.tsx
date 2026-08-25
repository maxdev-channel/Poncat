import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, PieChart, Zap, CheckCircle2, Copy, Check } from 'lucide-react';
import { CONTRACT_ADDRESS, ROBINHOOD_CHAIN_NAME } from '../data/memeData';
import { playSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface TokenomicsProps {
  muted: boolean;
}

export const Tokenomics: React.FC<TokenomicsProps> = ({ muted }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    playSound('coin', muted);
    
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.4 }
    });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tokenomics" className="relative py-20 bg-[#0d1611] text-white border-b-4 border-black overflow-hidden font-mono">
      {/* Pixel Grid Pattern */}
      <div className="absolute inset-0 pixel-grid-gold opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#FFD700] text-black font-black text-xs px-4 py-1.5 border-3 border-black shadow-[3px_3px_0px_0px_#000000] uppercase tracking-wider"
          >
            <PieChart className="w-4 h-4 fill-black" />
            100% TRANSPARENT TOKENOMICS
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white"
          >
            PONCAT<span className="text-[#00C805]">NOMICS</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg font-bold text-gray-300"
          >
            Engineered for meme sustainability on <strong>{ROBINHOOD_CHAIN_NAME}</strong>. Zero buy tax, zero sell tax, burned liquidity, and instant micro-gas.
          </motion.p>
        </div>

        {/* 3 Horizontal 8-Bit Pixel Bricks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#17261e] p-6 border-4 border-black shadow-[8px_8px_0px_0px_#00C805] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-[#00C805] border-3 border-black rounded-none flex items-center justify-center font-black text-black text-2xl shadow-[3px_3px_0px_0px_#000000] mb-4">
                🪙
              </div>
              <p className="text-xs font-black uppercase text-gray-400">TOTAL TOKEN SUPPLY</p>
              <p className="text-3xl sm:text-4xl font-black text-[#00C805] mt-1">1,000,000,000</p>
            </div>
            <p className="text-xs font-bold text-[#00C805] mt-4 pt-3 border-t-2 border-white/10 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00C805]" /> Fixed Supply • No Mint Function
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#202217] p-6 border-4 border-black shadow-[8px_8px_0px_0px_#FFD700] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-[#FFD700] border-3 border-black rounded-none flex items-center justify-center font-black text-black text-2xl shadow-[3px_3px_0px_0px_#000000] mb-4">
                🏷️
              </div>
              <p className="text-xs font-black uppercase text-gray-400">TRANSACTION TAXES</p>
              <p className="text-3xl sm:text-4xl font-black text-[#FFD700] mt-1">0% / 0%</p>
            </div>
            <p className="text-xs font-bold text-yellow-400 mt-4 pt-3 border-t-2 border-white/10 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-yellow-400" /> 0% Buy Tax • 0% Sell Tax
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#172528] p-6 border-4 border-black shadow-[8px_8px_0px_0px_#00E5FF] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-[#00E5FF] border-3 border-black rounded-none flex items-center justify-center font-black text-black text-2xl shadow-[3px_3px_0px_0px_#000000] mb-4">
                🔥
              </div>
              <p className="text-xs font-black uppercase text-gray-400">LIQUIDITY STATUS</p>
              <p className="text-3xl sm:text-4xl font-black text-[#00E5FF] mt-1">100% BURNED</p>
            </div>
            <p className="text-xs font-bold text-cyan-400 mt-4 pt-3 border-t-2 border-white/10 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-cyan-400" /> Permanently Locked LP
            </p>
          </motion.div>

        </div>

        {/* Arcade Gas Comparison Scoreboard Box */}
        <div className="max-w-3xl mx-auto bg-[#17221b] p-6 sm:p-8 border-4 border-black shadow-[10px_10px_0px_0px_#000000] space-y-5">
          <div className="inline-flex items-center gap-1.5 bg-[#00C805] text-black font-black text-xs px-3 py-1 border border-black uppercase">
            <Zap className="w-3.5 h-3.5 fill-black" /> Robinhood L2 Gas Scoreboard
          </div>

          <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
            WHY ROBINHOOD CHAIN?
          </h3>

          <p className="text-xs font-bold text-gray-300 leading-relaxed">
            Ethereum meme trades cost <strong>$15 - $50</strong> in gas fees. On Robinhood Chain, gas is under a single cent, letting you trade any amount with zero waste!
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between bg-black p-3.5 border-3 border-[#00C805]">
              <span className="font-black text-xs text-white flex items-center gap-2">
                <span>🏹</span> ROBINHOOD CHAIN (L2)
              </span>
              <span className="font-black text-xs text-[#00C805] bg-[#00C805]/20 px-3 py-1 border border-[#00C805]">
                &lt; $0.001 GAS
              </span>
            </div>

            <div className="flex items-center justify-between bg-black/60 p-3.5 border border-white/20 opacity-75">
              <span className="font-black text-xs text-gray-400 flex items-center gap-2">
                <span>💎</span> ETHEREUM MAINNET
              </span>
              <span className="font-bold text-xs text-red-400">
                ~$18.50 GAS
              </span>
            </div>

            <div className="flex items-center justify-between bg-black/60 p-3.5 border border-white/20 opacity-75">
              <span className="font-black text-xs text-gray-400 flex items-center gap-2">
                <span>🟣</span> OTHER L2 CHAINS
              </span>
              <span className="font-bold text-xs text-yellow-400">
                ~$0.12 GAS
              </span>
            </div>
          </div>

          <button 
            onClick={handleCopy}
            className="w-full mt-2 bg-[#00C805] hover:bg-[#00E506] text-black font-black text-xs p-3.5 border-3 border-black shadow-[4px_4px_0px_0px_#ffffff] flex items-center justify-center gap-2 uppercase transition-transform active:translate-y-0.5"
          >
            {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4 stroke-[3]" />}
            <span>{copied ? "Contract Address Copied!" : "Copy Official CA"}</span>
          </button>

        </div>

      </div>
    </section>
  );
};

