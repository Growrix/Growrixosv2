# Growrix OS — Sanity Studio

Separate workspace for the hosted Studio, the homepage schemas and the seed script.
It has its own `package.json` and is never imported by the Next.js app.

- Schemas: `schemaTypes/` (spec: `docs/frontend-plans/homepage/06-content-schemas.md`)
- Singletons: `siteSettings` and `homePage` (fixed document ids, no create/delete in the Studio)
- Seed: `seed/data.ts` (content, copied verbatim from `docs/Claude research/02 New website build plan.md`) and `seed/seed.ts`

## 1. Environment

Copy `.env.example` to `.env.local` in this folder and fill in:

| Name | Value |
| --- | --- |
| `SANITY_STUDIO_PROJECT_ID` | Project id from sanity.io/manage (blocking item B-01) |
| `SANITY_STUDIO_DATASET` | `production` (the default when empty) |

The Next.js app uses the same project through its own variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, root `.env.example`).

## 2. Commands

```bash
cd sanity
npm install          # first time only
npm run dev          # Studio on http://localhost:3333
npm run typecheck    # tsc --noEmit
npm run build        # production build into dist/
npm run seed         # sanity exec seed/seed.ts --with-user-token
npm run deploy       # sanity deploy (hosted Studio)
```

`seed` and `deploy` need `npx sanity login` first. The seed writes with `createOrReplace` and
fixed `_id`s, so running it again replaces the same documents (Studio edits to those documents
are overwritten).

### What the seed leaves empty

Placeholder fields (`{{…}}` / `TBD-from-client`) are never seeded. API writes bypass Studio
validation, so these documents arrive in a state Studio will not publish until the client fills
them in:

- `homePage`: `hero.dual.metaDescription` (B-05; 02's text is 159 characters, the limit is 120–155).
- `siteSettings`: `ui.navLabel`, `ui.footerNavLabel`, `ui.submenuToggle`, `ui.themeToggle`,
  `ui.themeRowLabel`, `ui.externalSuffix` (B-07), `ui.sourcePrefix` (no text in 02), `statusPages` (B-08).
  The concierge fields of B-06 are warnings only; the chat stays hidden while they are empty.
- `person`: `name`, `firstName`, `photo` (B-02; warnings, the founder card stays hidden).
- `faq-home-03` ("How much does it cost?"): `answer` is empty pending a decision on the
  cross-service price range.

## 3. Revalidation webhook (`/api/revalidate`)

The site is static and revalidates by cache tag when content changes. In sanity.io/manage →
API → Webhooks, create:

| Setting | Value |
| --- | --- |
| URL | `https://<site-origin>/api/revalidate` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | `_type in ["siteSettings", "homePage", "person", "service", "offer", "workEntry", "faq", "stat"]` |
| Projection | `{_type}` |
| HTTP method | `POST` |
| API version | `v2025-02-19` |
| Drafts | off (only published content is read) |
| Secret | the same value as the app's `SANITY_REVALIDATE_SECRET` |

The route verifies the webhook signature with `SANITY_REVALIDATE_SECRET` and revalidates the
cache tag of the document's `_type` (06 §0: `homePage` → `home`, `workEntry` → `work`, other types use
their own name). Keep the secret out of `NEXT_PUBLIC_*` variables and out of git.
