# BookReplay Docs

The documentation site for the self-hosted [BookReplay application](https://github.com/BookReplay/BookReplay), built with Next.js and Fumadocs.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The BookReplay application runs separately, normally on port 2665.

## Edit documentation

Pages live in `content/docs/` as MDX files. Each page has a `title` and `description` in its frontmatter. Add new pages to `content/docs/meta.json` to set their sidebar order.

| File | Content |
| --- | --- |
| `index.mdx` | Product introduction and guide links |
| `quick-start.mdx` | Installation and first import |
| `using-bookreplay.mdx` | Imports, books, highlight edits, reviews, progress, and account settings |
| `book-enrichment.mdx` | Open Library, Google Books setup, manual matching, and metadata privacy |
| `configuration.mdx` | Environment variables, metadata privacy, and troubleshooting |
| `backups-and-upgrades.mdx` | Database backups, restores, and upgrades |

Check product behavior against the **BookReplay** application repository, not `bookreplay-cloud`. Use its current code, `compose.yaml`, `compose.dev.yaml`, `.env.example`, and `deploy/SECURITY.md` as evidence. The latest content review used BookReplay commit `f694115` on 2026-10-02. Release availability must be checked separately before recommending a prebuilt image.

The documentation loader is in `lib/source.ts`; shared branding and application repository links are in `lib/shared.ts` and `lib/layout.shared.tsx`. The homepage lives in `app/(home)/page.tsx`.

## Validate and build

```sh
npm run types:check
npm run build
npm start
```

The site exposes `/docs`, `/api/search`, `/llms.txt`, `/llms-full.txt`, and per-page Markdown under `/llms.mdx/docs/`. These use the same documentation source.

## Vinext migration

The Vite configuration includes `fumadocsMdx()` to compile the documentation macros alongside vinext. The original Next.js commands remain available.

```sh
npm run dev:vinext   # http://localhost:3001
npm run build:vinext
```

The vinext build and direct calls to its built route handler have been checked for the homepage, a documentation page, search, Markdown rewrites, and both LLM indexes. Browser rendering and Cloudflare deployment have not been verified.

Vite uses `@tailwindcss/vite` to compile styles. Its PostCSS plugin list is empty to avoid running the existing Next.js PostCSS pipeline twice. The original Next.js build still uses `postcss.config.mjs`.

Cloudflare builds use `@cloudflare/vite-plugin` with the `rsc` environment and its `ssr` child. This generates `dist/server/wrangler.json` with the compiled Worker entry and assets directory, and redirects Wrangler to that generated configuration. Keep this plugin in `vite.config.ts`; the source Wrangler configuration alone is not a deployable build.

Use Node.js 22 or newer for Wrangler. To check the deployment bundle without publishing:

```sh
npm run build:vinext
npx wrangler deploy --dry-run
```

Run `npm audit` with registry access to check dependency vulnerabilities. The migration environment could not reach the npm registry, so the vulnerability audit could not complete. Check browser rendering and search locally before deploying.
