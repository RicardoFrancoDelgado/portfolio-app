import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import { ParticleBackground } from './components/ParticleBackground';
import { Header } from './components/Header';
import { HeroContent } from './components/HeroContent';
import { HeroImage } from './components/HeroImage';
import { FooterMarquee } from './components/FooterMarquee';
import { InfoDrawer, type DrawerSection } from './components/InfoDrawer';
import { SEO } from './components/SEO';

const SECTION_TO_PATH: Record<DrawerSection, string> = {
  MENU: '/',
  PROJETOS: '/projetos',
  STACK: '/stack',
  SOBRE: '/sobre',
  'CURRÍCULO': '/curriculo',
  CONTATO: '/contato',
};

const PATH_SECTION_PARAM: Record<string, DrawerSection> = {
  projetos: 'PROJETOS',
  stack: 'STACK',
  sobre: 'SOBRE',
  curriculo: 'CURRÍCULO',
  contato: 'CONTATO',
};

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ section?: string }>();

  const drawerSection: DrawerSection = params.section
    ? PATH_SECTION_PARAM[params.section] ?? 'MENU'
    : 'MENU';
  const drawerOpen = drawerSection !== 'MENU';

  const handleOpenDrawer = (section?: string) => {
    const target = (section as DrawerSection) ?? 'MENU';
    navigate(SECTION_TO_PATH[target] ?? '/');
  };

  const handleCloseDrawer = () => {
    navigate('/');
  };

  // Keyboard shortcut listener ('C' or 'M' to open drawer)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.key === 'c' || e.key === 'C') {
        handleOpenDrawer('CONTATO');
      } else if (e.key === 'm' || e.key === 'M') {
        handleOpenDrawer('MENU');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-screen min-h-screen overflow-hidden flex flex-col bg-[#000000] text-white select-none">
      <SEO section={drawerSection} />

      {/* Layer 0 (z-0): Three.js Particle WebGL Canvas */}
      <ParticleBackground />

      {/* Layer 10 (z-10): Cut-out Hero Subject at Bottom */}
      <HeroImage />

      {/* Layer 20 (z-20): Centered Mammoth Typography & Bio */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center w-full h-full pointer-events-none">
        <HeroContent />
      </main>

      {/* Layer 30 (z-30): Header (Sticky Top Overlay) */}
      <Header />

      {/* Layer 30 (z-30): Footer Marquee (Bottom Edge Stroke Text) */}
      <FooterMarquee />

      {/* Layer 50 (z-50): InfoDrawer Side Panel */}
      <InfoDrawer
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        currentSection={drawerSection}
        onNavigateSection={(section) => handleOpenDrawer(section)}
      />
    </div>
  );
};

export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: Layout,
  },
  {
    path: '/:section',
    Component: Layout,
    getStaticPaths: () => Object.keys(PATH_SECTION_PARAM),
  },
];

export default Layout;
