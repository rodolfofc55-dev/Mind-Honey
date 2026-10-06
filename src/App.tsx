import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Headline, WatchingCounter } from './components/Headline';
import { VslPlayer } from './components/VslPlayer';
import { PricingSection } from './components/PricingSection';
import { CommentsSection } from './components/CommentsSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModals';
import { NotificationToast } from './components/NotificationToast';

export default function App() {
  // Offer pitch delay: 42 minutes and 55 seconds (2575 seconds)
  // Hidden by default until the video reaches 42:55 or if already viewed in a previous session
  const [showOffer, setShowOffer] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('alreadyElsDisplayed2575');
      if (stored === 'true') return true;

      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('pitch') === 'true' || urlParams.get('offer') === 'true' || window.location.hash === '#offer' || window.location.hash === '#pitch') {
        return true;
      }
    }
    return false;
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

  const handlePitchTrigger = () => {
    setShowOffer(true);
    localStorage.setItem('alreadyElsDisplayed2575', 'true');
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
      <Header />

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

        {/* Delayed Offer Pitch / Protocol Packages - Completely hidden until 42:55 */}
        {showOffer && (
          <div className="w-full animate-in fade-in slide-in-from-top-4 duration-700">
            <PricingSection />
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

      {/* Real-time Order Notification Popups (only active after pitch) */}
      <NotificationToast showOffer={showOffer} />

      {/* Legal Modals */}
      <LegalModal
        isOpen={activeLegalModal !== null}
        type={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />
    </div>
  );
}
