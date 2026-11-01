# Mimesis company identity website

A brand-neutral, static Astro website. V1 introduces the company through introduction, studio, expertise and contact sections. It deliberately contains no portfolio or project pages.

## Local development

Use Node 22 LTS (the scaffold also supports Node 20.19+).

```sh
npm install
npm run check
npm run dev
```

Open the local URL printed by Astro. To check the production output:

```sh
npm run build
npm run preview
```

Commit the generated `package-lock.json` after the first successful installation. CI uses `npm ci`, so the lockfile is required before running the Pages workflow. Dependencies could not be downloaded in the authoring session because network access was disabled; the scaffold has not yet passed Astro compilation or browser QA.

## Where to edit

- `src/i18n/en.ts`: English copy and metadata, including all visible labels.
- `src/config/site.ts`: company name, approved public email and future logo path.
- `src/styles/tokens.css`: palette, typography and layout tokens.
- `src/components/Brand.astro`: text wordmark or replacement logo.
- `src/components/Study.astro`: decorative vector study, independent of the brand and removable.
- `src/components/Identity.astro`: reusable single-page content and section markup.
- `src/layouts/Page.astro`: document language, metadata and shared styles.
- `src/pages/index.astro`: English entry point.

No external fonts, tracking, client-side framework or contact backend is needed. Navigation uses native anchors and stays visible on small screens. The contact section displays a truthful pending message until `site.email` is confirmed; setting that value enables the email link. Email delivery depends on the visitor's email application. There are no invented phone numbers, office addresses or legal identifiers.

Place an approved logo or other static files in a new `public/` directory. Set `site.logo` to its path relative to that directory, without a leading slash. The component prefixes Astro's base URL for project-site hosting. Adjust logo dimensions in `Brand.astro` for the supplied asset.

## Greek localization

English is served at `/`. Astro reserves `en` and `el`, while `src/i18n/index.ts` tracks which translations are ready. Greek deliberately has no page or language switcher yet.

When approved Greek copy is available:

1. Create `src/i18n/el.ts`, exporting an object that satisfies the `Copy` type from `src/i18n/index.ts` (use `import type` to avoid a runtime cycle).
2. Register that object instead of `el: null`.
3. Create `src/pages/el/index.astro`, using the same Page and Identity components with `locale="el"` and `getCopy('el')`.
4. Add reciprocal `hreflang` links in Page, plus an accessible language switcher using `import.meta.env.BASE_URL`.
5. Review real Greek text at narrow widths; do not rely on English line lengths. System fonts include Greek glyphs. Update the brand font stack only when approved Greek coverage is confirmed.

The canonical URL follows each page and the selected site/base configuration. The metadata locale is derived from the page language.

## Hosting and milestones

See [the deployment guide](docs/deployment.md) for GitHub Pages and `mimesisvisuals.com` setup. The workflow is manual only. Nothing has been committed, pushed, published or changed at the DNS provider by this scaffold.

Milestone 1: review copy, confirm public email, install dependencies, generate the lockfile, pass checks/build and review desktop/mobile rendering. Then deploy the company identity page when requested.

Milestone 2: integrate approved logo, type and palette; translate Greek copy and add routes when ready. Work/project sections can be designed separately later.
