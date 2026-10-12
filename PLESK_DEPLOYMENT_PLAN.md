# Plesk Deployment Plan — Puma Punku Viz (pukupku.cucorn.com)

> **For Claude in Chrome** — use this document step-by-step to drive the Plesk Web UI.
> The build is already complete in `dist/`. This is a **pure static site** — no PHP, no database, no Node.js runtime needed.

## What we're deploying

```
dist/                        ← upload the CONTENTS of this folder
├── index.html               (0.7 KB)
└── assets/
    ├── index-*.css          (~11 KB)
    ├── index-*.js           (~974 KB — React + Three.js + R3F)
    └── data/
        └── vranich_matrix.json  (site data)
```

Total payload: **~976 KB** — no compression needed.

---

## Step 1 — Create the domain/subdomain in Plesk

1. Log into Plesk: `https://<VPS_IP>:8443`
2. Go to **Websites & Domains** → **Create Domain or Subdomain**
3. **Type:** Subdomain
4. **Domain name:** `pukupku` (or whatever the chosen host is, e.g. `pumapunku`)
5. **Parent domain:** `cucorn.com`
6. **PHP version:** *not needed* — leave default (no PHP)
7. **Create an email account:** No
8. Click **Create**

Plesk will allocate `public_html/` for the new domain.

---

## Step 2 — Upload the static files

### Option A: File Manager (preferred for first deploy)

1. In Plesk, click the new domain to enter its dashboard
2. **Files** → navigate to the domain's document root
   - Usually: `~/htdocs/pukupku.cucorn.com/` or `~/public_html/` (check the "Document Root" path shown in the domain settings)
3. Click **Upload** (or drag-and-drop) each file from `dist/`:
   - `index.html` → root
   - `assets/` → root (upload the whole folder)
4. Verify the tree matches:
   ```
   <document-root>/
   ├── index.html
   └── assets/
       ├── index-*.css
       ├── index-*.js
       └── data/
           └── vranich_matrix.json
   ```

### Option B: SFTP via terminal (alternative)

```bash
# From the local machine, after building:
cd /Users/aiadmin/qwen/puma-punku-viz
rsync -avz --delete dist/ <user>@<VPS_IP>:/home/<plesk_user>/htdocs/<domain>/
```

---

## Step 3 — Plesk domain settings

Go to **Websites & Domains** → click the domain → check these settings:

| Setting              | Value                                        |
|:---------------------|:---------------------------------------------|
| **Access for:**       | *any* (public site)                         |
| **Enable PHP:**       | **No** (or leave default — not used)        |
| **Enable CGI:**        | No                                           |
| **Enable FTP:**        | Optional — disable after upload complete     |
| **Web Server:**        | Apache (default) or nginx                    |
| **SSL/TLS:**          | Click **Let's Encrypt** → issue a free cert  |
| **HTTP → HTTPS:**      | Enable redirect                              |
| **Cache:**             | Static assets → cache 7 days                 |

### SSL (Let's Encrypt)

1. In the domain dashboard, scroll to **SSL/TLS Certificates**
2. Click **Issue a free certificate by Let's Encrypt**
3. Fill in the requested fields if prompted (usually just the domain name)
4. **Force HTTPS:** Enable

---

## Step 4 — Verify

1. Open `https://pukupku.cucorn.com` (or whichever host) in an incognito window
2. Expected: the onboarding overlay appears with the "Enter the Site" button
3. Click through: the 3D scene loads, showing the Puma Punku reconstruction
4. Toggle **Ruins ↔ Reconstructed**
5. Click any block → info panel appears
6. If the 3D scene is blank/black, check browser DevTools → Console for errors
   - If 404 on `.js` or `.css`, the asset paths are wrong — verify `base: './'` was used in the build

---

## Troubleshooting

| Symptom                          | Likely cause | Fix                                              |
|:---------------------------------|:-------------|:-------------------------------------------------|
| 404 on `assets/index-*.js`      | File not in right location | Check dist contents were uploaded to the correct document root path |
| 3D scene loads but is black      | WebGL not available / JS error | Check browser console; ensure no mixed content (http → https) |
| `vranich_matrix.json` 404       | `data/` subfolder not uploaded | Re-upload `assets/data/vranich_matrix.json` |
| Site loads at wrong path prefix  | Domain docroot mismatch | Check Plesk "Document Root" setting |
| CORS or mixed-content errors    | HTTP resources over HTTPS page | Issue SSL cert and enable HTTP→HTTPS redirect |

---

## Re-deploying after future changes

```bash
cd /Users/aiadmin/qwen/puma-punku-viz
npm run build          # produces fresh dist/
# then re-upload dist/ contents via Plesk File Manager or rsync
```

The hashed filenames (`index-*.js`) change each build, so always remove old files before uploading new ones to avoid stale assets being served.

---

## Repo state (at time of deploy)

- Branch: `main`
- Build command: `npm run build`
- `base: './'` set in `vite.config.js` — all asset paths are relative
- No backend, no database, no environment variables needed at deploy time
- AGPL-3.0 licensed (see `LICENSE`)
