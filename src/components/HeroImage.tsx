import React from 'react';

const HERO_SRC_WEBP = '/hero-me-3.webp';
const HERO_SRC_PNG = '/hero-me-3.png';

export const HeroImage: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-auto flex items-end justify-center select-none overflow-visible">
      <picture>
        <source srcSet={HERO_SRC_WEBP} type="image/webp" />
        <img
          src={HERO_SRC_PNG}
          alt="Ricardo"
          width={2752}
          height={1536}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-[85vh] sm:h-[95vh] md:h-[102vh] lg:h-[110vh] w-auto max-w-none object-contain object-bottom brightness-95 grayscale contrast-125 drop-shadow-[0_25px_50px_rgba(0,0,0,0.65)] transition-transform duration-700 ease-out hover:scale-[1.04] cursor-pointer"
        />
      </picture>
    </div>
  );
};
