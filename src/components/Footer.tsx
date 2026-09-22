import React from 'react';

interface FooterProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerms, onOpenPrivacy }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#9e1102] text-white py-8 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-2 text-xs sm:text-sm font-light">
        <p className="font-normal">
          Copyright <span>{currentYear}</span> - Neurodyne Protocol ®
        </p>
        <p className="opacity-90">All rights reserved</p>
        <div className="pt-1 pb-1">
          <button
            onClick={onOpenTerms}
            className="hover:underline opacity-95 transition cursor-pointer font-medium"
          >
            Terms of use
          </button>
          <span className="mx-2 opacity-60">·</span>
          <button
            onClick={onOpenPrivacy}
            className="hover:underline opacity-95 transition cursor-pointer font-medium"
          >
            Privacy
          </button>
        </div>
        <p className="text-[11px] opacity-75">All Rights Reserved</p>

        {/* FDA / Medical Disclaimer standard for high-compliance VSLs */}
        <div className="pt-4 border-t border-white/20 text-[10px] sm:text-[11px] opacity-70 max-w-2xl mx-auto leading-relaxed">
          Statements made on this website have not been evaluated by the Food and Drug Administration. The information provided is not intended to diagnose, treat, cure, or prevent any disease. Results may vary from person to person. Always consult your physician before starting any new health or dietary protocol.
        </div>
      </div>
    </footer>
  );
};
