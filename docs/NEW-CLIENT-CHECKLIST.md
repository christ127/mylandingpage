# New Client Onboarding Checklist

**Scope:** everything that must change to stand up a new client/contest on this codebase (frontend `my-landing-page` + backend `ContestApi`), plus the one-time infra migration from `Plan.md`.

---

## 0. Critical — fix before onboarding anyone else

- [ ] **`ContestApi/publishProfile.xml` is committed to git with a plaintext SQL admin password and Web Deploy/FTP credentials** (`Server=tcp:sqlsv-contest-1234...;User ID=sqladmin;Password=Contest_1234a...`). It's tracked (`git ls-files` confirms), not gitignored despite `.gitignore` covering `appsettings.*.json`.
  - Rotate the SQL admin password and the App Service deploy credentials now — they're exposed in history regardless of future changes.
  - Remove the file from git history (`git filter-repo` or BFG), add `publishProfile.xml` to `.gitignore`.
  - This becomes moot once Container Apps replaces App Service (no more publish profile), but rotate now, don't wait.
- [ ] `my-landing-page/.env.production` is also tracked in git — confirm what's in it; if it holds anything other than a public API base URL, move it to Vercel/host env vars and untrack the file.

---

## 1. One-time infra migration (App Service → Container Apps)

Per `Plan.md`, executed once for the platform, not per client:

- [ ] SQL Database → General Purpose Serverless (min 0.5, max 1–2 vCores, 60 min auto-pause)
- [ ] Blob Storage → Cool tier + lifecycle rule (7-day move-to-cool, optional delete post-contest)
- [ ] Add multi-stage `Dockerfile` to `ContestApi`, listen on `8080` / `ASPNETCORE_URLS`
- [ ] Push image to ACR or GHCR
- [ ] Create Container Apps Environment (set Log Analytics retention to 30 days — it's auto-created and easy to forget)
- [ ] Deploy Container App: min replicas 0, max 1–2
- [ ] Move SQL + Storage connection strings into Container Apps secrets (or Key Vault, already wired via `KeyVault__Url` in `Program.cs`)
- [ ] Replace `ContestApi/.github/workflows/api-deploy.yml` — currently does `azure/webapps-deploy@v3` against `AZURE_WEBAPP_NAME: contest-api` using the `AZURE_WEBAPP_PUBLISH_PROFILE` secret. Swap for a build-and-push-image step + `az containerapp update` (or the `azure/container-apps-deploy-action`).
- [ ] Update frontend `VITE_API_URL` to the new `*.azurecontainerapps.io` endpoint (or custom domain)
- [ ] Cold-start test (expect 1–5s) before any live campaign push
- [ ] Decommission old App Service once verified

---

## 2. Per-new-client checklist

### Frontend (`my-landing-page`)
- [ ] `index.html` — `<title>`, favicon (`alpo-favicon.png` → new)
- [ ] Branding assets in `public/` and `src/assets/` — logo, banner desktop/mobile, favicon, custom font if any
- [ ] `src/views/LandingPage.jsx` — logo import, hero copy/colors
- [ ] `src/views/RulesPage.jsx` — legal copy, hardcoded domain mentions (`miheroealpo.com` appears twice, lines ~123/132)
- [ ] `src/views/FormPage.jsx:8` — `CONTEST_SLUG = "alpo-2026"`
- [ ] `src/views/SubmissionsPage.jsx:7` — `DEFAULT_CONTEST_SLUG = "alpo-2026"`
- [ ] `src/components/StickyBanner.jsx` — default image paths (`alpo-banner-desktop.jpg` / `-mobile.jpg`)
- [ ] `.env.local` / `.env.production` — `VITE_API_URL` → new client's API base URL
- [ ] `my-landing-page/.github/workflows/deploy.yml` is currently **broken/stale**: `AZURE_WEBAPP_NAME: contest-web`, `APP_DIR: starbuckslandingweb` — that folder doesn't exist in this repo (it's `my-landing-page`, leftover from the Starbucks client). Fix or replace this workflow before relying on it, independent of which client you're onboarding.
- [ ] New domain DNS + TLS for the new client's site (Vercel or wherever it's actually hosted)

### Backend (`ContestApi`)
- [ ] `Program.cs` CORS allow-list (~lines 27–38) — hardcoded per-domain `.Equals()` checks that just accumulate across clients (still has commented-out Starbucks domains). Add the new domain, or see refactor recommendation below.
- [ ] `appsettings.Production.json` — `Cors__AllowedOrigin` value (**note:** this is currently dead — see finding below)
- [ ] New Azure SQL Database (serverless, per migration above) + connection string secret
- [ ] New Storage account + container — `Storage__Container` app setting (defaults to `"contest-photos"` in `StoreOptions.cs`)
- [ ] `Admin__Key` secret — must be unique per client/environment, never reused
- [ ] Email sender config (`EmailOptions`: `FromAddress`, `DisplayName`) + provider connection string, plus SPF/DKIM/DMARC DNS records for the new domain if moving to Resend per `resend-implementation-plan.md`
- [ ] `Services/ACSEmailService.cs` HTML template is still **Starbucks-branded** — `#006241` green, Starbucks logo URL, "Gana con Starbucks" copy, CTA linking to `ganaconstarbucks.com`. It's also not currently wired up (`Program.cs` has the registration and the call-site commented out — no confirmation email is actually sent today). Needs a full rebrand or a swap to `ResendEmailService.cs` before it goes live for any client.
- [ ] Initial `Contest` row — `Name`, `Slug`, `StartsAtUtc`, `EndsAtUtc` for the new contest (the `/dev/seed` endpoint in `Program.cs` also hardcodes `"Photo Contest 2026"` / `"photo-contest-2026"`, unrelated to the live Alpo slug — dev-only leftover)
- [ ] `Submission` schema — `DogName`, `DogStory`, `DogPhotoBlobName` are specific to a pet-hero contest concept. If the new client's contest isn't about pets, plan an EF migration to rename/generalize these fields rather than repurposing them by convention.
- [ ] Key Vault / Container Apps secrets scoped to the new client (don't reuse the old client's secret names/values)
- [ ] Deploy workflow target (`AZURE_WEBAPP_NAME`, or post-migration the Container App name/registry image tag)

---

## 3. Recommended refactor (optional — reduces this list for every future client)

Right now most of the above is "find the hardcoded string and change it," which means this checklist gets re-run by hand every time and drifts (see the Starbucks leftovers). Worth considering before the next client:

- **Fix the CORS bug**: `Program.cs` computes `originsSetting` from `Cors__AllowedOrigin` but never uses it — the actual policy is the hardcoded `.Equals()` chain. Wire the config value in and delete the hardcoded list; onboarding a domain becomes an app-setting change, not a code change + redeploy.
- **Move `CONTEST_SLUG` to a `VITE_CONTEST_SLUG` env var** instead of duplicating it as a literal in two files.
- **Extract brand tokens** (logo path, colors, contest name/dates, domain) into one config consumed by both the frontend and the email template, instead of scattered hardcoded strings per file.
- **Generalize `Submission`** (or add a flexible `EntryDetailsJson` column) so contest-specific fields don't require a schema migration per client.

---

## Open question

Do you want me to just execute this checklist for a specific client next, do the Container Apps migration now, or tackle the refactor in §3 first so future onboarding is mostly config?
