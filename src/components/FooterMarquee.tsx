import React from 'react';

const MARQUEE_TEXT = 'RICARDO DELGADO // FULLSTACK DEVELOPER // RICARDO DELGADO // FULLSTACK DEVELOPER // ';

export const FooterMarquee: React.FC = () => {
  return (
    <footer
      className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none overflow-hidden select-none pb-1 md:pb-2"
      aria-hidden="true"
    >
      <div className="animate-marquee flex items-baseline">
        <span className="font-['Anton'] uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider leading-none whitespace-nowrap stroke-marquee opacity-35 mr-4">
          {MARQUEE_TEXT}
        </span>
        <span className="font-['Anton'] uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider leading-none whitespace-nowrap stroke-marquee opacity-35 mr-4">
          {MARQUEE_TEXT}
        </span>
      </div>
    </footer>
  );
};
