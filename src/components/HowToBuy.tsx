import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, Network, Zap, ArrowLeftRight, Check, Copy } from 'lucide-react';
import { CONTRACT_ADDRESS, HOW_TO_BUY_STEPS, ROBINHOOD_RPC_CONFIG, TOKEN_SYMBOL } from '../data/memeData';
import { playSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface HowToBuyProps {
  muted: boolean;
}

export const HowToBuy: React.FC<HowToBuyProps> = ({ muted }) => {
  const [copiedRpc, setCopiedRpc] = useState(false);
  const [copiedCa, setCopiedCa] = useState(false);

  const handleCopyRpc = () => {
    const text = `Network Name: ${ROBINHOOD_RPC_CONFIG.networkName}\nRPC URL: ${ROBINHOOD_RPC_CONFIG.rpcUrl}\nChain ID: ${ROBINHOOD_RPC_CONFIG.chainId}\nSymbol: ${ROBINHOOD_RPC_CONFIG.currencySymbol}\nExplorer: ${ROBINHOOD_RPC_CONFIG.blockExplorer}`;
    navigator.clipboard.writeText(text);
    setCopiedRpc(true);
    playSound('coin', muted);

    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.6 }
    });

    setTimeout(() => setCopiedRpc(false), 2000);
  };

  const handleCopyCa = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopiedCa(true);
    playSound('coin', muted);
    setTimeout(() => setCopiedCa(false), 2000);
  };

  return (
    <section id="how-to-buy" className="py-20 bg-[#0a120e] text-white border-b-4 border-black relative font-mono">
      {/* Pixel Grid Background */}
      <div className="absolute inset-0 pixel-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFD700] text-black font-black text-xs px-4 py-1.5 border-3 border-black shadow-[3px_3px_0px_0px_#000000] uppercase tracking-wider">
            <Zap className="w-4 h-4 fill-black" /> EASY 4-QUEST GUIDE
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white">
            HOW TO BUY <span className="text-[#00C805]">{TOKEN_SYMBOL}</span>
          </h2>

          <p className="text-base sm:text-lg font-bold text-gray-300">
            Follow these 4 quest steps to acquire {TOKEN_SYMBOL} on <strong>Robinhood Chain (L2)</strong> in under 2 minutes.
          </p>
        </div>

        {/* 4 Quest Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_TO_BUY_STEPS.map((stepItem, idx) => (
            <motion.div
              key={stepItem.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="bg-[#14231b] p-6 border-4 border-black shadow-[8px_8px_0px_0px_#00C805] flex flex-col justify-between relative group hover:-translate-y-1 transition-transform"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#FFD700] text-black font-black text-lg border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000000]">
                {stepItem.step}
              </div>

              <div className="pt-2 space-y-4">
                <div className="w-12 h-12 bg-[#00C805] border-3 border-black flex items-center justify-center font-black text-black text-xl shadow-[3px_3px_0px_0px_#000000]">
                  {idx === 0 && <Wallet className="w-6 h-6 stroke-[3]" />}
                  {idx === 1 && <Network className="w-6 h-6 stroke-[3]" />}
                  {idx === 2 && <Zap className="w-6 h-6 stroke-[3]" />}
                  {idx === 3 && <ArrowLeftRight className="w-6 h-6 stroke-[3]" />}
                </div>

                <h3 className="text-lg font-black text-white uppercase leading-snug">
                  {stepItem.title}
                </h3>

                <p className="text-xs text-gray-300 font-bold leading-relaxed">
                  {stepItem.description}
                </p>
              </div>

              {/* Step Action Button if present */}
              {stepItem.actionText && (
                <div className="mt-6 pt-4 border-t-2 border-white/10">
                  <button
                    onClick={stepItem.actionPayload === 'rpc' ? handleCopyRpc : handleCopyCa}
                    className="w-full bg-[#00C805] hover:bg-[#00E506] text-black font-black text-xs py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#ffffff] flex items-center justify-center gap-1.5 uppercase transition-all"
                  >
                    {stepItem.actionPayload === 'rpc' ? (
                      copiedRpc ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4 stroke-[3]" />
                    ) : (
                      copiedCa ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4 stroke-[3]" />
                    )}
                    <span>
                      {stepItem.actionPayload === 'rpc' 
                        ? (copiedRpc ? "RPC Config Copied!" : "Copy RPC Config") 
                        : (copiedCa ? "CA Copied!" : "Copy CA")}
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

