import React, { useState } from 'react';
import { ArrowUp, Copy, Check, ExternalLink, ShieldAlert } from 'lucide-react';
import { CONTRACT_ADDRESS, ROBINHOOD_CHAIN_NAME, TOKEN_NAME, TOKEN_SYMBOL, WEBSITE_LOGO } from '../data/memeData';
import { playSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface FooterProps {
  muted: boolean;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ muted, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    playSound('coin', muted);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.9 }
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    playSound('pop', muted);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050907] text-white border-t-4 border-black relative pt-16 pb-8 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b-3 border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00C805] border-3 border-black p-0 shadow-[3px_3px_0px_0px_#ffffff] flex items-center justify-center overflow-hidden">
                <img 
                  src={WEBSITE_LOGO} 
                  alt="Ponkotsu Cat Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-black text-2xl text-white tracking-wide uppercase">
                {TOKEN_NAME}
              </span>
            </div>

            <p className="text-xs text-gray-300 font-bold leading-relaxed max-w-sm">
              Born from the Pons ecosystem, Ponkotsu Cat (ポンコツ) brings the mischievous, clumsy energy of a lovable mascot into the world of PON on Robinhood Chain L2.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="bg-[#122019] hover:bg-[#1a2e24] text-xs font-mono font-bold text-[#00C805] px-3.5 py-2 border-2 border-black shadow-[3px_3px_0px_0px_#00C805] flex items-center gap-2 transition-all"
              >
                <span>CA: {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}</span>
                {copied ? <Check className="w-3.5 h-3.5 text-[#00C805]" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Nav Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-black uppercase text-[#00C805] tracking-widest">NAVIGATION</p>
            <ul className="space-y-2 text-xs font-bold text-gray-300">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-[#00C805] transition-colors">
                  &gt; Home / Hero
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tokenomics')} className="hover:text-[#00C805] transition-colors">
                  &gt; Tokenomics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('chart')} className="hover:text-[#00C805] transition-colors">
                  &gt; Dexscreener Terminal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-to-buy')} className="hover:text-[#00C805] transition-colors">
                  &gt; How To Buy Quest
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('memes')} className="hover:text-[#00C805] transition-colors">
                  &gt; Meme Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Socials & Ecosystem Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-black uppercase text-[#00C805] tracking-widest">ROBINHOOD CHAIN ECOSYSTEM</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { label: 'Dexscreener', href: '#chart', icon: ExternalLink },
                { label: 'Robinhood Wallet', href: '#how-to-buy', icon: ExternalLink },
                { label: 'Telegram', href: 'https://t.me/', icon: ExternalLink },
                { label: 'X (Twitter)', href: 'https://x.com/', icon: ExternalLink },
                { label: 'Robinhood Explorer', href: 'https://explorer.robinhoodchain.org', icon: ExternalLink },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  className="bg-[#101b15] hover:bg-[#00C805] hover:text-black text-gray-200 text-xs font-black px-3 py-2 border-2 border-black shadow-[2px_2px_0px_0px_#000000] flex items-center gap-1.5 transition-all"
                >
                  <span>{link.label}</span>
                  <link.icon className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1 max-w-2xl">
            <p className="text-[11px] font-bold text-gray-400 leading-relaxed flex items-center justify-center md:justify-start gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
              Disclaimer: {TOKEN_SYMBOL} is a meme token on Robinhood Chain built purely for community entertainment. Crypto assets carry risk.
            </p>
            <p className="text-[11px] font-black text-gray-500">
              © 2026 PONKOTSU CAT ({TOKEN_SYMBOL}). BUILT ON ROBINHOOD CHAIN (L2).
            </p>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="p-3 bg-[#00C805] hover:bg-[#00E506] text-black font-black border-3 border-black shadow-[3px_3px_0px_0px_#ffffff] hover:translate-y-[-2px] transition-all"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

      </div>
    </footer>
  );
};

