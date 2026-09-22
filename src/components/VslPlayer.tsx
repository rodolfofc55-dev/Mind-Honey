import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, FastForward, RotateCcw } from 'lucide-react';

interface VslPlayerProps {
  onTimeUpdate?: (seconds: number) => void;
  onPitchTrigger?: () => void;
  showOffer: boolean;
}

export const VslPlayer: React.FC<VslPlayerProps> = ({ onTimeUpdate, onPitchTrigger, showOffer }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [showUnmuteBanner, setShowUnmuteBanner] = useState<boolean>(true);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Total duration modeled on the original Vturb config (approx 49 min / 2986s)
  const totalDuration = 2986;
  const pitchSeconds = 2659; // 44m19s from original vturb script config

  // Inject official ConverteAI / Vturb player script
  useEffect(() => {
    const scriptId = 'converteai-player-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://scripts.converteai.net/b4a05993-6bfc-4f94-b60c-a2dd36d8e4d0/players/6a74f27159dec877329a5caf/v4/player.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Timer interval for playback simulation & progress
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          if (onTimeUpdate) onTimeUpdate(next);
          if (next >= pitchSeconds && onPitchTrigger) {
            onPitchTrigger();
          }
          if (next >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, onPitchTrigger, onTimeUpdate]);

  const togglePlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setShowUnmuteBanner(true);
    }
    setIsPlaying(!isPlaying);
  };

  const handleUnmute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(false);
    setShowUnmuteBanner(false);
    if (!isPlaying) {
      setIsPlaying(true);
      setHasStarted(true);
    }
  };

  const skipToPitch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTime(pitchSeconds);
    if (onPitchTrigger) onPitchTrigger();
  };

  const restartVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const progressPercentage = (currentTime / totalDuration) * 100;

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      {/* Vturb Container Wrapper with standard 9:16 mobile-first vertical ratio */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-[400px] rounded-2xl overflow-hidden shadow-2xl bg-black border border-gray-800 select-none group"
        style={{ aspectRatio: '9/16' }}
      >
        {/* Official Vturb Smartplayer DOM node */}
        <div className="absolute inset-0 pointer-events-none opacity-0 z-0">
          <div id="vid-6a74f27159dec877329a5caf" style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}>
            <div className="vturb-player-placeholder" style={{ position: 'relative', width: '100%', padding: '178.05555555555554% 0 0', zIndex: 0, backgroundColor: '#000' }} />
          </div>
        </div>

        {/* Video Display & Cover Artwork */}
        <div 
          onClick={togglePlay}
          className="relative w-full h-full cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          {/* Authentic High-Res Video Poster from ConverteAI CDN */}
          <img
            src="https://images.converteai.net/b4a05993-6bfc-4f94-b60c-a2dd36d8e4d0/players/6a74f27159dec877329a5caf/cover.jpg"
            alt="Neurodyne Protocol Video Presentation"
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
            onError={(e) => {
              // Fallback to secondary poster if network issues
              (e.currentTarget as HTMLImageElement).src = "https://cdn.converteai.net/b4a05993-6bfc-4f94-b60c-a2dd36d8e4d0/6a74f1d0757db63207ad7e60/poster.jpg";
            }}
          />

          {/* Vignette Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />

          {/* Top Info Bar */}
          <div className="relative z-10 p-4 flex items-center justify-between text-white text-xs">
            <span className="bg-red-600/90 font-bold px-2 py-0.5 rounded tracking-wide text-[10px] uppercase shadow">
              LIVE BROADCAST
            </span>
            <span className="font-mono text-white/90 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </span>
          </div>

          {/* Unmute / Sound Request Banner (Vturb Smart Autoplay Style) */}
          {showUnmuteBanner && (
            <div 
              onClick={handleUnmute}
              className="relative z-20 mx-4 my-auto bg-black/85 border border-red-500/80 rounded-xl p-4 text-center text-white backdrop-blur-md shadow-2xl cursor-pointer hover:bg-black/95 transition transform hover:scale-102"
            >
              <div className="flex justify-center mb-2">
                <span className="p-3 bg-red-600 rounded-full animate-bounce">
                  <VolumeX className="w-6 h-6 text-white" />
                </span>
              </div>
              <p className="font-bold text-sm sm:text-base leading-tight mb-1">
                Your video is playing muted
              </p>
              <p className="text-xs text-red-300 font-medium uppercase tracking-wider flex items-center justify-center gap-1">
                <Volume2 className="w-3.5 h-3.5" /> Tap to Unmute & Listen
              </p>
            </div>
          )}

          {/* Center Play Button Overlay (when paused) */}
          {!isPlaying && !showUnmuteBanner && (
            <div className="relative z-10 m-auto flex flex-col items-center">
              <button 
                onClick={togglePlay}
                className="w-18 h-18 sm:w-20 sm:h-20 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.7)] transition transform hover:scale-110 active:scale-95 cursor-pointer"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white" />
              </button>
              <span className="mt-3 text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow">
                Click to Resume Presentation
              </span>
            </div>
          )}

          {/* Bottom Custom Controls & Fake Progress Bar (#c20d0d) */}
          <div className="relative z-10 p-3 flex flex-col gap-2">
            {/* Fake Progress Bar matching Vturb fakeBar config (#c20d0d) */}
            <div className="w-full bg-white/20 h-2 sm:h-2.5 rounded-full overflow-hidden backdrop-blur-xs relative cursor-pointer">
              <div 
                className="bg-[#c20d0d] h-full transition-all duration-300 relative"
                style={{ width: `${Math.max(3, progressPercentage)}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/60 animate-pulse" />
              </div>
            </div>

            {/* Interactive Player Controls */}
            <div className="flex items-center justify-between text-white text-xs pt-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="hover:text-red-400 transition cursor-pointer p-1"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="hover:text-red-400 transition cursor-pointer p-1"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Fast Forward / Pitch Skip shortcut for fast inspection */}
              <div className="flex items-center gap-2">
                <button
                  onClick={skipToPitch}
                  title="Jump to offer reveal (at 44:19)"
                  className="flex items-center gap-1 text-[11px] bg-red-600/80 hover:bg-red-600 text-white px-2 py-0.5 rounded cursor-pointer transition shadow"
                >
                  <FastForward className="w-3 h-3" />
                  <span>Offer Point</span>
                </button>

                <button
                  onClick={restartVideo}
                  title="Restart video"
                  className="hover:text-red-400 transition cursor-pointer p-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio reminder notice below video */}
      <div className="text-center mt-3 text-xs text-gray-500 flex items-center justify-center gap-1.5">
        <Volume2 className="w-3.5 h-3.5 text-gray-400" />
        <span>Make sure your sound is turned on for the best experience.</span>
      </div>
    </div>
  );
};
