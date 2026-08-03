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

## Deploying to a free host (InfinityFree)

InfinityFree gives a free PHP + MySQL hosting plan with persistent file
storage, which is enough for this small catalog.

1. Sign up, create a hosting account and a MySQL database from their panel.
2. Upload the whole `backend/` folder via their File Manager or FTP (e.g. to
   `htdocs/backend/`).
3. In their control panel, set the DB env vars if supported, otherwise create
   `config.local.php` there directly (don't commit real credentials to git).
4. Run `schema.sql` via phpMyAdmin (linked from their panel).
5. Visit `https://yoursite.infinityfreeapp.com/backend/seed.php` once, then
   delete `seed.php` from the File Manager.
6. Set `ALLOWED_ORIGINS` to your deployed frontend's origin (e.g. your Vercel
   URL).
7. Point the frontend's `VITE_API_URL` at
   `https://yoursite.infinityfreeapp.com/backend`.

Frontend stays on Vercel (already configured via the repo's `vercel.json`) —
just add the `VITE_API_URL` (and `VITE_WHATSAPP_NUMBER`) environment
variables in the Vercel project settings.
