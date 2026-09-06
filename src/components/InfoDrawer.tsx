import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ExternalLink, Download, Link2, FolderGit2, Mail, Copy, Check } from 'lucide-react';

export type DrawerSection = 'MENU' | 'PROJETOS' | 'STACK' | 'SOBRE' | 'CURRÍCULO' | 'CONTATO';

interface InfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentSection: DrawerSection;
  onNavigateSection: (section: DrawerSection) => void;
}

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  deployUrl: string;
  githubUrl: string;
  hasLiveDemo: boolean;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'connect',
    number: '01',
    title: 'PROJETO CONNECT',
    category: 'DESAFIO DE CURSO',
    description: 'Plataforma para cadastro de empresas com projetos sociais e treinamentos organizados para ações sociais.',
    tags: ['React', 'SCSS', 'react-router-dom', 'HTML'],
    deployUrl: 'https://connect-pi-umber.vercel.app/',
    githubUrl: 'https://github.com/RicardoFrancoDelgado/desafio-connect-vnw',
    hasLiveDemo: true,
  },
  {
    id: 'viva-bem',
    number: '02',
    title: 'PROJETO VIVA BEM',
    category: 'DESAFIO DE CURSO',
    description: 'Site para orientar sobre cuidados com a saúde, com foco em boas práticas de bem-estar.',
    tags: ['HTML', 'CSS', 'SCSS'],
    deployUrl: 'https://viva-bem-desafio-qq1nmnxca-ricardofrancodelgados-projects.vercel.app/',
    githubUrl: 'https://github.com/RicardoFrancoDelgado/viva-bem-desafio',
    hasLiveDemo: true,
  },
  {
    id: 'acao-verde',
    number: '03',
    title: 'PROJETO AÇÃO VERDE',
    category: 'PROJETO PESSOAL',
    description: 'Página de apresentação de um projeto ambiental que convida pessoas a se tornarem voluntárias em ações de cuidado com o planeta, inspirando mudanças reais através de pequenas atitudes ecológicas.',
    tags: ['HTML', 'CSS', 'SCSS'],
    deployUrl: 'https://ricardofrancodelgado.github.io/projeto-acao-verde/',
    githubUrl: 'https://github.com/RicardoFrancoDelgado/projeto-acao-verde',
    hasLiveDemo: true,
  },
  {
    id: 'devbook',
    number: '04',
    title: 'DEVBOOK API',
    category: 'PROJETO EM GRUPO',
    description: 'API desenvolvida em conjunto durante um curso de fundamentos da linguagem Go, com uso de MySQL, autenticação via JWT e boas práticas de back-end.',
    tags: ['Go (Golang)', 'MySQL', 'JWT'],
    deployUrl: 'https://github.com/RicardoFrancoDelgado/devbook-project',
    githubUrl: 'https://github.com/RicardoFrancoDelgado/devbook-project',
    hasLiveDemo: false,
  },
  {
    id: 'vnw-router',
    number: '05',
    title: 'DESAFIO VNW — REACT ROUTER DOM',
    category: 'DESAFIO DE CURSO',
    description: 'Desafio proposto nas aulas da Vai na Web, utilizando React, JSX, SCSS e React Router DOM.',
    tags: ['React', 'SCSS', 'react-router-dom'],
    deployUrl: 'https://react-router-desafio-vnw.vercel.app/',
    githubUrl: 'https://github.com/RicardoFrancoDelgado/react-router-desafio-vnw',
    hasLiveDemo: true,
  },
  {
    id: 'medication',
    number: '06',
    title: 'MEDICATION REMINDER',
    category: 'PROJETO PESSOAL',
    description: 'Aplicação que avisa quando um remédio cadastrado precisa ser tomado, com cadastro de novos remédios e envio de lembretes via WhatsApp.',
    tags: ['Java', 'Spring Boot', 'Twilio API', 'PostgreSQL'],
    deployUrl: 'https://github.com/RicardoFrancoDelgado/medication-reminder',
    githubUrl: 'https://github.com/RicardoFrancoDelgado/medication-reminder',
    hasLiveDemo: false,
  },
  {
    id: 'l2-places',
    number: '07',
    title: 'L2 PLACES OPTIONS',
    category: 'PROJETO PESSOAL',
    description: 'Site para divulgação de uma consultoria de marketplace, desenvolvido com Next.js e TypeScript, do zero ao deploy em produção.',
    tags: ['Next.js', 'TypeScript'],
    deployUrl: 'https://l2placesoptions.vercel.app/',
    githubUrl: 'https://github.com/RicardoFrancoDelgado',
    hasLiveDemo: true,
  },
];

const STACK_DATA = [
  {
    category: 'FRONTEND',
    title: 'REACT, NEXT.JS & TYPESCRIPT',
    summary: 'Interfaces reativas e performáticas com foco em UX consistente, usando React, Next.js e TypeScript.',
    tagline: 'UI • SSR • TIPAGEM FORTE',
  },
  {
    category: 'BACKEND',
    title: 'NODE.JS, GO, PYTHON & JAVA',
    summary: 'APIs REST robustas e serviços de back-end em Node.js, Go, Python (Flask) e Java, com bancos relacionais como MySQL e PostgreSQL.',
    tagline: 'APIS • BANCOS DE DADOS • AUTENTICAÇÃO',
  },
  {
    category: 'QUALIDADE',
    title: 'TESTES & ARQUITETURA',
    summary: 'Testes automatizados, integração contínua e arquiteturas serverless para software confiável e fácil de manter.',
    tagline: 'CI/CD • SERVERLESS • BOAS PRÁTICAS',
  },
  {
    category: 'IA APLICADA',
    title: 'CLAUDE CODE, CODEX & GEMINI',
    summary: 'Ferramentas de IA integradas ao fluxo de desenvolvimento para geração e revisão de código e documentação, acelerando entregas sem abrir mão da qualidade.',
    tagline: 'VELOCIDADE • QUALIDADE • ESCALA',
  },
];

export const InfoDrawer: React.FC<InfoDrawerProps> = ({
  isOpen,
  onClose,
  currentSection,
  onNavigateSection,
}) => {
  const [emailCopied, setEmailCopied] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const CONTACT_EMAIL = 'ricardodelgado693@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  const CONTACT_LINKS = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      description: 'Conecte-se comigo profissionalmente',
      icon: Link2,
      href: 'https://www.linkedin.com/in/ricardofrancodelgado-dev/',
    },
    {
      id: 'github',
      label: 'GitHub',
      description: 'Veja meus projetos e contribuições',
      icon: FolderGit2,
      href: 'https://github.com/RicardoFrancoDelgado',
    },
  ];

  const navMenuItems: { name: DrawerSection; desc: string; count?: string }[] = [
    { name: 'PROJETOS', desc: 'PROJETOS SELECIONADOS', count: '07' },
    { name: 'STACK', desc: 'TECNOLOGIAS & FERRAMENTAS', count: '04' },
    { name: 'SOBRE', desc: 'TRAJETÓRIA, HABILIDADES & STACK' },
    { name: 'CURRÍCULO', desc: 'LINHA DO TEMPO & CV' },
    { name: 'CONTATO', desc: 'FALE COMIGO' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer Slide-in Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="relative z-10 w-full sm:max-w-xl md:max-w-2xl h-full bg-[#333333] border-l border-white/10 text-white flex flex-col shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Painel de Navegação e Informações"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 w-full px-6 py-4 md:px-8 md:py-5 bg-[#333333]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
              {currentSection !== 'MENU' ? (
                <button
                  onClick={() => onNavigateSection('MENU')}
                  className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/70 hover:text-[#CCFF00] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>VOLTAR // MENU</span>
                </button>
              ) : (
                <div className="font-mono text-xs uppercase tracking-widest text-white/50 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                  <span>ÍNDICE // NAVEGAÇÃO</span>
                </div>
              )}

              <button
                onClick={onClose}
                aria-label="Fechar painel"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#CCFF00] text-white hover:text-black flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Drawer Content */}
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10 custom-scrollbar">
              {/* ==================================================== */}
              {/* 1. MAIN MENU OVERVIEW */}
              {/* ==================================================== */}
              {currentSection === 'MENU' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  <p className="font-mono text-xs tracking-widest text-white/40 uppercase mb-8">
                    ESCOLHA UM DESTINO
                  </p>

                  <nav className="divide-y divide-white/10">
                    {navMenuItems.map((item) => {
                      const isWork = item.name === 'CONTATO';
                      return (
                        <button
                          key={item.name}
                          onClick={() => onNavigateSection(item.name)}
                          className={`w-full text-left py-6 group flex items-baseline justify-between transition-all cursor-pointer ${
                            isWork ? 'hover:text-[#CCFF00]' : 'hover:text-[#CCFF00]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`font-['Anton'] uppercase text-3xl md:text-5xl tracking-wide transition-transform duration-300 group-hover:translate-x-2 ${
                                  isWork ? 'text-[#CCFF00]' : 'text-white group-hover:text-[#CCFF00]'
                                }`}
                              >
                                {item.name}
                              </span>
                              {item.count && (
                                <span className="font-mono text-xs text-white/40 group-hover:text-[#CCFF00]">
                                  [{item.count}]
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-[11px] uppercase tracking-widest text-white/40 mt-1 block">
                              {item.desc}
                            </span>
                          </div>

                          <span className="font-mono text-lg text-white/20 group-hover:text-[#CCFF00] group-hover:translate-x-1 transition-all">
                            →
                          </span>
                        </button>
                      );
                    })}
                  </nav>

                  {/* Drawer Footer Info */}
                  <div className="pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-white/40">
                    <div>
                      <span>STATUS: </span>
                      <span className="text-[#CCFF00]">ONLINE // ABERTO A OPORTUNIDADES</span>
                    </div>
                    <div>
                      <span>LOCALIZAÇÃO: REMOTO</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==================================================== */}
              {/* 2. CONTACT LINKTREE ("CONTATO") */}
              {/* ==================================================== */}
              {currentSection === 'CONTATO' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="mb-8">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] block mb-2">
                      CONTATO & OPORTUNIDADES
                    </span>
                    <h2 className="font-['Anton'] uppercase text-4xl md:text-5xl text-white tracking-wide">
                      VAMOS CONVERSAR?
                    </h2>
                    <p className="font-sans text-sm text-white/60 mt-3 leading-relaxed">
                      Me encontre nas redes abaixo ou copie o email e me chame diretamente.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {CONTACT_LINKS.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.id}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 p-5 rounded-lg bg-white/5 border border-white/10 hover:border-[#CCFF00]/50 transition-all duration-300"
                        >
                          <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-[#CCFF00] group-hover:border-[#CCFF00]/50 transition-colors shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-['Anton'] uppercase tracking-wide text-lg text-white group-hover:text-[#CCFF00] transition-colors">
                              {link.label}
                            </p>
                            <p className="font-sans text-sm text-white/50 truncate">{link.description}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-[#CCFF00] transition-colors shrink-0" />
                        </a>
                      );
                    })}

                    {/* Email — copy to clipboard */}
                    <button
                      onClick={handleCopyEmail}
                      className="group w-full flex items-center gap-4 p-5 rounded-lg bg-white/5 border border-white/10 hover:border-[#CCFF00]/50 transition-all duration-300 cursor-pointer text-left"
                    >
                      <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-[#CCFF00] group-hover:border-[#CCFF00]/50 transition-colors shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-['Anton'] uppercase tracking-wide text-lg text-white group-hover:text-[#CCFF00] transition-colors">
                          Email
                        </p>
                        <p className="font-mono text-sm text-white/50 truncate">{CONTACT_EMAIL}</p>
                      </div>
                      {emailCopied ? (
                        <Check className="w-4 h-4 text-[#CCFF00] shrink-0" />
                      ) : (
                        <Copy className="w-4 h-4 text-white/20 group-hover:text-[#CCFF00] transition-colors shrink-0" />
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {emailCopied && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        role="status"
                        aria-live="polite"
                        className="mt-4 text-center text-xs text-[#CCFF00] font-mono"
                      >
                        ✓ Email copiado para a área de transferência!
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="mt-10 flex items-center justify-center gap-3 text-center">
                    <span className="h-px w-8 bg-white/10" />
                    <span className="font-mono text-xs text-white/40">
                      Obrigado pela visita — vamos conversar?
                    </span>
                    <span className="h-px w-8 bg-white/10" />
                  </div>
                </motion.div>
              )}

              {/* ==================================================== */}
              {/* 3. PROJECTS SHOWCASE */}
              {/* ==================================================== */}
              {currentSection === 'PROJETOS' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-8"
                >
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] block mb-1">
                      ARQUIVO SELECIONADO
                    </span>
                    <h2 className="font-['Anton'] uppercase text-4xl text-white tracking-wide">
                      PROJETOS
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {PROJECTS_DATA.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-[#CCFF00]/50 transition-all duration-300 group"
                      >
                        <div className="flex items-center justify-between text-white/50 font-mono text-xs mb-2">
                          <span className="text-[#CCFF00] font-bold">{proj.number}</span>
                          <span>{proj.category}</span>
                        </div>
                        <a
                          href={proj.hasLiveDemo ? proj.deployUrl : proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-['Anton'] text-2xl uppercase tracking-wide text-white group-hover:text-[#CCFF00] transition-colors flex items-center justify-between"
                        >
                          <span>{proj.title}</span>
                          <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <p className="font-sans text-sm text-white/70 mt-3 leading-relaxed">
                          {proj.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {proj.tags.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/40 text-white/60 border border-white/5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        {proj.hasLiveDemo && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 font-mono text-xs text-white/50 hover:text-[#CCFF00] flex items-center gap-1 transition-colors w-fit"
                          >
                            <span>Ver código no GitHub</span>
                            <span>→</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigateSection('CONTATO')}
                    className="w-full py-4 border border-[#CCFF00] text-[#CCFF00] font-mono text-xs uppercase tracking-widest hover:bg-[#CCFF00] hover:text-black transition-colors cursor-pointer"
                  >
                    GOSTOU DO QUE VIU? VAMOS CONVERSAR →
                  </button>
                </motion.div>
              )}

              {/* ==================================================== */}
              {/* 4. STACK */}
              {/* ==================================================== */}
              {currentSection === 'STACK' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-8"
                >
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] block mb-1">
                      TECNOLOGIAS & FERRAMENTAS
                    </span>
                    <h2 className="font-['Anton'] uppercase text-4xl text-white tracking-wide">
                      STACK
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {STACK_DATA.map((item, i) => (
                      <article
                        key={i}
                        className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-[#CCFF00]/40 transition-colors group"
                      >
                        <div className="flex items-center justify-between font-mono text-xs text-white/40 mb-2">
                          <span className="text-[#CCFF00]">{item.category}</span>
                          <span>{item.tagline}</span>
                        </div>
                        <h3 className="font-['Anton'] text-xl uppercase tracking-wide text-white group-hover:text-[#CCFF00] transition-colors">
                          {item.title}
                        </h3>
                        <p className="font-sans text-sm text-white/70 mt-2 leading-relaxed">
                          {item.summary}
                        </p>
                      </article>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ==================================================== */}
              {/* 5. ABOUT */}
              {/* ==================================================== */}
              {currentSection === 'SOBRE' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-8"
                >
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] block mb-1">
                      BIOGRAFIA & TRAJETÓRIA
                    </span>
                    <h2 className="font-['Anton'] uppercase text-4xl text-white tracking-wide">
                      SOBRE MIM
                    </h2>
                  </div>

                  <div className="space-y-4 font-sans text-sm text-white/80 leading-relaxed">
                    <p>
                      Sou o <strong className="text-white font-semibold">Ricardo</strong>, desenvolvedor Fullstack no ecossistema TypeScript. Comecei como instrutor de cursos livres, o que me deu uma comunicação interpessoal diferenciada e facilidade para transmitir conceitos complexos — algo que carrego para o dia a dia com times e clientes.
                    </p>
                    <p>
                      Atualmente na <strong className="text-white font-semibold">Infore</strong>, desenvolvo soluções internas fullstack — da página institucional em Next.js e TypeScript ao portal do colaborador em Python e Flask — participando de <strong className="text-[#CCFF00]">todo o ciclo, do código ao deploy em produção</strong>.
                    </p>
                    <p>
                      Utilizo ferramentas de Inteligência Artificial (Claude Code, Codex, Gemini) no fluxo de trabalho para acelerar entregas e ampliar o escopo dos projetos, sempre mantendo qualidade e consistência de código. Também atuo como freelancer e curso Análise e Desenvolvimento de Sistemas na UniCesumar.
                    </p>
                  </div>

                  {/* Capabilities grid */}
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-4">
                      PRINCIPAIS HABILIDADES
                    </h4>
                    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                      {[
                        'TypeScript',
                        'React & Next.js',
                        'Node.js',
                        'Go (Golang)',
                        'Python & Flask',
                        'SQL (MySQL/PostgreSQL)',
                        'Testes (Jest/Cypress)',
                        'IA (Claude Code, Codex)',
                      ].map((skill) => (
                        <div
                          key={skill}
                          className="px-3 py-2 rounded bg-white/5 border border-white/5 text-white/80 flex items-center gap-2"
                        >
                          <span className="text-[#CCFF00]">✦</span>
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==================================================== */}
              {/* 6. RESUME */}
              {/* ==================================================== */}
              {currentSection === 'CURRÍCULO' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-8"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] block mb-1">
                        CURRÍCULO
                      </span>
                      <h2 className="font-['Anton'] uppercase text-4xl text-white tracking-wide">
                        LINHA DO TEMPO
                      </h2>
                    </div>

                    <a
                      href="/curriculo-ricardo-franco-delgado.pdf"
                      download="Curriculo-Ricardo-Franco-Delgado.pdf"
                      className="p-3 rounded-full bg-white/10 hover:bg-[#CCFF00] hover:text-black text-white transition-colors cursor-pointer"
                      title="Baixar PDF"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>

                  <div className="space-y-6 border-l border-white/15 pl-5 ml-2">
                    {[
                      {
                        role: 'Desenvolvedor de Software',
                        company: 'Infore',
                        period: '2026 // ATUAL',
                        desc: 'Desenvolvo a página institucional e o portal do colaborador da empresa com Next.js, TypeScript, Python e Flask, atuando no ciclo completo de soluções internas. Uso ferramentas de IA (Claude Code, Codex, Gemini) no fluxo de trabalho para acelerar entregas sem abrir mão da qualidade.',
                      },
                      {
                        role: 'Desenvolvedor de Software',
                        company: 'Freelancer',
                        period: '2025 — 2026',
                        desc: 'Manutenção e novas funcionalidades em uma plataforma empresarial hospedada em servidor próprio, com metodologia ágil e revisão semanal do cliente — sempre entregando sem tirar a aplicação do ar.',
                      },
                      {
                        role: 'Instrutor de Cursos Livres',
                        company: 'InfoSchool',
                        period: '2023',
                        desc: 'Identifiquei dificuldades de aprendizagem na turma, liderei ajustes na metodologia e ofereci acompanhamento individualizado — alcançando 90% de aprovação, o maior índice da unidade.',
                      },
                    ].map((exp, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-[#CCFF00] border-4 border-[#333333]" />
                        <span className="font-mono text-[11px] text-[#CCFF00] block">
                          {exp.period}
                        </span>
                        <h3 className="font-['Anton'] text-xl uppercase text-white tracking-wide mt-1">
                          {exp.role}
                        </h3>
                        <p className="font-mono text-xs text-white/50">{exp.company}</p>
                        <p className="font-sans text-sm text-white/70 mt-2 leading-relaxed">
                          {exp.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigateSection('CONTATO')}
                    className="w-full bg-[#CCFF00] text-black font-['Anton'] text-lg uppercase py-3.5 tracking-wider hover:bg-white transition-colors cursor-pointer"
                  >
                    QUER SABER MAIS? VAMOS CONVERSAR →
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
