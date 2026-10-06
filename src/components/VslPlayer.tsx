import React, { useEffect, useRef } from 'react';
import { Volume2 } from 'lucide-react';

interface VslPlayerProps {
  onTimeUpdate?: (seconds: number) => void;
  onPitchTrigger?: () => void;
  showOffer: boolean;
}

export const VslPlayer: React.FC<VslPlayerProps> = ({ onTimeUpdate, onPitchTrigger }) => {
  const hasTriggeredOfferRef = useRef<boolean>(false);

  useEffect(() => {
    // Inject official ConverteAI / Vturb player script for video 6aba952d8762e3838f9319d6
    const scriptId = 'converteai-player-6aba952d8762e3838f9319d6';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.src = 'https://scripts.converteai.net/b4a05993-6bfc-4f94-b60c-a2dd36d8e4d0/players/6aba952d8762e3838f9319d6/v4/player.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // 42 minutes and 55 seconds = (42 * 60) + 55 = 2575 seconds
    const pitchSeconds = 2575;

    const checkTime = (time: number) => {
      if (onTimeUpdate) onTimeUpdate(Math.floor(time));
      if (time >= pitchSeconds && !hasTriggeredOfferRef.current) {
        hasTriggeredOfferRef.current = true;
        if (onPitchTrigger) onPitchTrigger();
      }
    };

    // 1. Listen for player:ready event dispatched by Vturb smartplayer
    const onPlayerReady = (e: any) => {
      try {
        const player = e?.detail?.player;
        if (player) {
          player.addEventListener?.('timeupdate', (ev: any) => {
            const t = ev?.detail?.time ?? ev?.time;
            if (typeof t === 'number') checkTime(t);
          });
        }
      } catch {
        // ignore
      }
    };
    document.addEventListener('player:ready', onPlayerReady);

    // 2. Poll window.smartplayer instances & HTML5 video element
    const interval = setInterval(() => {
      try {
        const sp = (window as unknown as { smartplayer?: { instances?: Array<{ video?: { currentTime?: number }; on?: (evt: string, cb: (t: number) => void) => void }> } }).smartplayer;
        if (sp?.instances && sp.instances.length > 0) {
          const inst = sp.instances[0];
          const current = inst?.video?.currentTime || 0;
          if (current > 0) {
            checkTime(current);
          }
        }

        // Direct video tag check if present in DOM
        const videoElement = document.querySelector('vturb-smartplayer video') as HTMLVideoElement | null;
        if (videoElement && videoElement.currentTime > 0) {
          checkTime(videoElement.currentTime);
        }
      } catch {
        // Ignore access errors
      }
    }, 1000);

    return () => {
      document.removeEventListener('player:ready', onPlayerReady);
      clearInterval(interval);
    };
  }, [onPitchTrigger, onTimeUpdate]);

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      {/* Vturb Container with authentic Smartplayer embed */}
      <div className="relative w-full max-w-[400px] rounded-2xl overflow-hidden shadow-2xl bg-black border border-gray-800">
        <div
          dangerouslySetInnerHTML={{
            __html: `<vturb-smartplayer id="vid-6aba952d8762e3838f9319d6" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 177.3399014778325% 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer>`,
          }}
        />
      </div>

      {/* Audio notice */}
      <div className="w-full max-w-[400px] flex items-center justify-center text-xs text-gray-500 mt-2 px-1">
        <div className="flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-gray-400" />
          <span>Sound is required for best experience</span>
        </div>
      </div>
    </div>
  );
};
