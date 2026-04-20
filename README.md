# Zytex Poster Website

A Next.js (App Router) + TypeScript + Tailwind CSS v4 poster website that recreates and modernizes the provided biotech poster with:

- shadcn-style reusable UI primitives
- Framer Motion animations
- Lenis smooth momentum scrolling
- Aurora/cursor glow background beam
- 3D interactive tilt cards
- Responsive design
- Downloadable high-fidelity PDF export from the exact web composition

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## PDF export

Click **Download PDF** in the top toolbar. The app captures the poster element and saves a centered A4 PDF while preserving the on-screen color theme.
