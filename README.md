# Missing Bits — homepage

The bilingual (EN/PL) static homepage of Missing Bits, served at [missing-bits.com](https://missing-bits.com).

Built with [Astro](https://astro.build), hosted on GitHub Pages. Content lives in per-locale JSON — editing copy never touches markup.

## Quick start

Tools are managed by [mise](https://mise.jdx.dev) (`node`, `gh` — pinned in `mise.toml`):

```sh
mise install        # toolchain
mise run install    # npm dependencies
mise run dev        # dev server with live reload at http://localhost:4321
```

Note: Astro 7 daemonizes the dev server — the task returns immediately; manage it with `npx astro dev stop | status | logs`.

## Tasks

| Task | Purpose |
|---|---|
| `mise run dev` | Dev server with live reload (HMR watches `src/`) |
| `mise run build` | Build into `dist/` — also enforces EN/PL i18n structural parity (prebuild) |
| `mise run preview` | Build + serve `dist/` production-like (no reload) |
| `mise run icons` | Regenerate favicons and the OG image from `src/assets/logo/` |
| `mise run deploy` | Push `master` to origin (triggers the Pages deploy); refuses on any other branch |

## Editing content

- **Copy** (both locales, identical structure): `src/i18n/en.json` + `src/i18n/pl.json`. The build fails if the structures drift.
- **Projects**: locale-invariant data (title, URL, optional `category`, optional `tags`, `featured` flag) in `src/data/projects.json`; per-locale descriptions and category labels in the i18n files, keyed by slug. `featured: true` puts an entry in the main-page carousel; the projects subpage always shows the full list. An empty list hides the section.
- **Company data**: `src/data/company.json` (e-mail; NIP/REGON rows render only when filled).

## Structure

| Path | Content |
|---|---|
| `/` , `/contact/`, `/projects/` | Language detectors — redirect to the visitor's locale (`localStorage` → browser language → `en`) |
| `/en/`, `/pl/` | Main scroll page: hero, services, featured carousel |
| `/en/projects/`, `/pl/projects/` | Full projects list, grouped by category |
| `/en/contact/`, `/pl/contact/` | Contact subpage |

Runtime JavaScript is limited to minimal, self-hosted components bundled at build time (language detector, locale switcher, featured carousel) — no CDNs, no third-party requests.

## Deploying

Work happens on topic branches; `master` is the deploy branch. Merge, then:

```sh
git switch master && git merge <branch>
mise run deploy
```

GitHub Actions builds and publishes to Pages on every push to `master`.

## Docs

Design docs live in `docs/`: the spec (`docs/specs/`), the implementation plan (`docs/plans/`), and the domain glossary (`docs/domain/glossary.md`) — the glossary's canonical terms bind copy and naming in this repo.
