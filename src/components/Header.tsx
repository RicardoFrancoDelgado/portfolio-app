import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 w-full px-6 py-5 md:px-12 md:py-6 flex items-center justify-between pointer-events-auto select-none">
      {/* Brand / Logo */}
      <Link
        to="/sobre"
        className="group flex items-center gap-3.5 cursor-pointer"
        aria-label="Portfólio de Ricardo — Início / Sobre"
      >
        <span className="font-['Anton'] text-2xl md:text-3xl tracking-widest uppercase text-white transition-colors duration-300 group-hover:text-[#CCFF00]">
          RICARDO
        </span>
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#CCFF00] text-black flex items-center justify-center font-bold text-base md:text-lg shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-transform duration-500 ease-out group-hover:rotate-180">
          ✦
        </div>
      </Link>

      {/* Nav Links (Desktop) */}
      <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase text-white/60" aria-label="Main Navigation">
        <Link
          to="/projetos"
          className="hover:text-[#CCFF00] transition-colors py-1 relative group cursor-pointer"
        >
          <span>PROJETOS</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#CCFF00] transition-all duration-300 group-hover:w-full" />
        </Link>
        <Link
          to="/sobre"
          className="hover:text-[#CCFF00] transition-colors py-1 relative group cursor-pointer"
        >
          <span>SOBRE</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#CCFF00] transition-all duration-300 group-hover:w-full" />
        </Link>
        <Link
          to="/stack"
          className="hover:text-[#CCFF00] transition-colors py-1 relative group cursor-pointer"
        >
          <span>STACK</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#CCFF00] transition-all duration-300 group-hover:w-full" />
        </Link>
        <Link
          to="/curriculo"
          className="hover:text-[#CCFF00] transition-colors py-1 relative group cursor-pointer"
        >
          <span>CURRÍCULO</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#CCFF00] transition-all duration-300 group-hover:w-full" />
        </Link>
      </nav>

      {/* Action CTA Button */}
      <Link
        id="commission-button"
        to="/contato"
        className="font-mono text-xs uppercase tracking-widest px-5 py-2.5 md:px-6 md:py-2.5 rounded-full border border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-all duration-300 font-semibold shadow-[0_0_15px_rgba(204,255,0,0.2)] hover:shadow-[0_0_25px_rgba(204,255,0,0.6)] active:scale-95 cursor-pointer"
      >
        CONTATO
      </Link>
    </header>
  );
};
