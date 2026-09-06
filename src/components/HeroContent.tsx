import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrambleText } from './ScrambleText';

const ROTATING_WORDS = ['PROPÓSITO', 'PERFORMANCE', 'ESCALA'];
const BIO_TEXT =
  'Sou o Ricardo — desenvolvedor Fullstack no ecossistema TypeScript, criando soluções escaláveis e robustas com foco em performance, arquitetura e resolução eficiente de problemas complexos.';

export const HeroContent: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [bioKey, setBioKey] = useState(0);

  // Rotate mammoth word every 4 seconds
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 4000);

    return () => clearInterval(wordTimer);
  }, []);

  // Remount and re-animate typewriter bio every 7 seconds
  useEffect(() => {
    const bioTimer = setInterval(() => {
      setBioKey((prev) => prev + 1);
    }, 7000);

    return () => clearInterval(bioTimer);
  }, []);

  const currentWord = ROTATING_WORDS[wordIndex];

  return (
    <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-4 text-center pointer-events-auto select-none mt-10 md:mt-0">
      {/* Top Tagline / Meta */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 md:mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
      >
        <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
        <span className="font-mono text-[10px] md:text-xs tracking-widest text-white/70 uppercase">
          Disponível para novos projetos // 2026
        </span>
      </motion.div>

      {/* Mammoth Headline */}
      <h1 className="flex flex-col items-center justify-center leading-none tracking-tight">
        {/* Top line: CONSTRUO COM */}
        <span className="font-['Anton'] uppercase text-[26px] sm:text-[45px] md:text-[60px] lg:text-[70px] stroke-headline tracking-widest select-none">
          CONSTRUO COM
        </span>

        {/* Bottom line: PURPOSE / IMPACT / INTENT (Scrambled & Neon #CCFF00) */}
        <span className="font-['Anton'] uppercase text-[52px] sm:text-[90px] md:text-[130px] lg:text-[170px] xl:text-[180px] text-[#CCFF00] tracking-tight leading-[0.88] drop-shadow-[0_0_40px_rgba(204,255,0,0.35)] select-none">
          <ScrambleText key={currentWord} targetText={currentWord} duration={700} />
        </span>
      </h1>

      {/* Typewriter Bio */}
      <div className="mt-5 md:mt-7 max-w-lg md:max-w-xl min-h-[4rem] sm:min-h-[3.5rem] flex items-center justify-center px-4">
        <p
          key={bioKey}
          className="font-sans text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light text-center"
        >
          {BIO_TEXT.split('').map((char, index) => (
            <motion.span
              key={`${bioKey}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: index * 0.02,
                duration: 0.05,
                ease: 'easeIn',
              }}
            >
              {char}
            </motion.span>
          ))}
        </p>
      </div>

      {/* Quick Interactive Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-4 md:mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] sm:text-xs text-white/40"
      >
        <span className="px-2.5 py-1 rounded border border-white/5 bg-black/40 backdrop-blur-sm">
          TYPESCRIPT & REACT
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="px-2.5 py-1 rounded border border-white/5 bg-black/40 backdrop-blur-sm">
          NODE.JS & GO
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="px-2.5 py-1 rounded border border-white/5 bg-black/40 backdrop-blur-sm">
          APIS ESCALÁVEIS
        </span>
      </motion.div>
    </div>
  );
};
