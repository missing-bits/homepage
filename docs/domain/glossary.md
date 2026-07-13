# Missing Bits — domain glossary

Missing Bits is a software-development company (currently a Polish sole proprietorship, planned to become a limited company). This repository builds and operates its public homepage at `missing-bits.com`.

## Language

**Homepage**:
The company's public website at `missing-bits.com` — currently a single scrolling page plus contact and projects subpages, per locale, built by this repository.
_Avoid_: landing page, business card, site

**Locale**:
One of the homepage's two content languages, identified by ISO code `en` or `pl`; `en` is the default. Every piece of copy exists once per locale.
_Avoid_: language version, translation

**Language detector**:
A page at an unprefixed path (`/`, `/contact/`, `/projects/`) whose only job is to redirect the visitor to the path's locale counterpart: saved `localStorage` choice → `navigator.language` → `en` fallback.
_Avoid_: root redirect, splash page

**Project**:
Missing Bits' own work — an open-source repository or own product — listed in `src/data/projects.json` and shown on the projects subpage.
_Avoid_: realization, client work (those are a Client delivery)

**Client delivery**:
Work delivered for a client (PL copy: "realizacja"). Will live on its own future subpage (working name `/work/`, PL "Realizacje") — never mixed into the projects list.
_Avoid_: project (for client work)

**Minimal JS component**:
A small piece of runtime JavaScript — own code or an npm dependency — bundled at build time and served from the homepage's own origin; never loaded from a CDN or third-party origin. Current three: the language detector, the locale switcher, the featured carousel.
_Avoid_: CDN script, third-party embed

**Featured**:
A flag (`featured: true`) on a project — and, once client deliveries exist, equally on a delivery — that puts the entry in the single main-page carousel. Subpages always show their full lists.
_Avoid_: highlighted, promoted

**Missing Bits**:
The company name, always written as two words in copy. The single-word `MissingBits` appears only inside the stylized wordmark graphic.
_Avoid_: MissingBits (in text), missing-bits (outside technical identifiers)
