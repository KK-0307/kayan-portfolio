A terminal-inspired personal portfolio, built with Next.js (App Router) and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

Edit content (name, bio, projects, skills, tech stack, now-playing stream) in [`src/data/portfolio.ts`](src/data/portfolio.ts) — everything on the page is driven from that one file.

### Adding your photo

Drop a photo at `public/portrait.jpg` (or update `profile.portraitSrc` in `src/data/portfolio.ts` to match your filename). Until a photo is present, the whoami panel falls back to a placeholder icon automatically.

## Deploying to GitHub Pages

This project is configured for static export (`output: "export"` in `next.config.ts`), which is what GitHub Pages requires.

**Automatic (recommended):** push to `main` and the included workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) will build and deploy automatically. One-time setup:

1. In your GitHub repo, go to **Settings → Pages** and set **Source** to "GitHub Actions".
2. Push to `main` (or run the workflow manually from the Actions tab).
3. Your site will be live at `https://<username>.github.io/<repo>/` (or `https://<username>.github.io/` if the repo is named `<username>.github.io`).

The workflow automatically computes the correct `basePath` for project pages vs. root user/org pages — no manual config needed.

**Manual build:**

```bash
NEXT_PUBLIC_BASE_PATH=/<repo-name> npm run build
```

This outputs a static site to the `out/` folder, which you can push to a `gh-pages` branch or any static host. Omit `NEXT_PUBLIC_BASE_PATH` if deploying to a domain root.

## Stack

- Next.js (App Router, static export)
- TypeScript
- Tailwind CSS
- lucide-react + react-icons for iconography
