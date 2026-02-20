# LumiLogic Frontend (Client Handover)

Production frontend for LumiLogic website + admin CMS.

- Framework: Next.js 16 (App Router)
- Styling: Tailwind CSS v4
- State: Zustand
- HTTP client: Axios
- API dependency: external backend (`/api/v1`)

## What Is Included

### Public Website
- Dynamic header + mega menu from Menu API
- Dynamic footer links from Menu API
- Dynamic content pages by slug (`/[slug]`)
- Category fallback landing for unmatched page slugs
- Static pages:
  - `/about`
  - `/enquiry`
- Enquiry form integrated with backend API
- Global route transition loading animation
- Mobile navigation drawer

### Admin Panel
- Protected routes (`/admin/*`) using proxy + token cookie
- Login page (`/admin/login`)
- Categories CRUD
- Pages CRUD with block editor
- Enquiries management:
  - list + filters + search + pagination
  - detail view
  - status update
- Admin mobile sidebar

## Route Map

### Public
- `/` Home
- `/about` About page
- `/enquiry` Enquiry page
- `/:slug` Dynamic CMS page (with category fallback)

### Admin
- `/admin/login`
- `/admin/pages`
- `/admin/pages/new`
- `/admin/pages/[pageId]`
- `/admin/categories`
- `/admin/enquiries`

## Backend API Contract Required

The frontend expects `NEXT_PUBLIC_API_BASE_URL` to already include `/api/v1`.

Example:
`https://api.yourdomain.com/api/v1`

### Public endpoints used
- `GET /menu`
- `GET /pages/:slug`
- `POST /enquiries`
- `GET /uploads/sign` (for signed Cloudinary uploads in admin editors)

### Admin endpoints used
- `POST /admin/login`
- `GET /admin/pages`
- `POST /admin/pages`
- `GET /admin/pages/:id`
- `PUT /admin/pages/:id`
- `DELETE /admin/pages/:id`
- `GET /admin/categories`
- `POST /admin/categories`
- `PUT /admin/categories/:id`
- `DELETE /admin/categories/:id`
- `GET /admin/enquiries?page=1&limit=10&status=&search=`
- `GET /admin/enquiries/:enquiryId`
- `PATCH /admin/enquiries/:enquiryId/status` (fallback supported: `PUT`)

## Environment Variables

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1
```

No other frontend env variable is required currently.

## Local Development

### 1. Prerequisites
- Node.js 20 LTS (recommended)
- npm 10+
- Running backend API

### 2. Install and run

```bash
npm install
npm run dev
```

Open:
- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/login`

## Production Deployment

### Option A: Vercel (recommended)

1. Import this repository into Vercel.
2. Set environment variable:
   - `NEXT_PUBLIC_API_BASE_URL`
3. Build command: `npm run build`
4. Output: default Next.js output
5. Deploy.

### Option B: Node server / VM

```bash
npm ci
npm run build
npm run start
```

Default server port is `3000`.
Use reverse proxy (Nginx/Cloudflare/etc.) for domain + TLS.

## Admin Authentication Notes

- Login stores token in:
  - `localStorage` (`admin_token`, `accessToken`)
  - cookie (`admin_token`)
- `src/proxy.js` protects `/admin/*` routes using the cookie.
- If token expires, Axios interceptor logs user out and redirects to `/admin/login`.

## Project Structure (Important Files)

```text
src/
  app/
    (site)/
    admin/
    layout.jsx
  components/
    layout/
    blocks/
    enquiry/
    admin/
    common/RouteLoader.jsx
  lib/
    api.js
    adminAuth.js
    cloudinary.js
  proxy.js
```


## Known Build/Runtime Notes

- The app uses Google-hosted Geist fonts via `next/font/google`.
- Build environments must allow outbound access to:
  - `fonts.googleapis.com`
  - `fonts.gstatic.com`

If blocked, build may fail with font fetch errors.

## Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - run production server

---
For operational handover, provide this frontend repo together with the matching backend API and environment credentials.
