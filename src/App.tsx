import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Tokenomics } from './components/Tokenomics';
import { DexscreenerChart } from './components/DexscreenerChart';
import { HowToBuy } from './components/HowToBuy';
import { MemeHub } from './components/MemeHub';
import { PromoGallery } from './components/PromoGallery';
import { Footer } from './components/Footer';

export default function App() {
  const [muted, setMuted] = useState(false);

  const handleNavigate = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-white font-sans selection:bg-[#00C805] selection:text-black">
      {/* Sticky Top Navbar */}
      <Navbar 
        muted={muted} 
        setMuted={setMuted} 
        onNavigate={handleNavigate} 
      />

      {/* Hero Section with Parallax Scrolling */}
      <Hero 
        muted={muted} 
        onNavigate={handleNavigate} 
      />

      {/* Tokenomics Section */}
      <Tokenomics 
        muted={muted} 
      />

      {/* Dexscreener Chart Section */}
      <DexscreenerChart 
        muted={muted} 
        onOpenBuy={() => handleNavigate('how-to-buy')} 
      />

      {/* How to Buy Section with Robinhood Swap Simulator */}
      <HowToBuy 
        muted={muted} 
      />

      {/* Community Meme Hub & Soundboard */}
      <MemeHub 
        muted={muted} 
      />

      {/* Official Promo Graphics Gallery */}
      <PromoGallery 
        muted={muted} 
      />

      {/* Footer */}
      <Footer 
        muted={muted} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
}
