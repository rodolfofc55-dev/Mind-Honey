import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Headline, WatchingCounter } from './components/Headline';
import { VslPlayer } from './components/VslPlayer';
import { PricingSection } from './components/PricingSection';
import { CommentsSection } from './components/CommentsSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModals';
import { NotificationToast } from './components/NotificationToast';
import { Sparkles, Eye, ArrowDown } from 'lucide-react';

export default function App() {
  // Offer pitch delay state (2660s in production VSL, toggleable for inspection)
  const [showOffer, setShowOffer] = useState<boolean>(() => {
    // Check if user previously reached pitch or unlocked it
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('alreadyElsDisplayed2660');
      if (stored === 'true') return true;
    }
    // Default to true for full sales page inspection, while providing realistic delay toggle
    return true;
  });

  // Dynamic viewer counter between 400 and 700 matching original atomicat-random
  const [viewerCount, setViewerCount] = useState<number>(595);

  // Legal modal state ('terms' | 'privacy' | null)
  const [activeLegalModal, setActiveLegalModal] = useState<'terms' | 'privacy' | null>(null);

  // Fluctuating viewer count simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const delta = Math.floor(Math.random() * 13) - 5; // -5 to +7
        const next = prev + delta;
        return Math.max(412, Math.min(688, next));
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleToggleOffer = () => {
    setShowOffer((prev) => {
      const next = !prev;
      if (next) {
        localStorage.setItem('alreadyElsDisplayed2660', 'true');
      } else {
        localStorage.removeItem('alreadyElsDisplayed2660');
      }
      return next;
    });
  };

  const handlePitchTrigger = () => {
    setShowOffer(true);
    localStorage.setItem('alreadyElsDisplayed2660', 'true');
    // Smooth scroll down to offer after brief delay
    setTimeout(() => {
      const target = document.getElementById('pricing-packages');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-['Poppins',sans-serif]">
      {/* Top Banner & Header */}
      <Header
        showOffer={showOffer}
        onToggleOffer={handleToggleOffer}
        viewerCount={viewerCount}
      />

      {/* Main Presentation Container */}
      <main className="flex-1 flex flex-col items-center w-full">
        {/* Main Headline */}
        <Headline viewerCount={viewerCount} />

        {/* Video Sales Letter (VSL) Player */}
        <section className="w-full px-4 flex flex-col items-center">
          <VslPlayer
            showOffer={showOffer}
            onPitchTrigger={handlePitchTrigger}
          />

          {/* Live Watching Counter */}
          <WatchingCounter count={viewerCount} />
        </section>

        {/* Delayed Offer Pitch / Protocol Packages */}
        {showOffer ? (
          <div className="w-full animate-in fade-in slide-in-from-top-4 duration-700">
            <PricingSection />
          </div>
        ) : (
          <div className="w-full max-w-xl mx-auto px-4 my-8 text-center bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-6">
            <p className="text-sm text-gray-600 mb-3">
              The <strong>Neurodyne Protocol</strong> packages are set to reveal during the presentation at the conclusion of the protocol breakdown (Pitch Time: 44m).
            </p>
            <button
              onClick={handlePitchTrigger}
              className="inline-flex items-center gap-2 bg-[#b42d1f] hover:bg-red-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reveal Special Discount Packages Now</span>
              <ArrowDown className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}

        {/* Social Proof Comments Section */}
        <div className="w-full">
          <CommentsSection />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenTerms={() => setActiveLegalModal('terms')}
        onOpenPrivacy={() => setActiveLegalModal('privacy')}
      />

      {/* Real-time Order Notification Popups */}
      <NotificationToast />

      {/* Terms and Privacy Modals */}
      <LegalModal
        isOpen={activeLegalModal !== null}
        type={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />
    </div>
  );
}
