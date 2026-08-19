# ContestApi: Container Apps Migration — Execution Log

Record of what was actually done to move `ContestApi` from Azure App Service to Azure Container Apps (per `Plan.md`), the problems hit along the way, and current live state. Written so this doesn't have to be re-discovered next time.

**Status as of 2026-08-19: fully cut over. Frontend and backend both live on the new stack.**

---

## Resources provisioned

All in resource group `rg-contest-landing-prod` (same RG as the original App Service/SQL/Storage):

| Resource | Name | Notes |
|---|---|---|
| Container Registry | `acrcontestapi` | Basic tier |
| Container Apps Environment | `cae-contest-api` | Auto-created Log Analytics workspace `workspace-rgcontestlandingprodruRo`, retention set to 30 days |
| Container App | `contest-api-ca` | `min-replicas 0`, `max-replicas 2`, target port `8080`, external ingress, system-assigned managed identity |
| Live endpoint | `https://contest-api-ca.ambitiousdune-a6ae93f8.centralus.azurecontainerapps.io` | |

**GitHub OIDC** (repo `christ127/ContestApi`):
- App registration `gha-contest-api-deploy` (`appId fb9f6c56-69f5-4ae7-872a-05a81f9b85b1`)
- Federated credential scoped to `repo:christ127/ContestApi:ref:refs/heads/main` — **workflow_dispatch/pushes from any other branch will fail Azure login**, only `main` is trusted
- Roles: `AcrPush` + `Contributor` (scoped to just the `acrcontestapi` resource, not the RG) on the registry, `Container Apps Contributor` on the resource group
- Repo secrets: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID` (no client secret — OIDC only)

Deploy workflow: `ContestApi/.github/workflows/api-deploy.yml` — builds via `az acr build`, deploys via `az containerapp update`, triggers on push to `main`.

---

## Gotchas hit during setup (read this before touching any of it again)

1. **App Service's `ConnectionStrings__Sql` setting was a Key Vault reference** (`@Microsoft.KeyVault(SecretUri=...)`) — App Service resolves that syntax automatically; Container Apps does not, it just passes the literal string through and the app crashes on startup (`Keyword not supported: '@microsoft.keyvault(secreturi'`). Fix: pulled the real value from Key Vault (`kv-contest-1234`, secret `Sql-ConnectionString`) and set it directly as a Container Apps secret.

2. **The SQL connection string uses `Authentication=Active Directory Default`** (AAD token auth via managed identity, no password). The Container App's managed identity is a *different* identity than the old App Service's, so it had no database user and logins failed (`Login failed for user '<token-identified principal>'`). Fix: connected via `sqlcmd --authentication-method ActiveDirectoryDefault` (installed with `brew install sqlcmd`) and ran:
   ```sql
   CREATE USER [contest-api-ca] FROM EXTERNAL PROVIDER;
   ALTER ROLE db_datareader ADD MEMBER [contest-api-ca];
   ALTER ROLE db_datawriter ADD MEMBER [contest-api-ca];
   ```
   (matches the role membership the old `contest-api` identity already had). **If this API is ever migrated again or a new container identity is created, this step has to be repeated for the new identity.**

3. **`az acr build` needs more than the `AcrPush` role.** `AcrPush` alone gave `ERROR: The resource ... could not be found` (Azure masks 403 as 404 when the caller lacks even Reader visibility) — ACR Tasks (`az acr build`) needs control-plane access, not just data-plane push/pull. Fix: added `Contributor` scoped narrowly to just the ACR resource.

4. **`az containerapp create --image ...` silently left the default `mcr.microsoft.com/k8se/quickstart` placeholder active** despite the image flag being passed — the revision came up running the quickstart image, not ours. Fix: explicit `az containerapp update --image ...` after create actually applied it. Worth double-checking the running image after any future `create`.

5. **Storage connection string is a plain shared-key string**, not a Key Vault reference — worked immediately as a Container Apps secret, no identity wiring needed (unlike SQL).

6. **API CORS (`Program.cs`) is a hardcoded per-origin allow-list** — the `Cors__AllowedOrigin` app setting/secret that exists on both the old App Service and the new Container App is dead code, never actually read into the CORS policy. Adding a client domain always means a code change + rebuild + redeploy, not a config change.

7. **Blob Storage CORS is a completely separate, independent config from the API's CORS** — it governs the browser's *direct* PUT to the SAS URL returned by `/api/uploads/presign`, and is capped at **5 rules total** on the storage account. Hit the cap immediately when adding the new client domain; two existing rules were already dead (one with a typo — `ttps://...` missing the `h` — and one with a trailing slash on the origin, which never matches a real `Origin` header) and got cleaned up to make room. Current rules on `stcontestphotos1234`: `localhost:5173`, `mylandingpage-woad.vercel.app`, `preparateygana.com`, `www.preparateygana.com`.

8. **Vercel's dashboard `VITE_API_URL` (Production environment) silently overrides the repo's `.env.production` file** at build time — it was set 292 days ago to the old App Service URL and kept winning even after the file was correctly updated and pushed. Fix: `vercel env rm` the stale one, `vercel env add` the correct one, then `vercel --prod` to force a fresh build (env var changes don't retroactively affect already-built deployments).

---

## Verified working (2026-08-19)

- `GET /health` → `200`
- `GET /dbcheck` → `connected`
- `GET /api/contests/alpo-2026` → real production data
- `POST /api/uploads/presign` → valid SAS URL; actually `PUT` a test file to it → `201` (then deleted)
- CORS preflight from `https://www.preparateygana.com` → API: `204` with correct `Access-Control-Allow-Origin`; Blob Storage: `200` with correct `Access-Control-Allow-Origin`
- Live production bundle at `www.preparateygana.com` confirmed to embed the Container App URL, zero references to the old App Service URL

---

## Not yet done (deliberately deferred, see `NEW-CLIENT-CHECKLIST.md` §0 and `Plan.md` step 7)

- **Old App Service `contest-api` is still running**, untouched, unused — decommission only after an explicit go-ahead.
- **`AZURE_WEBAPP_PUBLISH_PROFILE` GitHub secret is now unused** but not deleted.
- **`ContestApi/publishProfile.xml` is still committed in git history with plaintext SQL admin credentials** — flagged earlier, not rotated or scrubbed as part of this migration.
- `Cors__AllowedOrigin` dead-code cleanup (make CORS config-driven instead of hardcoded) — optional refactor, not done.
