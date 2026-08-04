# ICG backend (PHP + MySQL)

Plain PHP (no framework) + PDO/MySQL. Public read endpoints for the storefront,
bearer-token-protected write endpoints for the admin panel.

## Local setup

1. Create a MySQL database and import `schema.sql`.
2. Copy `config.local.php.example` to `config.local.php` and fill in your DB
   credentials, `ALLOWED_ORIGINS` (your frontend's origin, e.g.
   `http://localhost:5173`), and the admin username/password to create.
3. Run `seed.php` once (visit it in the browser, or `php seed.php`). It
   creates the admin account and imports the existing 19-projector catalog
   from `seed_products.json` (only if `products` is empty). **Delete
   `seed.php` after running it** — leaving it live lets anyone reset the
   admin password.
4. Point PHP's built-in server or your local Apache/Nginx at this folder.

## Endpoints

- `GET /api/products.php` — list all products.
- `GET /api/products.php?id=5` — one product + its gallery images.
- `POST /api/products.php` — create (multipart form-data: text fields from
  `schema.sql`'s `products` columns, `main_image` file, `gallery[]` files).
  Requires `Authorization: Bearer <token>`.
- `POST /api/products.php` with `_method=PUT` and `id` — update. Same auth.
- `DELETE /api/products.php?id=5` — delete a product (and its images). Same
  auth.
- `DELETE /api/product_image.php?id=7` — delete a single gallery image.
- `POST /api/login.php` — `{username, password}` → `{token}` (valid 7 days).
- `POST /api/logout.php` — invalidates the current token.

## Deploying to a free host (InfinityFree) — frontend + backend, same origin

InfinityFree gives a free PHP + MySQL hosting plan with persistent file
storage, which is enough for this small catalog. **Both the frontend and
this backend are served from the same InfinityFree site** — not split
across two hosts. This matters for more than convenience: InfinityFree's
network puts a one-time JavaScript "are you a real browser" challenge in
front of requests it's unsure about. A normal page load solves it
transparently and gets a cookie that's remembered for a few hours, but a
cross-origin `fetch()` from a different domain can't execute that
challenge, so it silently fails (shows up in the browser as a CORS error).
Same-origin `fetch()` calls ride along on the cookie from the page load and
go through fine.

1. Sign up, create a hosting account and a MySQL database from their panel.
2. Upload `backend/` to `htdocs/backend/` via their File Manager or FTP.
3. In their control panel, set the DB env vars if supported, otherwise create
   `config.local.php` there directly (don't commit real credentials to git).
   Set `ALLOWED_ORIGINS` to your site's own origin (e.g.
   `https://yoursite.ct.ws`).
4. Run `schema.sql` via phpMyAdmin (linked from their panel).
5. Visit `https://yoursite.ct.ws/backend/seed.php` once, then delete
   `seed.php` from the File Manager.
6. On your local machine, set `VITE_API_URL` (in `.env`/`.env.local`) to
   `https://yoursite.ct.ws/backend` and run `npm run build` — Vite bakes this
   in at build time, so it must be set before building, and re-set/rebuilt
   any time the site's domain changes.
7. Upload the contents of the generated `dist/` folder (including the
   `.htaccess` it contains, which makes client-side routes like `/headphones`
   work on a hard refresh) into `htdocs/`, alongside the `backend/` folder
   from step 2 — so `htdocs/index.html`, `htdocs/assets/...` and
   `htdocs/backend/...` all sit next to each other.

Re-deploying the frontend after a change means repeating steps 6–7 (build
locally, re-upload `dist/`) — there's no git-push-to-deploy here since
everything lives on one shared-hosting account.
