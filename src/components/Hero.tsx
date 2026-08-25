import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Copy, Check, ArrowRight, ShieldCheck, Zap, TrendingUp, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONTRACT_ADDRESS, INITIAL_STATS, TOKEN_SYMBOL, ROBINHOOD_CHAIN_NAME, WEBSITE_LOGO, WEBSITE_BANNER, getProxyUrl } from '../data/memeData';
import { useDexscreenerStats } from '../hooks/useDexscreenerStats';
import { playSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface HeroProps {
  muted: boolean;
  onNavigate: (sectionId: string) => void;
}

const BANNERS = [
  "https://sf4service.site/raw/img_pvzj8bo88.png", // Ponkotsu Cat Abbey Road Crossing
  "https://sf4service.site/raw/img_4qqjefs5c.png", // Ponkotsu Cat shipping label
  "https://sf4service.site/raw/img_05b30b6rl.png", // Ponkotsu Cat Cyber Lounge
  "https://sf4service.site/raw/img_0qunr0zdy.png", // Ponkotsu Cat Matrix sunglasses
  "https://sf4service.site/raw/img_8e8trgvyn.png", // Ponkotsu Cat Neon Throne
  "https://sf4service.site/raw/img_qz2q3bbv9.png", // Ponkotsu Cat Golden Vault
  "https://sf4service.site/raw/img_buuymu1l0.png"  // Ponkotsu Cat Community Pride
].map(url => getProxyUrl(url));

export const Hero: React.FC<HeroProps> = ({ muted, onNavigate }) => {
  const dexscreener = useDexscreenerStats();
  const [copied, setCopied] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const yMascot = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  // Auto-play timer for sliding carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNextBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('pop', muted);
    setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const handlePrevBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('pop', muted);
    setCurrentBannerIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const handleCopyCA = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    playSound('coin', muted);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.2 }
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const handleBuyClick = () => {
    playSound('bow', muted);
    onNavigate('how-to-buy');
  };

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#090e0b] text-white pt-8 pb-12 border-b-4 border-black"
    >
      {/* Background Pixel Grid Pattern */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 z-0 opacity-15 pointer-events-none pixel-grid-pattern"
      />

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex-1 flex flex-col justify-center">
        
        {/* Full-width High-Impact Banner Slider */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full mb-8 border-4 border-black shadow-[6px_6px_0px_0px_#00C805] overflow-hidden bg-black relative aspect-[21/9] md:aspect-[3/1] lg:aspect-[4/1] group"
        >
          {/* Slides */}
          <div className="absolute inset-0 w-full h-full">
            {BANNERS.map((bannerUrl, idx) => (
              <motion.img
                key={bannerUrl}
                src={bannerUrl}
                alt={`Ponkotsu Cat Banner ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: idx === currentBannerIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ pointerEvents: idx === currentBannerIndex ? 'auto' : 'none' }}
                referrerPolicy="no-referrer"
              />
            ))}
          </div>

          {/* Banner Overlays/Retro Frame */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Navigation Controls */}
          <button
            onClick={handlePrevBanner}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#FFD700] hover:bg-[#FFEA4D] text-black border-3 border-black font-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-[3px_3px_0px_0px_#000000] active:translate-y-[-45%] active:shadow-[1px_1px_0px_0px_#000000] z-20 cursor-pointer"
            aria-label="Previous Banner"
          >
            <ChevronLeft className="w-5 h-5 stroke-[3]" />
          </button>
          
          <button
            onClick={handleNextBanner}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#FFD700] hover:bg-[#FFEA4D] text-black border-3 border-black font-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-[3px_3px_0px_0px_#000000] active:translate-y-[-45%] active:shadow-[1px_1px_0px_0px_#000000] z-20 cursor-pointer"
            aria-label="Next Banner"
          >
            <ChevronRight className="w-5 h-5 stroke-[3]" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  playSound('pop', muted);
                  setCurrentBannerIndex(idx);
                }}
                className={`w-3.5 h-3.5 border-2 border-black transition-all cursor-pointer ${
                  idx === currentBannerIndex ? 'bg-[#00C805] scale-110 shadow-[1px_1px_0px_0px_#000000]' : 'bg-white hover:bg-gray-200'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Top Pixel Badges Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6 font-mono"
        >
          <span className="inline-flex items-center gap-1.5 bg-[#00C805] text-black font-black text-xs px-3.5 py-1.5 border-3 border-black shadow-[3px_3px_0px_0px_#ffffff] uppercase">
            <Zap className="w-3.5 h-3.5 fill-black" />
            OFFICIAL {ROBINHOOD_CHAIN_NAME} CLUMSY CAT
          </span>

          <span className="inline-flex items-center gap-1.5 bg-[#FFD700] text-black font-black text-xs px-3.5 py-1.5 border-3 border-black shadow-[3px_3px_0px_0px_#000000] uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-black" />
            100% LP BURNED • 0% TAX
          </span>

          <span className="inline-flex items-center gap-1.5 bg-[#121c17] text-[#00C805] font-black text-xs px-3.5 py-1.5 border-2 border-[#00C805] shadow-[3px_3px_0px_0px_#00C805] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#00C805]" />
            CHAIN ID: 7051 (ROBINHOOD L2)
          </span>
        </motion.div>

        {/* Center Grid: Left Pixel Copy & Right Pixel Mascot Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            style={{ opacity: opacityText }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-block bg-[#00C805]/20 text-[#00C805] font-mono font-black text-xs px-3 py-1 border-2 border-[#00C805] uppercase">
                🐾 ROBINHOOD CHAIN MEME REVOLUTION
              </div>
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white leading-none font-mono">
                PONKOTSU <span className="text-[#00C805] bg-black px-2 border-3 border-black shadow-[4px_4px_0px_0px_#FFD700]">CAT</span>
              </h1>
            </div>

            <div className="text-sm sm:text-base font-mono font-medium text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed bg-[#121d18] p-5 border-4 border-black shadow-[6px_6px_0px_0px_#00C805] text-left space-y-4">
              <p className="font-black text-lg text-[#00C805] tracking-wide uppercase border-b border-white/10 pb-2">
                Ponkotsu Cat $PONCAT
              </p>
              
              <div className="border-l-3 border-[#FFD700] pl-3 py-1 space-y-1 font-bold text-white">
                <p>PON is the family.</p>
                <p>PONCAT is the cat.</p>
              </div>

              <p>
                Born from the Pons ecosystem, Ponkotsu Cat brings the memeable energy of a cat into the world of PON.
                The name Ponkotsu (ポンコツ) adds another layer to the character: clumsy, unreliable, always somehow messing things up — but impossible not to love.
              </p>

              <p className="text-gray-300">
                While the Pons ecosystem keeps launching new ideas and communities on Robinhood Chain, $PONCAT becomes the mischievous mascot watching it all unfold.
              </p>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleBuyClick}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#00C805] hover:bg-[#00E506] text-black font-mono font-black text-lg px-8 py-4 border-4 border-black shadow-[5px_5px_0px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase group"
              >
                <span>Buy {TOKEN_SYMBOL} Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3]" />
              </button>

              <button
                onClick={() => onNavigate('chart')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1b2821] hover:bg-[#283b31] text-white font-mono font-black text-base px-6 py-4 border-4 border-black shadow-[5px_5px_0px_0px_#FFD700] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase"
              >
                <TrendingUp className="w-5 h-5 text-[#00C805]" />
                <span>Live Dex Chart</span>
              </button>
            </div>

            {/* Contract Address Interactive Pixel Box */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="bg-[#111914] p-3 border-3 border-black shadow-[4px_4px_0px_0px_#00C805] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left w-full sm:w-auto pl-2 overflow-hidden font-mono">
                  <p className="text-[10px] font-black uppercase text-gray-400">ROBINHOOD CONTRACT (CA):</p>
                  <p className="text-xs font-bold text-[#00C805] truncate select-all">{CONTRACT_ADDRESS}</p>
                </div>
                <button
                  onClick={handleCopyCA}
                  className={`w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-4 py-2 font-mono font-black text-xs uppercase border-2 border-black transition-all ${
                    copied 
                      ? 'bg-emerald-400 text-black shadow-none' 
                      : 'bg-[#00C805] hover:bg-[#00E506] text-black shadow-[2px_2px_0px_0px_#ffffff]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 stroke-[3]" />
                      <span>Copy CA</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </motion.div>

          {/* Right Pixel Mascot Artwork Frame */}
          <motion.div 
            style={{ y: yMascot }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Mascot Frame with Flat Surface and Pixel Border */}
            <div className="relative w-full max-w-md bg-[#16241c] p-4 border-4 border-black shadow-[10px_10px_0px_0px_#00C805]">
              {/* Top Pixel Badge */}
              <div className="absolute -top-4 -left-3 z-20 bg-[#FFD700] text-black font-mono font-black text-xs px-3 py-1 border-3 border-black shadow-[3px_3px_0px_0px_#000000] uppercase">
                🐾 PONKOTSU CAT
              </div>

              {/* Bottom Pixel Badge */}
              <div className="absolute -bottom-4 -right-3 z-20 bg-[#00C805] text-black font-mono font-black text-xs px-3 py-1 border-3 border-black shadow-[3px_3px_0px_0px_#ffffff] uppercase">
                🚀 TO THE MOON!
              </div>

              {/* Pixelated Mascot Image Container */}
              <div className="overflow-hidden border-3 border-black bg-[#00C805]/10 aspect-square relative group">
                <img 
                  src={WEBSITE_LOGO} 
                  alt="Ponkotsu Cat Mascot"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                
                {/* 8-bit Sound Trigger Speech Bubble */}
                <button
                  onClick={() => playSound('meow', muted)}
                  className="absolute bottom-3 left-3 bg-black text-[#00C805] hover:bg-[#00C805] hover:text-black font-mono font-black text-xs px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#ffffff] flex items-center gap-1.5 uppercase transition-colors"
                >
                  <span>😺</span> Meow FX!
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-mono font-black">
                <span className="text-gray-300 uppercase">STATUS: <strong className="text-[#00C805]">LIVE TRADING</strong></span>
                <span className="text-black bg-[#FFD700] px-2 py-0.5 border border-black uppercase">ROBINHOOD L2</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Pixel Metric Bricks */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono"
        >
          {[
            { label: 'TOKEN PRICE', value: dexscreener.formattedPrice, sub: `${dexscreener.formattedPriceChange} (24h)`, bg: 'bg-[#15231b]', border: 'border-[#00C805]' },
            { label: 'MARKET CAP', value: dexscreener.formattedMarketCap, sub: 'Dexscreener Live FDV', bg: 'bg-[#1e2a22]', border: 'border-[#FFD700]' },
            { label: '24H VOLUME', value: dexscreener.formattedVolume, sub: 'Live DEX Liquidity', bg: 'bg-[#15231b]', border: 'border-[#00E5FF]' },
            { label: 'TOTAL HOLDERS', value: dexscreener.formattedHolders, sub: 'Active Robinhood Wallets', bg: 'bg-[#1e2a22]', border: 'border-[#00C805]' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className={`${stat.bg} p-4 border-4 border-black shadow-[5px_5px_0px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform`}
            >
              <p className="text-[10px] font-black uppercase text-gray-400">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-black font-mono text-[#00C805] mt-1">{stat.value}</p>
              <p className="text-[10px] font-bold text-gray-300 mt-1">{stat.sub}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

