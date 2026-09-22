import React, { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface PurchaseNotification {
  name: string;
  location: string;
  tier: string;
  timeAgo: string;
}

const NOTIFICATIONS: PurchaseNotification[] = [
  { name: 'Arthur K.', location: 'Cleveland, OH', tier: '6-Month Protocol', timeAgo: '2 minutes ago' },
  { name: 'Brenda M.', location: 'Tampa, FL', tier: '3-Month Protocol', timeAgo: '4 minutes ago' },
  { name: 'Robert S.', location: 'Phoenix, AZ', tier: '6-Month Protocol', timeAgo: '1 minute ago' },
  { name: 'Eleanor W.', location: 'Denver, CO', tier: '6-Month Protocol', timeAgo: '5 minutes ago' },
  { name: 'James D.', location: 'Atlanta, GA', tier: '1-Month Protocol', timeAgo: '8 minutes ago' },
];

export const NotificationToast: React.FC = () => {
  const [current, setCurrent] = useState<PurchaseNotification | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (dismissed) return;

    let index = 0;
    const interval = setInterval(() => {
      setCurrent(NOTIFICATIONS[index % NOTIFICATIONS.length]);
      setIsVisible(true);

      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      index++;
      return () => clearTimeout(hideTimer);
    }, 18000);

    // Initial trigger after 6 seconds
    const firstTimer = setTimeout(() => {
      setCurrent(NOTIFICATIONS[0]);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(firstTimer);
    };
  }, [dismissed]);

  if (!current || !isVisible || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-xs sm:max-w-sm bg-white border border-gray-200 rounded-2xl p-3 shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-[#00bf63]">
        <CheckCircle2 className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-gray-800 truncate">
          {current.name} in {current.location}
        </p>
        <p className="text-[11px] text-gray-600 truncate">
          Verified order: <span className="font-semibold text-[#b42d1f]">{current.tier}</span>
        </p>
        <span className="text-[10px] text-gray-400">{current.timeAgo}</span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
        title="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
