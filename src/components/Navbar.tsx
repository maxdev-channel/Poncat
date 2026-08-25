import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, ArrowRight, Menu, X, Send } from 'lucide-react';
import { CONTRACT_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, WEBSITE_LOGO, TWITTER_URL, TELEGRAM_URL } from '../data/memeData';
import { playSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface NavbarProps {
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ muted, setMuted, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyCA = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    playSound('coin', muted);
    
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.1 }
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavClick = (id: string) => {
    playSound('pop', muted);
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c120e] text-white border-b-4 border-black shadow-[0_4px_0_0_#00C805]">
      {/* 8-bit LED Pixel Ticker Bar */}
      <div className="bg-[#00C805] text-black font-mono font-black text-[10px] md:text-xs py-1 px-4 overflow-hidden whitespace-nowrap border-b-3 border-black">
        <div className="inline-block animate-marquee uppercase tracking-widest">
          <span>[PONCAT] 🐾 $PONCAT IS LIVE ON ROBINHOOD CHAIN • 0% TAX • 100% LP BURNED • FAST SUB-CENT GAS • [JOIN THE REVOLUTION] • </span>
          <span>[PONCAT] 🐾 $PONCAT IS LIVE ON ROBINHOOD CHAIN • 0% TAX • 100% LP BURNED • FAST SUB-CENT GAS • [JOIN THE REVOLUTION] • </span>
        </div>
      </div>

      {/* Main Pixel Arcade Header Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 md:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Compact Name */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-2 sm:gap-3 group text-left focus:outline-none flex-shrink-0"
        >
          <div className="w-10 h-10 md:w-11 md:h-11 bg-[#FFD700] border-3 border-black rounded-none shadow-[2px_2px_0px_0px_#00C805] group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-transform flex items-center justify-center overflow-hidden flex-shrink-0">
            <img 
              src={WEBSITE_LOGO} 
              alt="Ponkotsu Cat Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-black text-sm sm:text-base md:text-lg text-white tracking-wider uppercase whitespace-nowrap">
                Ponkotsu Cat
              </span>
              <span className="bg-[#00C805] text-black text-[9px] font-mono font-black px-1.5 py-0.5 border border-black uppercase hidden sm:inline-block shadow-[1px_1px_0px_0px_#000000]">
                {TOKEN_SYMBOL}
              </span>
            </div>
            <p className="text-[9px] font-mono font-bold text-[#00C805] tracking-wide uppercase">ROBINHOOD CHAIN L2</p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#16221b] p-1 border-3 border-black shadow-[3px_3px_0px_0px_#000000]">
          {[
            { id: 'hero', label: 'Home' },
            { id: 'tokenomics', label: 'Tokenomics' },
            { id: 'chart', label: 'Dex Chart' },
            { id: 'how-to-buy', label: 'How to Buy' },
            { id: 'memes', label: 'Meme Hub' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="px-3 py-1 font-mono font-black text-[11px] uppercase tracking-wider text-gray-300 hover:text-black hover:bg-[#00C805] transition-all border-2 border-transparent hover:border-black whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
          {/* Social Links on Desktop */}
          <div className="hidden md:flex items-center gap-1.5">
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('pop', muted)}
              title="Official X (Twitter)"
              className="p-1.5 bg-[#121c17] hover:bg-[#00C805] hover:text-black text-gray-200 border-2 border-black shadow-[2px_2px_0px_0px_#ffffff] text-xs font-mono font-black transition-all flex items-center justify-center w-8 h-8"
            >
              X
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('pop', muted)}
              title="Official Telegram"
              className="p-1.5 bg-[#121c17] hover:bg-[#00E5FF] hover:text-black text-[#00E5FF] border-2 border-black shadow-[2px_2px_0px_0px_#00E5FF] text-xs font-mono font-black transition-all flex items-center justify-center w-8 h-8"
            >
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mute/Unmute 8-Bit Audio */}
          <button
            onClick={() => {
              setMuted(!muted);
              playSound('pop', false);
            }}
            title={muted ? "Unmute Sound Effects" : "Mute Sound Effects"}
            className="p-2 bg-[#1a2820] hover:bg-[#25392d] text-yellow-400 border-2 border-black shadow-[2px_2px_0px_0px_#00C805] hover:scale-105 active:translate-y-[1px] transition-all text-xs font-mono font-bold flex-shrink-0"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5 text-gray-400" /> : <Volume2 className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />}
          </button>

          {/* Quick CA Copy Pixel Box - Hidden on mobile/tablet */}
          <button
            onClick={handleCopyCA}
            className="hidden lg:flex items-center gap-1.5 bg-[#121c17] hover:bg-[#1a2820] text-[11px] font-mono font-bold text-gray-200 px-2.5 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#FFD700] active:translate-y-[1px] transition-all flex-shrink-0"
          >
            <span className="text-[#00C805]">CA:</span>
            <span>{CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}</span>
            {copied ? <Check className="w-3 h-3 text-[#00C805]" /> : <Copy className="w-3 h-3 text-gray-400" />}
          </button>

          {/* Buy Button CTA */}
          <button
            onClick={() => handleNavClick('how-to-buy')}
            className="hidden sm:flex items-center gap-1.5 bg-[#00C805] hover:bg-[#00E506] text-black font-mono font-black text-xs px-3.5 py-2 border-3 border-black shadow-[2.5px_2.5px_0px_0px_#ffffff] hover:translate-x-[1px] hover:translate-y-[1px] transition-all uppercase flex-shrink-0 cursor-pointer"
          >
            <span>Buy {TOKEN_SYMBOL}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          {/* Responsive Mobile Menu Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              playSound('pop', muted);
            }}
            className="lg:hidden p-2 bg-[#16221b] hover:bg-[#233529] text-[#00C805] border-2 border-black shadow-[2px_2px_0px_0px_#000000] flex-shrink-0"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Retro 8-bit Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c120e] border-t-3 border-black p-4 space-y-3 font-mono">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'tokenomics', label: 'Tokenomics' },
              { id: 'chart', label: 'Dex Chart' },
              { id: 'how-to-buy', label: 'How to Buy' },
              { id: 'memes', label: 'Meme Hub' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-center py-2.5 bg-[#16221b] border-2 border-black text-xs font-black uppercase text-gray-200 hover:bg-[#00C805] hover:text-black active:translate-y-0.5 transition-all whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Social Links */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('pop', muted)}
              className="flex items-center justify-center gap-1.5 py-2 bg-[#16221b] hover:bg-white hover:text-black text-xs font-black border-2 border-black text-white uppercase"
            >
              <span>X (Twitter)</span>
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('pop', muted)}
              className="flex items-center justify-center gap-1.5 py-2 bg-[#16221b] hover:bg-[#00E5FF] hover:text-black text-xs font-black border-2 border-black text-[#00E5FF] uppercase"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </a>
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row gap-2">
            {/* CA Copy inside mobile menu */}
            <button
              onClick={handleCopyCA}
              className="w-full flex items-center justify-between bg-[#121c17] text-xs font-mono font-bold text-gray-200 px-3 py-2 border-2 border-black"
            >
              <div className="flex items-center gap-1">
                <span className="text-[#00C805]">CA:</span>
                <span>{CONTRACT_ADDRESS}</span>
              </div>
              {copied ? <Check className="w-3.5 h-3.5 text-[#00C805]" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
            </button>

            {/* Buy button for small screens inside menu */}
            <button
              onClick={() => handleNavClick('how-to-buy')}
              className="w-full sm:hidden flex items-center justify-center gap-2 bg-[#00C805] text-black font-black text-xs py-2.5 border-2 border-black uppercase shadow-[2px_2px_0px_0px_#ffffff]"
            >
              <span>Buy {TOKEN_SYMBOL}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

