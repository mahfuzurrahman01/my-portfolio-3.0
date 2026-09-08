# Next.js Portfolio Template

A bento-grid developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4** and **Framer Motion** — content-driven, SEO-complete, deploy-in-10-minutes.

Live example: **[mafuzur.com](https://mafuzur.com)**

---

## What you get

- **Bento home page** — hero card, skills, experience, projects, blog tiles
- **Sub-pages** — `/experience`, `/skills`, `/projects`, `/trail` (education + certifications), `/blog`, `/extensions/[slug]`
- **Single JSON content file** — `src/data/portfolio.json` drives almost everything
- **Auto blog** — pulls your latest [dev.to](https://dev.to) posts at build/ISR time, no CMS
- **Full SEO out of the box** — metadata, canonical URLs, Person + WebSite JSON-LD, `sitemap.xml`, `robots.txt`
- **Generated social images** — 1200×630 OG card, favicon and apple-icon rendered at the edge from your config (no design tool needed)
- **Dark / light mode** with a circular reveal transition
- **Zero backend** — static + ISR, free on Vercel

---

## Quick start

```bash
# 1. Use this template on GitHub ("Use this template" button), then:
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install

# 2. Point the site at your domain
cp .env.example .env.local
# edit .env.local → NEXT_PUBLIC_SITE_URL=https://your-domain.com

# 3. Run it
npm run dev   # http://localhost:3000
```

Requires **Node.js 20+**.

---

## Make it yours

There are exactly **two files** you need to touch.

### 1. `src/data/portfolio.json` — your content

| Key | Shows up in |
| --- | --- |
| `profile` | hero card (name, greeting, rotating roles, bio, tags) |
| `socials` | header/footer icon links + `sameAs` structured data |
| `navigation` | top nav links |
| `experience` | Experience tile + `/experience` |
| `projects` | Projects tile + `/projects` |
| `skills` | Skills tile + `/skills` (grouped) |
| `education` | `/trail` |
| `certifications` | `/trail` |
| `extensions` | `/projects` sub-section + `/extensions/[slug]` detail pages |
| `blog` | dev.to username + API URL for the Blog tile |

### 2. `src/config/site.ts` — your branding and SEO

Domain, alternate name spellings, location, years of experience, avatar URL, X handle, Cal.com link, keywords, JSON-LD topics, and the routes listed in `sitemap.xml`. Every SEO surface reads from here — nothing personal is hardcoded anywhere else.

### Things worth knowing

- **Avatar** — `siteConfig.avatar` (portrait, 3:4) and `siteConfig.avatarSquare` (1:1, used for the favicon/apple-icon) accept any public image URL. A [Cloudinary](https://cloudinary.com) URL with `c_fill,g_face` crops nicely; you can also drop a file into `public/` and use `/me.jpg`.
- **Long-form experience** — `/experience` renders a richer hand-written array at the top of `src/lib/portfolio-data.ts` (with `bullets` and per-role `projects`). Edit that array for the detail page; `portfolio.json` drives the summary tile.
- **Skill icons** — map a skill name to an icon in `SKILL_ICON_MAP` inside `src/components/portfolio/skillIcons.tsx`. Unmapped skills fall back to an emoji.
- **No dev.to account?** Delete the Blog tile from `src/components/portfolio/Portfolio.tsx`, remove `src/app/blog/`, and drop `/blog` from `siteConfig.routes`.
- **Cal.com booking** — set `siteConfig.calLink` to `""` to hide the button.

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx            metadata, JSON-LD, theme bootstrap
│  ├─ page.tsx              bento home
│  ├─ opengraph-image.tsx   generated 1200×630 social card
│  ├─ icon.tsx              generated favicon
│  ├─ apple-icon.tsx        generated iOS icon
│  ├─ sitemap.ts / robots.ts
│  └─ experience|skills|projects|trail|blog|extensions/
├─ components/
│  ├─ portfolio/            Portfolio bento, BackBar, skill icons
│  └─ ui/                   background, gooey text morphing, theme toggle
├─ config/site.ts           ← branding + SEO
├─ data/portfolio.json      ← content
└─ lib/portfolio-data.ts    typed accessors + dev.to fetch
```

---

## Deploy to Vercel

1. Push the repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo → **Deploy** (framework auto-detected, no build settings to change).
3. Project → **Settings → Environment Variables** → add `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com` for Production.
4. Project → **Settings → Domains** → add your domain, then set the DNS records Vercel shows at your registrar (usually an `A` record for the apex and a `CNAME` for `www`).
5. Redeploy so the env var is baked into the metadata.

### After launch — SEO checklist

- [ ] [Google Search Console](https://search.google.com/search-console) → add your domain as a **Domain property** → verify with the DNS `TXT` record
- [ ] Submit `https://your-domain.com/sitemap.xml`
- [ ] Check `https://your-domain.com/robots.txt` and `/opengraph-image` render correctly
- [ ] Validate structured data with the [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Preview your social card on [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Add the same domain to [Bing Webmaster Tools](https://www.bing.com/webmasters) (imports from Search Console in one click)

---

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | dev server with Turbopack |
| `npm run build` | production build |
| `npm start` | serve the production build |
| `npm run lint` | ESLint |

---

## Contributing

Issues and PRs welcome — bug fixes, accessibility improvements, new bento tiles. Keep personal content out of PRs: anything name-specific belongs in `portfolio.json` / `site.ts`, not in components.

## License

[MIT](./LICENSE) — free to use, modify and ship as your own portfolio. Attribution is not required but a ⭐ on the repo is appreciated.
