# Missing Bits homepage — project instructions

Bilingual (EN/PL) static Astro homepage for Missing Bits, live at https://missing-bits.com (GitHub Pages).

## Terminology (binding)

`docs/domain/glossary.md` binds all copy, naming, and docs — read it before writing either. Key terms: **homepage** (never "landing page"/"site"), **locale** (`en`/`pl`, default `en`), **language detector**, **project** vs **client delivery** (separate concepts — client work never goes into the projects list), **featured** (one shared main-page carousel, never two), **minimal JS component**.

## Architecture crib

- All copy in `src/i18n/{en,pl}.json` — identical structure, enforced by `scripts/check-i18n.mjs` (prebuild). Content edits never touch markup.
- Locale-invariant data in `src/data/` (`projects.json`, `company.json`).
- Every page pair: `hreflang` en/pl + `x-default` pointing at that page's language detector; detectors are noindex and excluded from the sitemap (filter in `astro.config.mjs`).
- Runtime JS: minimal, self-hosted components only (bundled at build, own origin). NEVER add a CDN script or any external runtime request.
- No test framework — `npm run build` is the gate. Verify changes by building and inspecting `dist/` (grep) plus the dev server.

## Workflow

- Tools exclusively via mise (`mise.toml`); project libraries only as npm deps — never `npm install -g`.
- `mise run dev` = live-reload server at :4321 (Astro 7 daemonizes it; `npx astro dev stop`). `mise run build` / `preview` / `icons`.
- Deploy: merge into `master`, then `mise run deploy` (refuses on other branches). Push to `master` = production deploy.
- Work on topic branches (`feature/…`, `fix/…`, `chore/…`); Conventional Commits, single subject line.

## Docs process

Specs in `docs/specs/`, plans in `docs/plans/`, glossary + future ADRs in `docs/domain/` — all git-tracked. Spec/plan frontmatter follows the ticket convention (`ticket`/`date`/`status` + `grilled`/`architect`/`adversary` stamps). This is a public repo: no secrets, no internal operational details (zone IDs, tokens, host paths) in anything committed.
