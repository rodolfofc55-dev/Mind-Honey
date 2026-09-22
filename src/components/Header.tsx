import React from 'react';
import { Eye, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  showOffer: boolean;
  onToggleOffer: () => void;
  viewerCount: number;
}

export const Header: React.FC<HeaderProps> = ({ showOffer, onToggleOffer, viewerCount }) => {
  return (
    <header className="w-full">
      {/* Top Red Bar matching original #b42d1f */}
      <div className="bg-[#b42d1f] text-white py-3 px-4 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="w-24 hidden sm:block">
            {/* Balance spacer */}
          </div>
          <p className="text-center font-bold tracking-widest text-lg sm:text-xl uppercase flex-1">
            HEALTH
          </p>
          <div className="flex items-center gap-2">
            {/* Preview Toggle for Offer Pitch */}
            <button
              onClick={onToggleOffer}
              title="Toggle offer pitch visibility (Normally delayed 44 min in VSL)"
              className="text-xs bg-white/20 hover:bg-white/30 text-white font-medium px-2.5 py-1 rounded-full transition flex items-center gap-1.5 cursor-pointer backdrop-blur-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Offer:</span>
              <span className={showOffer ? "font-bold text-green-200" : "text-white/80"}>
                {showOffer ? "Revealed" : "Pitch Delayed"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle reassurance sub-banner */}
      <div className="bg-[#fcf8f2] border-b border-[#fae5cb] py-1.5 px-3 text-xs text-[#8c672b] flex items-center justify-center gap-2 text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-[#b42d1f]" />
        <span>Official Neurodyne Protocol Presentation • Verified Educational Broadcast</span>
      </div>
    </header>
  );
};
