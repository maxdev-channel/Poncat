import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Download, Share2, Check, ExternalLink, Loader2 } from 'lucide-react';
import { playSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { downloadImageWithCaption } from '../utils/downloadWithCaption';
import { TOKEN_SYMBOL, WEBSITE_BANNER, WEBSITE_LOGO, getProxyUrl } from '../data/memeData';

interface PromoGalleryProps {
  muted: boolean;
}

const PROMO_BANNERS = [
  {
    id: 'banner-poncat-1',
    title: 'Ponkotsu Cat Mission Control',
    url: 'https://sf4service.site/raw/img_pvzj8bo88.png',
    badge: 'Mission Control'
  },
  {
    id: 'banner-poncat-2',
    title: 'Ponkotsu Cat Ecosystem Card',
    url: 'https://sf4service.site/raw/img_4qqjefs5c.png',
    badge: 'Ecosystem Card'
  },
  {
    id: 'banner-poncat-3',
    title: 'Ponkotsu Cat Cyber Lounge',
    url: 'https://sf4service.site/raw/img_05b30b6rl.png',
    badge: 'Cyber Lounge'
  },
  {
    id: 'banner-poncat-4',
    title: 'Ponkotsu Cat Mascot Frame',
    url: 'https://sf4service.site/raw/img_0qunr0zdy.png',
    badge: 'Mascot Frame'
  },
  {
    id: 'banner-poncat-5',
    title: 'Ponkotsu Cat Trading Terminal',
    url: 'https://sf4service.site/raw/img_8e8trgvyn.png',
    badge: 'Terminal Art'
  },
  {
    id: 'banner-poncat-6',
    title: 'Ponkotsu Cat Golden Vault',
    url: 'https://sf4service.site/raw/img_qz2q3bbv9.png',
    badge: 'Golden Vault'
  },
  {
    id: 'banner-poncat-7',
    title: 'Ponkotsu Cat Community Pride',
    url: 'https://sf4service.site/raw/img_buuymu1l0.png',
    badge: 'Community Pride'
  }
].map(item => ({ ...item, url: getProxyUrl(item.url) }));

export const PromoGallery: React.FC<PromoGalleryProps> = ({ muted }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownloadBanner = async (banner: typeof PROMO_BANNERS[0]) => {
    playSound('coin', muted);
    setDownloadingId(banner.id);
    try {
      await downloadImageWithCaption({
        imageUrl: banner.url,
        topText: banner.title,
        bottomText: `${TOKEN_SYMBOL} • ROBINHOOD CHAIN`,
        badgeText: banner.badge,
        filename: `${banner.id}-captioned.png`,
        topColor: "#FFD700",
        bottomColor: "#00C805",
        fontSize: "md",
      });
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 }
      });
    } catch (err) {
      console.error("Banner download error:", err);
      window.open(banner.url, '_blank');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleShare = (index: number, url: string) => {
    playSound('coin', muted);
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    
    confetti({
      particleCount: 20,
      spread: 30,
      origin: { y: 0.8 }
    });

    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const handleOpenImage = (url: string) => {
    playSound('pop', muted);
    setSelectedImage(url);
  };

  return (
    <section id="promo-gallery" className="py-20 bg-[#08100c] text-white border-b-4 border-black relative font-mono">
      {/* Background decoration */}
      <div className="absolute inset-0 pixel-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#00C805] text-black font-black text-xs px-4 py-1.5 border-3 border-black shadow-[3px_3px_0px_0px_#ffffff] uppercase tracking-wider">
            <ImageIcon className="w-4 h-4" /> OFFICIAL BRAND KIT
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white">
            PROMO <span className="text-[#FFD700]">GRAPHICS</span>
          </h2>

          <p className="text-base sm:text-lg font-bold text-gray-300">
            Official high-fidelity campaign banners for community sharing. Download, post on X, or use them as wallpaper!
          </p>
        </div>

        {/* Graphics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROMO_BANNERS.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#121f18] border-4 border-black shadow-[8px_8px_0px_0px_#00C805] flex flex-col justify-between overflow-hidden group hover:-translate-y-1 transition-transform"
            >
              {/* Image Frame */}
              <div 
                className="relative aspect-[21/9] bg-black border-b-4 border-black cursor-pointer overflow-hidden group"
                onClick={() => handleOpenImage(banner.url)}
              >
                <img
                  src={banner.url}
                  alt={banner.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Badge Overlay */}
                <div className="absolute top-2 left-2 bg-[#FFD700] text-black font-black text-[10px] px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000000] uppercase">
                  {banner.badge}
                </div>

                {/* View Overlay on Hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="bg-[#00C805] text-black border-2 border-black font-black text-xs px-3 py-1.5 shadow-[2px_2px_0px_0px_#ffffff] flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" /> VIEW FULLSCREEN
                  </span>
                </div>
              </div>

              {/* Text & Actions Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider mb-1 line-clamp-1">
                    {banner.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-bold leading-relaxed">
                    Official promotional graphic optimized for banners, social media cards, and community headers.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t-2 border-white/10">
                  <button
                    onClick={() => handleDownloadBanner(banner)}
                    disabled={downloadingId === banner.id}
                    className="bg-[#1a2e23] hover:bg-[#233d2f] disabled:opacity-50 text-white border-2 border-black font-black text-[11px] py-2 flex items-center justify-center gap-1.5 uppercase transition-all shadow-[2px_2px_0px_0px_#000000] active:translate-y-0.5"
                  >
                    {downloadingId === banner.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>{downloadingId === banner.id ? 'Exporting...' : 'Download'}</span>
                  </button>

                  <button
                    onClick={() => handleShare(index, banner.url)}
                    className="bg-[#00C805] hover:bg-[#00E506] text-black border-2 border-black font-black text-[11px] py-2 flex items-center justify-center gap-1.5 uppercase transition-all shadow-[2px_2px_0px_0px_#ffffff] active:translate-y-0.5"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 bg-[#FFD700] text-black border-3 border-black font-black text-xs p-2 shadow-[3px_3px_0px_0px_#000000] uppercase hover:bg-yellow-400"
              onClick={() => setSelectedImage(null)}
            >
              Close [X]
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-5xl w-full border-4 border-black bg-black shadow-[10px_10px_0px_0px_#00C805] p-2 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Fullscreen Preview"
                className="w-full object-contain max-h-[75vh]"
                referrerPolicy="no-referrer"
              />
              <div className="flex justify-between items-center mt-3 px-2 font-mono">
                <span className="text-xs text-gray-400 font-bold uppercase">Official high-fidelity community asset</span>
                <a
                  href={selectedImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('coin', muted)}
                  className="bg-[#00C805] text-black border-2 border-black font-black text-xs px-3 py-1 shadow-[2px_2px_0px_0px_#ffffff] flex items-center gap-1 hover:bg-[#00E506]"
                >
                  Open Original <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
