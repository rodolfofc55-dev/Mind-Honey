import React from 'react';

interface HeadlineProps {
  viewerCount: number;
}

export const Headline: React.FC<HeadlineProps> = ({ viewerCount }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-6 pb-2 text-center sm:text-left">
      <h1 className="text-2xl sm:text-4xl lg:text-[36px] font-bold text-[#1f2937] leading-snug sm:leading-[48px] tracking-tight">
        Neurologists: The <strong className="font-extrabold text-[#111827]">“Blueberry Shield”</strong> Brain Trick May Restore Memory After Age 60
      </h1>
    </div>
  );
};

export const WatchingCounter: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className="w-full text-center py-3 flex items-center justify-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
      </span>
      <p className="text-sm sm:text-base text-gray-700 font-medium tracking-wide">
        <span className="font-bold text-[#b42d1f] transition-all duration-300">
          {count}
        </span>{' '}
        are watching now
      </p>
    </div>
  );
};
