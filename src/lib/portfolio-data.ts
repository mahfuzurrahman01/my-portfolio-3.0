/**
 * ─────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — single source of truth
 * ─────────────────────────────────────────────────────────────────
 *
 *  Real content lives in `src/data/portfolio.json` — edit that file
 *  (or this one for the Experience section) and the site updates.
 *
 *  Sections mapped to UI:
 *    profile        → hero card
 *    skills         → Skills bento tile + /skills page
 *    experience     → Experience featured bento tile + /experience page
 *    projects       → Projects bento tile + /projects page
 *    extensions     → sub-section on /projects + /extensions/[slug] page
 *    education      → /trail page + footer on Experience tile
 *    certifications → /trail page
 *    blog           → Blogs bento tile + /blog page (fetched from dev.to)
 *
 *  EXPERIENCE schema (kept rich for /experience detail route):
 *    { slug, role, company, range, tag, summary, bullets[], projects[] }
 *
 *  To add a new icon for skills mapping, edit `SKILL_ICON_MAP` in
 *  src/components/portfolio/skillIcons.tsx.
 * ─────────────────────────────────────────────────────────────────
 */

import data from "@/data/portfolio.json";
import { siteConfig } from "@/config/site";

/* ---------- Profile / socials --------------------------------- */

export const profile = {
  name: data.profile.name,
  shortName: siteConfig.altNames[1] ?? data.profile.name.split(" ")[0],
  title: data.profile.title,
  years: siteConfig.yearsExperience,
  location: `${siteConfig.location.city}, ${siteConfig.location.country}`,
  email: data.profile.email,
  github: data.socials.github,
  linkedin: data.socials.linkedin,
  x: data.socials.x,
  devto: data.socials.devto,
  calLink: siteConfig.calLink,
  avatar: siteConfig.avatar,
  bio: data.profile.bio,
  headlineTags: data.profile.headlineTags,
};

/* ---------- Skills (JSON-driven) ------------------------------ */

export type Skill = { name: string; icon: string; type: "svg" | "emoji" };
export type SkillGroup = { title: string; skills: Skill[] };

export const skillGroups = data.skills as SkillGroup[];

/* ---------- Experience (kept from resume, hand-curated) ------- */

export const experience = [
  {
    slug: "esap",
    role: "Software Developer — Full-Stack & AI",
    company: "ESAP",
    range: "Dec 2024 – Now",
    tag: "Current",
    summary:
      "Architecting AI-driven ERP/HR frontend on microservices. Gemini + N8N workflows cut HR processing ~60%.",
    bullets: [
      "Architecting scalable frontend systems for AI-driven ERP and HR platforms using React, TypeScript, and Node.js across a microservices backend.",
      "Integrated agentic AI workflows using Gemini and N8N, cutting manual HR processing time by ~60% across targeted modules.",
      "Aligned frontend component architecture with RESTful API contracts, reducing integration bugs by keeping service boundaries explicit.",
    ],
    projects: [
      {
        name: "HR Agent Hub",
        brief:
          "Internal AI assistant that triages HR tickets via N8N + Gemini agent workflows.",
        tech: ["React", "TypeScript", "N8N", "Gemini"],
      },
      {
        name: "ERP Workflow Studio",
        brief: "Visual node-graph editor for assembling cross-module ERP automations.",
        tech: ["Next.js", "Zustand", "React Flow"],
      },
      {
        name: "Microservice Console",
        brief: "Unified observability dashboard for the microservice mesh.",
        tech: ["React", "Node.js", "REST"],
      },
    ],
  },
  {
    slug: "zeigen-health",
    role: "Frontend Developer",
    company: "Zeigen Health",
    range: "Jan 2023 – Nov 2024",
    tag: "Full-time",
    summary:
      "Built HIPAA-conscious digital therapeutics on Next.js + React Native. JWT auth, RTK Query state.",
    bullets: [
      "Built a digital therapeutics platform serving healthcare users using Next.js, TypeScript, and AWS in a regulated environment.",
      "Developed cross-platform React Native mobile features deployed to production on iOS and Android.",
      "Designed structured state management with Redux / RTK Query, reducing redundant API calls and improving data consistency.",
      "Implemented secure JWT-based authentication and HIPAA-conscious data handling for patient-facing features.",
    ],
    projects: [
      {
        name: "Therapy Companion App",
        brief: "Cross-platform mobile app for patient-side therapy tracking.",
        tech: ["React Native", "Redux", "TypeScript"],
      },
      {
        name: "Clinician Web Portal",
        brief: "HIPAA-aware web dashboard for clinicians monitoring patient progress.",
        tech: ["Next.js", "RTK Query", "AWS"],
      },
      {
        name: "Secure Auth Gateway",
        brief: "JWT-based auth layer with role-based clinical data access.",
        tech: ["Node.js", "JWT", "TypeScript"],
      },
    ],
  },
  {
    slug: "calcite-x",
    role: "Frontend Developer Intern",
    company: "Calcite-X",
    range: "Nov 2022 – Jan 2023",
    tag: "Intern",
    summary:
      "Shipped CRM dashboards and a reusable React/Next.js component library used across internal products.",
    bullets: [
      "Built CRM dashboards and a reusable component library with React.js and Next.js, adopted across multiple internal product screens.",
      "Implemented data visualization features and front-end optimizations that measurably improved perceived load performance.",
    ],
    projects: [
      {
        name: "CRM Insights Dashboard",
        brief: "Internal CRM dashboard with charts and real-time KPI cards.",
        tech: ["React", "Next.js", "Recharts"],
      },
      {
        name: "Component Library v1",
        brief: "Shared Storybook-driven design system used across products.",
        tech: ["React", "Storybook", "Tailwind"],
      },
    ],
  },
  {
    slug: "freelance",
    role: "Freelance Web Developer",
    company: "Upwork · Self-employed",
    range: "2019 – 2022",
    tag: "Freelance",
    summary:
      "Started independent on Upwork — logos, Figma UI designs, and WordPress sites for clients worldwide.",
    bullets: [
      "Designed brand logos and identity packs for small businesses and personal brands.",
      "Crafted UI/UX mockups and high-fidelity designs in Figma for web and mobile clients.",
      "Built responsive WordPress websites end-to-end — theme customization, plugins, and deployment.",
      "Managed scope, communication and delivery across 30+ Upwork contracts.",
    ],
    projects: [
      {
        name: "Brand Logo Packs",
        brief: "Identity systems for startups and personal brands.",
        tech: ["Illustrator", "Figma", "Branding"],
      },
      {
        name: "Figma UI Mockups",
        brief: "Hi-fi design files for web and mobile client projects.",
        tech: ["Figma", "UI/UX", "Prototyping"],
      },
      {
        name: "WordPress Sites",
        brief: "Themed, plugin-enabled WordPress builds for agency clients.",
        tech: ["WordPress", "PHP", "Elementor"],
      },
    ],
  },
];

/* ---------- Projects (JSON) ----------------------------------- */

export const projects = data.projects;
export type Project = (typeof projects)[number];

/* ---------- Extensions (JSON) --------------------------------- */

export const extensions = data.extensions;
export type Extension = (typeof extensions)[number];

/* ---------- Education + certifications (JSON, normalised) ----- */

export const education = data.education.map((e) => ({
  id: e.id,
  degree: e.degree,
  school: e.institution,
  location: e.location,
  range: e.period,
  gpa: "gpa" in e ? e.gpa : undefined,
  description: e.description,
  achievements: "achievements" in e ? e.achievements : undefined,
}));

export const certifications = data.certifications;
export type Certification = (typeof certifications)[number];

/* ---------- Blog (dev.to integration) ------------------------- */

export const blogConfig = data.blog;

export type DevtoArticle = {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
};

/**
 * Fetch latest dev.to articles for the configured user.
 * Server-only. Revalidates hourly so build doesn't re-trigger constantly.
 */
export async function getDevtoArticles(limit = 20): Promise<DevtoArticle[]> {
  try {
    const res = await fetch(
      `${blogConfig.apiUrl}&per_page=${limit}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as DevtoArticle[];
    return json;
  } catch {
    return [];
  }
}
