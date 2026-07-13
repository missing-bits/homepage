# Missing Bits — domain glossary

Missing Bits is a software-development company (currently a Polish sole proprietorship, planned to become a limited company). This repository builds and operates its public homepage at `missing-bits.com`.

## Language

**Homepage**:
The company's public website at `missing-bits.com` — currently a single scrolling page plus a contact subpage, per locale, built by this repository.
_Avoid_: landing page, business card, site

**Locale**:
One of the homepage's two content languages, identified by ISO code `en` or `pl`; `en` is the default. Every piece of copy exists once per locale.
_Avoid_: language version, translation

**Language detector**:
A page at an unprefixed path (`/`, `/contact/`) whose only job is to redirect the visitor to the path's locale counterpart: saved `localStorage` choice → `navigator.language` → `en` fallback.
_Avoid_: root redirect, splash page

**Missing Bits**:
The company name, always written as two words in copy. The single-word `MissingBits` appears only inside the stylized wordmark graphic.
_Avoid_: MissingBits (in text), missing-bits (outside technical identifiers)
