# Portfólio — Ricardo Franco Delgado

Portfólio pessoal desenvolvido em React, com uma hero section animada por um fundo de partículas em WebGL (Three.js) e navegação em formato de drawer lateral.

## Sobre o projeto

A interface é organizada em camadas sobrepostas: um canvas de partículas ao fundo, uma imagem de destaque recortada, tipografia central animada e um cabeçalho fixo. A navegação entre seções (Projetos, Stack, Sobre, Currículo e Contato) acontece através de um drawer lateral, com rotas próprias para cada seção e atalhos de teclado (`M` para o menu, `C` para contato).

O site é renderizado estaticamente (SSG) para cada rota/seção, com meta tags de SEO específicas por página.

## Stack

- **React 19** + **TypeScript**
- **Vite** como build tool, com **vite-react-ssg** para geração de site estático
- **Three.js** para o fundo de partículas em WebGL
- **Framer Motion** para animações de UI
- **Tailwind CSS v4**
- **React Router DOM**
- **Oxlint** para lint

## Estrutura

```
src/
├── components/
│   ├── ParticleBackground.tsx   # Fundo animado em WebGL (Three.js)
│   ├── HeroImage.tsx            # Imagem de destaque
│   ├── HeroContent.tsx          # Tipografia e bio central
│   ├── Header.tsx               # Cabeçalho fixo
│   ├── FooterMarquee.tsx        # Marquee no rodapé
│   ├── InfoDrawer.tsx           # Drawer lateral com as seções (Projetos, Stack, Sobre, Currículo, Contato)
│   ├── ScrambleText.tsx         # Efeito de texto "scramble"
│   └── SEO.tsx                  # Meta tags por seção
├── App.tsx                      # Layout principal e definição das rotas
└── main.tsx                     # Entry point
```

## Rodando localmente

```bash
npm install
npm run dev
```

## Scripts

| Comando           | Descrição                                  |
| ----------------- | ------------------------------------------- |
| `npm run dev`      | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build`    | Type-check e build estático (SSG)           |
| `npm run preview`  | Preview do build de produção                |
| `npm run lint`     | Executa o lint com Oxlint                   |
