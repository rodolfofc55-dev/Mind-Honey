import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface HeaderProps {
  showOffer?: boolean;
  onToggleOffer?: () => void;
  viewerCount?: number;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="w-full">
      {/* Top Red Bar matching original #b42d1f */}
      <div className="bg-[#b42d1f] text-white py-3 px-4 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-center">
          <p className="text-center font-bold tracking-widest text-lg sm:text-xl uppercase">
            HEALTH
          </p>
        </div>
      </div>

      {/* Subtle reassurance sub-banner */}
      <div className="bg-[#fcf8f2] border-b border-[#fae5cb] py-1.5 px-3 text-xs text-[#8c672b] flex items-center justify-center gap-2 text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-[#b42d1f]" />
        <span>Official Mind Honey App Presentation • Verified Educational Broadcast</span>
      </div>
    </header>
  );
};
