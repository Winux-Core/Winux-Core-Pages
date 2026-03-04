# The Winux Foundation Site

SvelteKit + Vite static website for GitHub Pages.

## Local development

```bash
pnpm install
pnpm run dev
```

## Production build

```bash
pnpm run build
```

The output is generated in `build/` via `@sveltejs/adapter-static`.

## GitHub Pages deployment

- Enable GitHub Pages in repository settings.
- Set source to **GitHub Actions**.
- Push to `main` to trigger `.github/workflows/deploy.yml`.

If the repository name changes, update `repoName` in `svelte.config.js` so the `base` path remains correct.
