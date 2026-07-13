---
ticket: none
date: 2026-07-13
status: implemented
grilled: 2026-07-13
architect: LGTM
branch: feature/homepage
base: master
---

# Missing Bits — Homepage Design

## Overview

The bilingual (EN/PL) static homepage of Missing Bits, a software-development company, served at `missing-bits.com`. Built with Astro, hosted on GitHub Pages, DNS on AWS Route 53. The homepage is the company's public face: who Missing Bits is, what it offers, selected projects, and how to get in touch.

## Goals

- Credible company presence when someone looks the company up (contractors, clients from referrals).
- Light path for potential clients to reach out (visible contact e-mail; no forms, no funnel).
- Showcase selected open-source projects from the `missing-bits` GitHub organization and the owner's personal account.

## Non-goals

- Blog, CMS, analytics, cookie banners, contact forms, or any backend.
- Client-acquisition landing funnel (may come later).

## Homepage structure

A one-page scroll layout plus a contact subpage, per locale, generated statically by Astro. Both locales live under explicit prefixes:

| Path | Content |
|---|---|
| `/` | The *language detector*: an inline synchronous script in `<head>` redirects immediately — saved locale choice in `localStorage` first, then `navigator.language` (Polish → `/pl/`, otherwise → `/en/`). A `<meta http-equiv="refresh">` to `/en/` with a 2-second delay is the no-JS fallback; the delay guarantees it never races the script |
| `/en/` | English locale (default) — main scroll page |
| `/pl/` | Polish locale — main scroll page |
| `/en/contact/` | English contact subpage |
| `/pl/contact/` | Polish contact subpage |
| `/contact/` | Language detector for the contact subpage — same shared mechanism as `/`, redirecting to `/en/contact/` or `/pl/contact/` (no-JS fallback: `/en/contact/`) |
| `404.html` | Custom bilingual 404 page, playing on the "missing bits" theme |

Changing the default locale later is a one-line config change (`astro.config` i18n `defaultLocale` + the shared detector's single fallback-locale constant); prefixed URLs stay stable either way.

### Main page sections (both locales, same order)

1. **Hero** — logo (dark-background variant), company name, tagline, 2–3 sentences about the company and its software-services scope.
2. **Services** — cards for the service offering (e.g. custom software development, consulting/architecture, automation & DevOps). Exact list is content, easily edited in JSON.
3. **Projects** — hand-maintained list of selected projects linking to GitHub repositories in both the `missing-bits` organization and the `vircung` personal account. Locale-invariant data (title, repository URL) lives once in a shared `src/data/projects.json`; only the one-sentence descriptions live per locale in the i18n files, keyed by project slug — so the list cannot drift between locales. No GitHub API involved — updating the list is a content edit. The list launches empty — the section stays hidden until selected repositories are migrated to the `missing-bits` organization with updated licenses/copyright.

### Contact subpage (per locale)

Contact lives on its own subpage (`/en/contact/`, `/pl/contact/`), not on the main scroll page: contact e-mail (`contact@missing-bits.com`) and a link to the `missing-bits` GitHub organization. Company registration rows (NIP/REGON) are supported by the content model but launch hidden — the owner decided not to publish them for now; filling the values in later is a content edit.

### Header navigation

Every page shares a header with:
- a navbar: *Services* (anchor into the main page) and *Contact* (link to the contact subpage), per-locale labels;
- an EN/PL language switcher — locale links pointing at the **equivalent page** in the other locale (main → main, contact → contact) that also persist the clicked locale to `localStorage` so the language detector honours a manual choice on later visits.

## Architecture

- **Framework:** Astro (latest stable), static output, zero runtime JavaScript except the ~10-line shared language detector serving both unprefixed paths (`/`, `/contact/`) and the one-liner in the language switcher persisting the chosen locale.
- **i18n:** Astro built-in i18n routing with `prefixDefaultLocale: true`. All copy lives in `src/i18n/en.json` and `src/i18n/pl.json` with identical structure; components receive strings from these files, so content edits never touch markup. Locale-invariant data (the projects list) lives in `src/data/`. Each page sets `<html lang>`, and `hreflang` alternate links point between the locale counterparts of the **same page** (`/en/` ↔ `/pl/`, `/en/contact/` ↔ `/pl/contact/`), plus `x-default` → that page's language detector (`/` for the main pages, `/contact/` for the contact subpages).
- **SEO & social metadata:** per-locale `<title>` and meta description; Open Graph + Twitter card tags with a logo-based preview image; `sitemap.xml` via the official `@astrojs/sitemap` integration; `robots.txt`.
- **Layout/components:** `src/layouts/Base.astro` (head, nav, footer) + one component per main-page section (`Hero`, `Services`, `Projects`) plus `Contact`, rendered by the contact subpage.
- **Styling:** dark, technical-minimal. Palette derived from the existing logo (navy → blue → cyan gradient of the faceted hexagon), monospace accents, subtle "bits" motif. Plain CSS (or minimal scoped Astro styles) — no CSS framework.
- **Branding assets:** existing logo pack (faceted hexagon "M" + "MissingBits" wordmark; light/dark and mono variants) committed under `src/assets/` (optimized by Astro at build time); favicon files derived from the hexagon mark live in `public/`.
- **Toolchain:** Node pinned via `mise.toml` in the repo; Astro and all build deps are local npm dependencies (`package.json`), nothing global on the host.

## Repository & deployment

- **Repository:** `missing-bits/homepage` on GitHub (already created, currently private), default branch `master` (matching the local branch). Note: GitHub Pages requires a public repository on the free organization plan — the repo goes public before Pages is enabled (content is written as public from the start: no secrets, no internal data).
- **CI/CD:** GitHub Actions using the official Astro action (`withastro/action`): push to `master` → build → deploy to GitHub Pages.
- **Custom domain:** `missing-bits.com` configured in Pages with *Enforce HTTPS* (certificate issued automatically by GitHub via Let's Encrypt). `www.missing-bits.com` redirects to the apex (GitHub Pages default behaviour once DNS is set).

## DNS

Standard GitHub Pages custom-domain setup in the existing Route 53 zone (zone stays on AWS), in this order:

1. **Verify the domain for the organization first:** add `missing-bits.com` as a verified domain of the `missing-bits` GitHub organization (one `TXT` record in the Route 53 zone). This prevents any other GitHub user from claiming the domain for their Pages site — including during windows when our Pages site is not yet (or temporarily not) serving it.
2. Configure the custom domain in the repository's Pages settings.
3. Only then flip the public records:
   - Apex `missing-bits.com`: `A`/`AAAA` records pointing at the GitHub Pages IPs from GitHub's documentation.
   - `www.missing-bits.com`: `CNAME` to `missing-bits.github.io`.

No other records change as part of this project.

## Error handling

- Custom `404.astro` page (bilingual, on-brand).
- CI: a failing `astro build` blocks deployment — broken builds never reach production.

## Testing & verification

No test framework — for a static homepage the build is the gate (YAGNI). Post-deploy verification checklist:

- `https://missing-bits.com/` returns 200 and redirects the browser to `/en/` or `/pl/` by locale.
- `https://missing-bits.com/en/` and `/pl/` serve the correct locales with correct `lang` and `hreflang` attributes.
- `https://missing-bits.com/en/contact/` and `/pl/contact/` serve the contact subpage in the right locale.
- `https://missing-bits.com/contact/` redirects the browser to the locale counterpart, like `/`.
- `https://www.missing-bits.com` redirects to the apex domain.
- TLS certificate valid for both apex and `www`.
- Unknown path serves the custom 404 page.
- Mail keeps flowing: MX records unchanged (`dig` check after DNS edits).

## Content inputs required during implementation

- Final copy (tagline, about, services list) in EN and PL — drafted by Claude, reviewed by the owner.
- The `contact@missing-bits.com` mailbox/alias must exist in Zoho before the homepage goes live (confirmed 2026-07-13).
