# Nyonya Su Pei (Vite rebuild)

Clean multipage static site for Peranakan cooking classes and private dining in George Town, Penang.

## Stack

- Vite (vanilla TypeScript)
- Shared compiled Tailwind CSS (`src/styles.css`) matching the draft palette
- Static HTML pages: Home, Classes, Private dining, Recipes & videos, About, Book

## Develop

```bash
npm install
npm run dev
```

## Build

Default base `/` (Vercel / custom domain root):

```bash
npm run build
```

GitHub Pages project site (`https://jadeblackz.github.io/nyonya-su-pei/`):

```bash
npm run build:pages
```

Or:

```bash
VITE_BASE=/nyonya-su-pei/ npm run build
```

Preview production build:

```bash
npm run preview
```

## Deploy notes

- Keep `main` on GitHub Pages until a Vercel deploy is live.
- This rebuild lives on branch `vite-rebuild`.
- Forms are static: submissions prompt guests to call, WhatsApp, or email.

## Brand

- Teal `#0E5C56`, chili `#A33B2B`
- Fonts: Fraunces (display) + Lexend (body)
- Phone: +60 16-414 1416
