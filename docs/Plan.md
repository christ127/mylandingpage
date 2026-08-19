# Azure Cost Reduction Migration Plan — Contest API

**Project:** ALPO / Wishbone Contest Landing Page
**Scope:** Contest API, Azure SQL Database, Azure Blob Storage
**Goal:** Move from always-on provisioned resources to scale-to-zero / consumption-based resources to reduce cost during low-traffic and idle periods between campaign activity.

---

## Target Architecture

| Component | Current | Target |
|---|---|---|
| Contest API | Azure App Service (provisioned) | Azure Container Apps (min replicas: 0) |
| Database | Azure SQL Database (provisioned tier) | Azure SQL Database — General Purpose **Serverless** |
| Storage | Azure Blob Storage (Hot tier) | Azure Blob Storage (**Cool** tier + lifecycle policy) |

---

## Migration Steps

### 1. Switch Azure SQL to Serverless tier
- Azure Portal → SQL Database → Compute + storage → change service tier to **General Purpose Serverless**.
- Set min vCores: `0.5`, max vCores: `1–2` (adjust based on observed contest load).
- Set auto-pause delay: `60 min`.
- No schema or connection string changes required — same endpoint, same credentials.
- Expect a few minutes of reconfiguration downtime while the tier change applies.

### 2. Set Blob Storage to Cool tier + lifecycle policy
- Change the storage account's default access tier to **Cool** for the container holding banner/campaign images.
- Add a **Lifecycle Management** rule:
  - Move blobs to Cool after 7 days of no access.
  - Optionally delete after the contest end date.
- No code changes required if blobs are referenced by URL.

### 3. Containerize the Contest API
- Add a multi-stage `Dockerfile` to the API project (same pattern as CaribeWaterProject.Api).
- Listen on the port Container Apps expects (default `8080`, configurable via `ASPNETCORE_URLS`).
- Build and push the image to Azure Container Registry (or GitHub Container Registry to avoid ACR cost).

### 4. Provision the Container Apps environment
- Create a Container Apps Environment.
  - **Note:** this auto-creates a Log Analytics workspace — set retention to **30 days** to minimize its cost.
- Deploy the API as a Container App referencing the image.
- Set **min replicas: 0**, **max replicas: 1–2** — scales to zero and costs nothing when idle.

### 5. Wire up secrets and connection strings
- Move the SQL connection string and Blob Storage connection string into Container Apps **secrets** (or reference Azure Key Vault if already in use).
- Set them as environment variables on the container, matching current API configuration.

### 6. Update DNS / frontend API URL
- Container Apps provides a `*.azurecontainerapps.io` endpoint (or configure a custom domain).
- Update the frontend's API base URL to point to the new endpoint.
- If a custom domain was set on the old App Service, repoint it or reconfigure via Container Apps' custom domain + managed certificate feature.

### 7. Test cold start and cutover
- With min replicas at 0, test a cold request — expect roughly 1–5s cold start for a small .NET API.
- Confirm this doesn't degrade the entry-form UX during a live contest promotion/traffic spike.
- Once verified, decommission the old App Service to stop billing on it.

---

## Notes / Watch-outs
- Do SQL Serverless and Blob tier changes first — config-only, low-risk, can be done independently of the API work.
- Log Analytics workspace cost is easy to miss since it's created automatically with the Container Apps environment.
- Stress-test cold start behavior *before* a live contest push, especially if traffic is driven by a single ad spike rather than steady load.