# AI Agent Instructions

## Next.js version

This project uses **Next.js 16.2.6** — breaking changes exist vs. older versions.
Read `node_modules/next/dist/docs/` before writing any Next.js-specific code.
Heed deprecation notices.

## Architecture

This is a **single-page application (SPA)**: one route (`app/page.js`) renders
every section in one continuous, natively-scrollable document. There is **no
scroll hijacking, no viewport snapping, and no video intro/loop**.

- **Continuous native scroll.** Smooth scrolling is CSS-only
  (`html { scroll-behavior: smooth; scroll-padding-top: var(--nav-h) }`).
  Do NOT reintroduce wheel/touch hijacking or `scroll-snap`.
- **Server-first rendering.** Section components are server components for SEO.
  Animation is layered on via the client `components/ui/Reveal.jsx` wrapper
  (IntersectionObserver toggles `[data-reveal="in"]`, transitioned in CSS).
  Keep text content server-rendered — do not move copy into client-only JS.
- **Section IDs are the navigation contract.** Sections use the ids
  `home`, `about`, `projects`, `experience`, `publications`, `contact`.
  The navbar uses anchor links (`#id`) + IntersectionObserver scroll spy.
  If you add/rename a section, update `NAV_ITEMS` in `components/ui/Navbar.jsx`.

## Key project constraints

- **CSS Modules only** for component styles (`styles/...`). No inline style
  objects except for genuinely dynamic values (e.g. the `--reveal-delay` var).
- **Design tokens live in `app/globals.css`** — a minimal monochrome scale
  (`--ink-*`) plus a single accent (`--accent`). Use these tokens everywhere;
  do not hardcode hex colors in modules.
- **Typography is Poppins** via `next/font/google` in `app/layout.js`
  (exposed as `--font-poppins` / `--font-ui`).
- **All portfolio content in `data/profile.json` and `data/content.json`** —
  do not hardcode names, roles, copy, or links in components.
- **`lib/siteConfig.js`** exports `SITE_URL`. Use it in metadata and JSON-LD.
- **Accessibility is a requirement, not a nice-to-have.** Preserve: semantic
  landmarks (`header`/`nav`/`main`/`section`/`footer`), one `h1`, per-section
  `aria-labelledby`, the skip link, visible focus styles, and the
  `prefers-reduced-motion` block in `globals.css` (it must keep disabling
  reveal transforms and smooth scroll).

## Notes

- Legacy cinematic components (`components/three/*`, `Cursor`, `VideoIntro`,
  `ScreenLoader`, `PublicationsFooterSection`, `lib/gsap.js`) are no longer
  imported and can be removed; they are kept only because the sandbox could
  not delete them. `gsap`/`three` deps are likewise unused.
