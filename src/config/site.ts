/**
 * ─────────────────────────────────────────────────────────────────
 *  SITE CONFIG — the only file you must edit for SEO / branding
 * ─────────────────────────────────────────────────────────────────
 *
 *  Content (experience, projects, skills, …) lives in
 *  `src/data/portfolio.json`. This file holds everything the site
 *  needs *around* that content: domain, metadata, social handles,
 *  OG image copy, structured data.
 *
 *  New here? Do these 4 things:
 *    1. Set NEXT_PUBLIC_SITE_URL in .env.local (or edit `url` below)
 *    2. Fill `src/data/portfolio.json` with your own content
 *    3. Replace `avatar` with your own image URL
 *    4. Update `keywords`, `location`, `currentEmployer` below
 * ─────────────────────────────────────────────────────────────────
 */

import data from "@/data/portfolio.json";

/** Canonical origin, no trailing slash. Env var wins so previews work. */
const url = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mafuzur.com"
).replace(/\/$/, "");

export const siteConfig = {
  url,

  /* ---- Identity ---------------------------------------------- */
  name: data.profile.name,
  /** Other spellings of your name — helps people who search it wrong. */
  altNames: ["Mahfuzur Rahman", "Mafuz"],
  /** Short handle used in the title template, e.g. "%s · swe-mafuz". */
  handle: "swe-mafuz",
  role: data.profile.title,
  /** Punchier role used in OG image + social card titles. */
  ogRole: "Software Developer & AI Builder",
  email: data.profile.email,
  bio: data.profile.bio,

  /* ---- Where you are ----------------------------------------- */
  location: { city: "Dhaka", country: "Bangladesh" },
  yearsExperience: 4,
  currentEmployer: "ESAP",

  /* ---- Links -------------------------------------------------- */
  socials: data.socials,
  /** X / Twitter handle for the summary card, with the @. */
  twitterHandle: "@mahfuzur_kaizen",
  /** Booking link shown on the hero card. Set to "" to hide. */
  calLink: "https://cal.com/swe-mafuzur",

  /* ---- Images ------------------------------------------------- */
  /** Portrait: hero card, favicon, apple-icon. Any public URL works. */
  avatar:
    "https://res.cloudinary.com/dka0q8f82/image/upload/c_fill,g_face,z_0.5,ar_3:4,w_900,q_auto,f_auto/v1778646505/WhatsApp_Image_2026-05-12_at_23.02.53_pvo31f.jpg",
  /** Square crop of the same portrait, used by icon.tsx / apple-icon.tsx. */
  avatarSquare:
    "https://res.cloudinary.com/dka0q8f82/image/upload/c_fill,g_face,z_1,ar_1:1,w_384,q_auto,f_png/v1778646505/WhatsApp_Image_2026-05-12_at_23.02.53_pvo31f.jpg",

  /* ---- OG image copy (src/app/opengraph-image.tsx) ------------ */
  /** Tech pills printed on the generated 1200×630 social card. */
  ogTech: ["React", "Next.js", "TypeScript", "Node.js", "React Native", "AI / Agentic"],

  /* ---- SEO keywords ------------------------------------------- */
  keywords: [
    "Mafuzur Rahman",
    "Mahfuzur Rahman",
    "Mafuzur Rahman portfolio",
    "Mahfuzur Rahman portfolio",
    "Mafuzur Rahman software developer",
    "Mahfuzur Rahman software developer",
    "Mafuzur Rahman frontend developer",
    "Mafuzur Rahman full stack developer",
    "Mafuzur Rahman AI engineer",
    "Mafuzur Rahman React developer",
    "Mafuzur Rahman Next.js developer",
    "Mafuzur Rahman Dhaka",
    "Mafuzur Rahman Bangladesh",
    "software developer Bangladesh",
    "frontend developer Dhaka",
    "React developer Bangladesh",
    "Next.js developer",
    "TypeScript engineer",
    "Node.js engineer",
    "React Native developer",
    "AI engineer",
    "agentic AI developer",
    "Gemini API developer",
    "OpenAI developer",
    "technical writer",
    "mafuzur.com",
  ],

  /** Topics used in the Person JSON-LD `knowsAbout` field. */
  knowsAbout: [
    "Software Development",
    "Full-Stack Engineering",
    "Frontend Development",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "React Native",
    "Artificial Intelligence",
    "Agentic AI",
    "Gemini API",
    "OpenAI API",
    "Technical Writing",
  ],

  /** Routes listed in sitemap.xml. Add new pages here. */
  routes: ["", "/experience", "/skills", "/projects", "/trail", "/blog"],
} as const;

/** First name / last name split used by OpenGraph profile metadata. */
const [firstName, ...rest] = siteConfig.name.split(" ");
export const nameParts = { firstName, lastName: rest.join(" ") };

/** Long description reused by metadata + JSON-LD. */
export const siteDescription = `${siteConfig.name} (also spelled ${siteConfig.altNames[0]}) — ${siteConfig.role.toLowerCase()} from ${siteConfig.location.city}, ${siteConfig.location.country} with ${siteConfig.yearsExperience}+ years shipping AI-powered web and mobile products. ${siteConfig.bio}`;

export type SiteConfig = typeof siteConfig;
