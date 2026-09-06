import React from 'react';
import { Head } from 'vite-react-ssg';
import type { DrawerSection } from './InfoDrawer';

const SITE_URL = 'https://__SITE_URL__';
const SITE_NAME = 'Ricardo Franco Delgado';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SectionMeta {
  path: string;
  title: string;
  description: string;
}

const SECTION_META: Record<DrawerSection, SectionMeta> = {
  MENU: {
    path: '/',
    title: 'RICARDO // Desenvolvedor Fullstack',
    description:
      'Portfólio de Ricardo — desenvolvedor Fullstack no ecossistema TypeScript, criando soluções web escaláveis e robustas com foco em performance, arquitetura e boas práticas de engenharia.',
  },
  PROJETOS: {
    path: '/projetos',
    title: 'Projetos — Ricardo Franco Delgado // Desenvolvedor Fullstack',
    description:
      'Sete projetos selecionados de Ricardo Franco Delgado: desafios de curso, projetos pessoais e em grupo com React, Go, Java/Spring Boot e Next.js.',
  },
  STACK: {
    path: '/stack',
    title: 'Stack Técnica — Ricardo Franco Delgado // Desenvolvedor Fullstack',
    description:
      'Tecnologias e ferramentas usadas por Ricardo Franco Delgado: Frontend (React, Next.js, TypeScript), Backend (Node.js, Go, Python, Java), testes, arquitetura e IA aplicada.',
  },
  SOBRE: {
    path: '/sobre',
    title: 'Sobre — Ricardo Franco Delgado // Desenvolvedor Fullstack',
    description:
      'Conheça a trajetória de Ricardo Franco Delgado, desenvolvedor Fullstack no ecossistema TypeScript, da instrução em cursos livres ao desenvolvimento de soluções internas na Infore.',
  },
  'CURRÍCULO': {
    path: '/curriculo',
    title: 'Currículo — Ricardo Franco Delgado // Desenvolvedor Fullstack',
    description:
      'Linha do tempo profissional e acadêmica de Ricardo Franco Delgado, com currículo completo em PDF para download.',
  },
  CONTATO: {
    path: '/contato',
    title: 'Contato — Ricardo Franco Delgado // Desenvolvedor Fullstack',
    description:
      'Fale com Ricardo Franco Delgado pelo LinkedIn, GitHub ou email para propostas de trabalho e oportunidades.',
  },
};

interface SEOProps {
  section: DrawerSection;
}

export const SEO: React.FC<SEOProps> = ({ section }) => {
  const meta = SECTION_META[section];
  const url = `${SITE_URL}${meta.path}`;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Head>
  );
};
