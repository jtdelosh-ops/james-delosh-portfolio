# James Delosh — professional portfolio v1

An Astro static site with a navy / ivory / brass visual system, four project pages, an HTML résumé, original PDF download, and the polished 18-slide architecture presentation. No database, CMS, login, backend, tracking, or production client JavaScript. Nothing has been deployed.

## Run and build

Use Node.js **22.12+** and pnpm **11.19.0** (the package manager version is pinned). Install pnpm with `npm install --global pnpm@11.19.0` if needed.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the localhost address printed in the terminal. To validate the production output:

```sh
pnpm build
pnpm check:site
pnpm preview
```

`dist/` is the complete standalone static site. Source and assets are included; `node_modules/`, caches, and generated output are ignored by Git. The project archive also includes the checked `dist/` build for immediate static hosting. A small cross-platform launcher disables Astro telemetry.

## Routes and editing

| Route | Content |
| --- | --- |
| `/` | Hero, selected work, approach, experience, personal photos, contact |
| `/work/skeet-tracker/` | Product problem, role, approach, architecture, tradeoffs |
| `/work/embedded-workforce/` | Fictional case study with five diagrams and deck download |
| `/work/security-automation/` | Two sandbox workflows, three screenshots, and YouTube demo |
| `/work/security-automation/` | Two sandbox workflows, three screenshots, and YouTube demo |
| `/work/riker-bot/` | Verified bot behavior and implementation details |
| `/resume/` | HTML résumé with print styles and supplied PDF |

Edit the homepage in `src/pages/index.astro`, detailed roles in `src/data/experience.ts`, global colors/layout in `src/styles/global.css`, and navigation/contact/metadata in `src/layouts/Layout.astro`. Homepage experience summaries are intentionally shorter than the résumé; update both when roles change.

Public assets live in `public/images/` and `public/downloads/`. Images are locally optimized WebP copies with explicit dimensions, responsive variants where useful, and natural color. Original input files were not modified. The polished deck was found and included, so **no replacement slot is needed**. To update it later, replace `public/downloads/embedded-workforce-platform-integration.pptx` and refresh any affected slide images.

The PDF is the unchanged supplied résumé and retains its original contact line. Phone and location are omitted from the website’s HTML. The public email is `jtdelosh@gmail.com`.

## Domain and search metadata

Before an approved public deployment, set the build environment variable `SITE_URL` to the actual HTTPS origin (no subdirectory). No domain has been assumed or purchased. The value enables absolute canonical URLs, Open Graph URLs, sitemap entries, and indexing. Without it, the local build deliberately emits `noindex, nofollow` and a disallowing robots file. The HTML résumé and all project pages have their own titles and descriptions. No social-sharing image was requested, so social metadata uses a summary card without a fabricated image.

For example, set `SITE_URL` in your hosting dashboard and rebuild. In PowerShell, set `$env:SITE_URL` to your approved origin before `pnpm build`; on macOS/Linux export `SITE_URL` before building. The `.env.example` documents the variable; the configuration reads the process environment.

## Cloudflare deployment — only after approval

The site is host-independent static output. Current [Astro guidance](https://docs.astro.build/en/guides/deploy/cloudflare/) recommends Cloudflare Workers for new projects; no Astro Cloudflare adapter is needed for this static build.

**Workers static assets:** build with the approved `SITE_URL`, then deploy using `pnpm dlx wrangler deploy`. The included `wrangler.jsonc` serves `dist/` and the custom 404 page. No Worker application code or runtime bindings are needed. For repository-based builds, use `pnpm build` as the build command and `pnpm dlx wrangler deploy` as the deploy command.

**Cloudflare Pages:** use a Pages project with the site folder as its root, `pnpm build` as the build command, and `dist` as the output directory. Set Node 22.12+ and `SITE_URL` in the build environment. Alternatively upload the contents of `dist/` through a direct-upload Pages project. This is a multipage site: do not add an SPA catch-all rewrite.

Do not publish or connect a domain until James approves. If creating a GitHub repository from the parent Codex folder, follow its `AGENTS.md` branch-protection requirements.

## Verification

`pnpm check:site` checks every built HTML page, local link and fragment, referenced image (including responsive variants), metadata, image alt text and dimensions, omitted phone/location, and download file signatures. It does not claim browser-based mobile or visual testing. Browser review should cover phone and desktop layouts, keyboard navigation, zoom, diagram readability, and downloads before public launch.

See `CONTENT-SOURCES.md` for asset provenance and source-specific decisions.
