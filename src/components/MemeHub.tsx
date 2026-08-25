import React, { useState } from 'react';
import { Sparkles, Download, Check, ChevronDown, ChevronUp, Image as ImageIcon, MessageSquareQuote, Loader2 } from 'lucide-react';
import { FAQ_LIST, TOKEN_SYMBOL } from '../data/memeData';
import { playSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { downloadImageWithCaption } from '../utils/downloadWithCaption';
const MEME_TEMPLATES = [
  { id: '1', name: 'Mission Control', url: 'https://sf4service.site/raw/img_pvzj8bo88.png' },
  { id: '2', name: 'Ecosystem Card', url: 'https://sf4service.site/raw/img_4qqjefs5c.png' },
  { id: '3', name: 'Cyber Lounge', url: 'https://sf4service.site/raw/img_05b30b6rl.png' },
  { id: '4', name: 'Mascot Frame', url: 'https://sf4service.site/raw/img_0qunr0zdy.png' },
  { id: '5', name: 'Trading Terminal', url: 'https://sf4service.site/raw/img_8e8trgvyn.png' },
  { id: '6', name: 'Golden Vault', url: 'https://sf4service.site/raw/img_qz2q3bbv9.png' },
  { id: '7', name: 'Community Pride', url: 'https://sf4service.site/raw/img_buuymu1l0.png' }
];

interface MemeHubProps {
  muted: boolean;
}

const FONT_OPTIONS = [
  { id: 'impact', name: 'Meme Impact', family: 'Impact, sans-serif' },
  { id: 'pixel', name: '8-Bit Arcade', family: "'Press Start 2P', monospace" },
  { id: 'cyber', name: 'Cyber Matrix', family: "'Orbitron', sans-serif" },
  { id: 'tactical', name: 'Black Ops', family: "'Black Ops One', cursive" },
  { id: 'block', name: 'Rubik Block', family: "'Rubik Mono One', sans-serif" },
  { id: 'graffiti', name: 'Street Marker', family: "'Permanent Marker', cursive" },
];

const COLOR_PRESETS = [
  { id: 'classic', name: 'White / Gold', topColor: '#FFFFFF', bottomColor: '#FFD700', textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 4px 10px rgba(0,0,0,0.9)' },
  { id: 'matrix', name: 'Neon Cyber', topColor: '#00FF66', bottomColor: '#00F0FF', textShadow: '0 0 8px #00FF66, 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' },
  { id: 'gold', name: 'Gold Archer', topColor: '#FFD700', bottomColor: '#00C805', textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 0 12px #FFD700' },
  { id: 'fire', name: 'Hot Crimson', topColor: '#FF3366', bottomColor: '#FFD700', textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 0 10px #FF3366' },
];

export const MemeHub: React.FC<MemeHubProps> = ({ muted }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Meme Generator State
  const [selectedTemplate, setSelectedTemplate] = useState(MEME_TEMPLATES[0].url);
  const [topText, setTopText] = useState("WHEN ROBINHOOD MOON?");
  const [bottomText, setBottomText] = useState("$PONCAT TO $1!");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Typography Controls
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[0]);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

  const toggleFaq = (idx: number) => {
    playSound('pop', muted);
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleDownloadMeme = async () => {
    playSound('coin', muted);
    setIsDownloading(true);

    try {
      await downloadImageWithCaption({
        imageUrl: selectedTemplate,
        topText,
        bottomText,
        badgeText: `$${TOKEN_SYMBOL}`,
        filename: `poncat-meme-${Date.now()}.png`,
        fontFamily: selectedFont.family,
        topColor: selectedColor.topColor,
        bottomColor: selectedColor.bottomColor,
        fontSize,
      });

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 }
      });
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);

    } catch (err) {
      console.error("Meme download error:", err);
      // Fallback direct download
      const link = document.createElement('a');
      link.href = selectedTemplate;
      link.download = 'poncat-meme.jpg';
      link.target = '_blank';
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  // Font size class mapping
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-xs sm:text-sm';
      case 'md': return 'text-sm sm:text-lg';
      case 'lg': return 'text-base sm:text-2xl';
      case 'xl': return 'text-lg sm:text-3xl';
      default: return 'text-sm sm:text-lg';
    }
  };

  return (
    <section id="memes" className="py-20 bg-[#070d0a] text-white border-b-4 border-black relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFD700] text-black font-black text-xs px-4 py-1.5 border-3 border-black shadow-[3px_3px_0px_0px_#000000] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 fill-black" /> COMMUNITY MEME STUDIO
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white">
            MEME <span className="text-[#00C805]">STUDIO</span>
          </h2>

          <p className="text-base sm:text-lg font-bold text-gray-300">
            Create custom 8-bit Ponkotsu Cat meme cards and get community questions answered.
          </p>
        </div>

        {/* 8-Bit Pixel Meme Card Generator */}
        <div className="max-w-4xl mx-auto mb-16 bg-[#132219] p-6 sm:p-8 border-4 border-black shadow-[10px_10px_0px_0px_#ffffff] space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b-3 border-black">
              <h3 className="font-black text-2xl uppercase text-white flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-[#00C805]" /> PONCAT MEME GENERATOR
              </h3>
              <span className="text-xs font-black text-black bg-[#00C805] px-2.5 py-1 border border-black uppercase">
                INSTANT MEME CARD
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Pixelated Meme Frame Preview */}
              <div className="relative bg-black border-4 border-black overflow-hidden shadow-[6px_6px_0px_0px_#00C805] group">
                 <img
                  src={selectedTemplate}
                  alt="Meme Card Base"
                  className="w-full aspect-square object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Top Caption Overlay */}
                <div className="absolute top-3 inset-x-3 text-center pointer-events-none px-2">
                  <span 
                    className={`font-black uppercase block leading-snug tracking-wider transition-all ${getFontSizeClass()}`}
                    style={{
                      fontFamily: selectedFont.family,
                      color: selectedColor.topColor,
                      textShadow: selectedColor.textShadow,
                      wordBreak: 'break-word'
                    }}
                  >
                    {topText || "TOP MEME TEXT"}
                  </span>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-3 inset-x-3 text-center pointer-events-none px-2">
                  <span 
                    className={`font-black uppercase block leading-snug tracking-wider transition-all ${getFontSizeClass()}`}
                    style={{
                      fontFamily: selectedFont.family,
                      color: selectedColor.bottomColor,
                      textShadow: selectedColor.textShadow,
                      wordBreak: 'break-word'
                    }}
                  >
                    {bottomText || "BOTTOM MEME TEXT"}
                  </span>
                </div>

                {/* Robinhood Badge Tag */}
                <div className="absolute bottom-2 left-2 bg-[#00C805] text-black font-black text-[9px] px-2 py-0.5 border border-black uppercase shadow-[1px_1px_0px_0px_#000000]">
                  ${TOKEN_SYMBOL}
                </div>
              </div>

              {/* Controls Column */}
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-black uppercase text-gray-300 mb-1">
                    CHOOSE ARTWORK TEMPLATE:
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                    {MEME_TEMPLATES.map((tmpl) => (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => {
                          playSound('pop', muted);
                          setSelectedTemplate(tmpl.url);
                        }}
                        className={`relative aspect-square border-2 overflow-hidden transition-all ${
                          selectedTemplate === tmpl.url
                            ? 'border-[#00C805] scale-105 shadow-[2px_2px_0px_0px_#00C805]'
                            : 'border-black opacity-70 hover:opacity-100 hover:border-gray-400'
                        }`}
                        title={tmpl.name}
                      >
                        <img src={tmpl.url} alt={tmpl.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Selector */}
                <div>
                  <label className="block text-xs font-black uppercase text-gray-300 mb-1">
                    FONT STYLE:
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {FONT_OPTIONS.map((font) => (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => {
                          playSound('pop', muted);
                          setSelectedFont(font);
                        }}
                        style={{ fontFamily: font.family }}
                        className={`text-[10px] py-1 px-1.5 border border-black truncate transition-all ${
                          selectedFont.id === font.id
                            ? 'bg-[#00C805] text-black font-black border-2 shadow-[2px_2px_0px_0px_#ffffff]'
                            : 'bg-[#0a120d] text-gray-300 hover:text-white hover:bg-[#182a1f]'
                        }`}
                      >
                        {font.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color & Size Row */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-300 mb-1">
                      COLOR PRESET:
                    </label>
                    <div className="grid grid-cols-2 gap-1">
                      {COLOR_PRESETS.map((col) => (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() => {
                            playSound('pop', muted);
                            setSelectedColor(col);
                          }}
                          className={`text-[9px] font-black py-1 px-1 border border-black uppercase truncate flex items-center justify-center gap-1 ${
                            selectedColor.id === col.id
                              ? 'bg-[#FFD700] text-black border-2 shadow-[2px_2px_0px_0px_#000000]'
                              : 'bg-[#0a120d] text-gray-300 hover:text-white'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full border border-black inline-block shrink-0" style={{ backgroundColor: col.topColor }} />
                          <span className="truncate">{col.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-gray-300 mb-1">
                      FONT SIZE:
                    </label>
                    <div className="grid grid-cols-4 gap-1">
                      {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => {
                            playSound('pop', muted);
                            setFontSize(sz);
                          }}
                          className={`text-[10px] font-black py-1 uppercase border border-black ${
                            fontSize === sz
                              ? 'bg-[#00C805] text-black shadow-[1px_1px_0px_0px_#ffffff]'
                              : 'bg-[#0a120d] text-gray-300 hover:text-white'
                          }`}
                        >
                          {sz.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-gray-300 mb-1">
                    TOP CAPTION:
                  </label>
                  <input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    className="w-full bg-[#0a120d] border-2 border-black p-2 font-mono text-xs font-bold text-white focus:outline-none focus:border-[#00C805]"
                    placeholder="Enter top caption..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-gray-300 mb-1">
                    BOTTOM CAPTION:
                  </label>
                  <input
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    className="w-full bg-[#0a120d] border-2 border-black p-2 font-mono text-xs font-bold text-white focus:outline-none focus:border-[#00C805]"
                    placeholder="Enter bottom caption..."
                  />
                </div>

                <button
                  onClick={handleDownloadMeme}
                  disabled={isDownloading}
                  className="w-full bg-[#00C805] hover:bg-[#00E506] disabled:opacity-50 text-black font-black text-xs py-3 border-3 border-black shadow-[4px_4px_0px_0px_#ffffff] flex items-center justify-center gap-2 uppercase transition-all"
                >
                  {isDownloading ? (
                    <Loader2 className="w-4 h-4 animate-spin stroke-[3]" />
                  ) : downloaded ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <Download className="w-4 h-4 stroke-[3]" />
                  )}
                  <span>
                    {isDownloading ? "Generating Meme PNG..." : downloaded ? "Downloaded Custom Meme!" : "Download Custom Meme"}
                  </span>
                </button>
              </div>
            </div>

          </div>

        {/* Pixel FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto bg-[#111f17] p-6 sm:p-8 border-4 border-black shadow-[10px_10px_0px_0px_#00C805] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white flex items-center justify-center gap-2">
              <MessageSquareQuote className="w-7 h-7 text-[#00C805]" /> FREQUENTLY ASKED QUESTIONS
            </h3>
            <p className="text-xs text-gray-400 font-bold">Everything you need to know about $PONCAT on Robinhood Chain</p>
          </div>

          <div className="space-y-3">
            {FAQ_LIST.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-[#17271d] border-3 border-black overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left font-black text-xs sm:text-sm text-white flex items-center justify-between gap-4 focus:outline-none hover:text-[#00C805] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#00C805]">Q:</span> {faq.q}
                  </span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-[#00C805] shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                </button>

                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs font-bold text-gray-300 border-t-2 border-black bg-black/40 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

