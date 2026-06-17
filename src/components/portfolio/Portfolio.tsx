"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Activity,
  Atom,
  Award,
  Boxes,
  Briefcase,
  BookOpen,
  Calendar,
  Code,
  Database,
  Folder,
  Languages,
  Mail,
  Network,
  Plug,
  Share2,
  Sparkles,
  Triangle,
  Users,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  profile,
  skills,
  projects,
  experience,
  events,
  blogs,
} from "@/lib/portfolio-data";

const ICONS = {
  code: Code,
  atom: Atom,
  triangle: Triangle,
  database: Database,
  boxes: Boxes,
  network: Network,
  share2: Share2,
  wrench: Wrench,
  activity: Activity,
  plug: Plug,
  users: Users,
  languages: Languages,
} as const;

type SkillTab = keyof typeof skills;

const TABS: { key: SkillTab; label: string }[] = [
  { key: "software", label: "Software" },
  { key: "expertise", label: "Expertise" },
  { key: "language", label: "Language" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const tabContent: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

export default function Portfolio() {
  const [tab, setTab] = useState<SkillTab>("software");
  const items = skills[tab];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto flex h-full max-w-6xl flex-col gap-3 px-6 py-5 lg:gap-4 lg:py-6"
    >
      {/* Header */}
      <motion.div
        variants={item}
        className="flex items-end justify-between"
      >
        <h1 className="text-3xl font-semibold tracking-tight text-foreground/90 lg:text-4xl">
          Portfolio
        </h1>
        <span className="text-xs text-foreground/50">{profile.location}</span>
      </motion.div>

      {/* Hero row */}
      <section className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_1fr] lg:gap-4">
        <motion.div variants={item}>
          <Card className="flex h-full flex-col justify-between gap-3 p-5">
            <div className="space-y-3">
              <h2 className="flex items-center gap-2 text-xl font-medium leading-tight lg:text-2xl">
                <motion.span
                  aria-hidden
                  className="inline-block origin-[70%_70%]"
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{
                    duration: 1.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 1.2,
                  }}
                >
                  👋
                </motion.span>
                Hello, I&apos;m {profile.shortName}.
              </h2>
              <p className="text-sm leading-relaxed text-foreground/70 lg:text-[15px]">
                I&apos;m a <b className="text-foreground">{profile.title}</b>{" "}
                with {profile.years}+ years of experience. {profile.bio}
              </p>
            </div>
            <a
              href={profile.calLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-sm hover:bg-foreground/10"
            >
              <Calendar size={14} /> Book a call
            </a>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="relative h-full min-h-[160px] overflow-hidden p-0">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority
            />
            <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur">
              {profile.name}
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Bento grid — Experience featured */}
      <section className="grid min-h-0 flex-1 grid-cols-4 grid-rows-4 gap-3 lg:gap-4">
        {/* Experience — FEATURED, top-left big */}
        <BentoTile
          className="col-span-2 row-span-3"
          title="Experience"
          icon={<Briefcase size={16} className="text-emerald-400" />}
          href="#experience"
          accent="emerald"
          featured
          badge={
            <span className="ml-1 inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
              {experience.length} roles · {profile.years}+ yrs
            </span>
          }
        >
          <ol className="relative flex h-full flex-col justify-between gap-3 pl-4">
            <span className="absolute left-[5px] top-1 bottom-1 w-px bg-gradient-to-b from-emerald-400/60 via-emerald-400/20 to-transparent" />
            {experience.map((e, i) => (
              <li key={e.company} className="relative">
                <span
                  className={cn(
                    "absolute -left-[14px] top-1.5 h-2.5 w-2.5 rounded-full border-2",
                    i === 0
                      ? "border-emerald-400 bg-emerald-400/40 shadow-[0_0_0_4px_rgba(52,211,153,0.15)]"
                      : "border-foreground/40 bg-background",
                  )}
                />
                <div className="flex items-baseline justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold">
                        {e.role}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide",
                          i === 0
                            ? "bg-emerald-400/15 text-emerald-400"
                            : "bg-foreground/8 text-foreground/55",
                        )}
                      >
                        {e.tag}
                      </span>
                    </div>
                    <div className="truncate text-[11px] text-foreground/60">
                      {e.company} · {e.range}
                    </div>
                  </div>
                </div>
                <p className="mt-1 line-clamp-1 text-[11px] text-foreground/55">
                  {e.summary}
                </p>
              </li>
            ))}
          </ol>
        </BentoTile>

        {/* Skills — top-right */}
        <BentoTile
          className="col-span-2 row-span-2"
          title="Skills"
          icon={<Sparkles size={14} className="text-violet-400" />}
          href="#skills"
          accent="violet"
        >
          <div className="flex h-full flex-col gap-3">
            <div className="relative flex gap-1 rounded-lg bg-foreground/5 p-1">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "relative flex-1 rounded-md px-2 py-1 text-xs",
                    tab === t.key
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground",
                  )}
                >
                  {tab === t.key && (
                    <motion.span
                      layoutId="skill-tab-pill"
                      className="absolute inset-0 rounded-md bg-foreground/10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                variants={tabContent}
                initial="hidden"
                animate="show"
                exit="exit"
                className="grid grid-cols-3 gap-2"
              >
                {items.map((s) => {
                  const Icon = ICONS[s.icon as keyof typeof ICONS] ?? Sparkles;
                  return (
                    <span
                      key={s.name}
                      className="flex items-center gap-2 rounded-lg border border-foreground/10 bg-foreground/[0.03] px-2.5 py-2 text-xs"
                    >
                      <Icon size={14} className="text-foreground/60" />
                      <span className="truncate">{s.name}</span>
                    </span>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </BentoTile>

        {/* Projects */}
        <BentoTile
          className="col-span-1 row-span-2"
          title="Projects"
          icon={<Folder size={14} className="text-cyan-400" />}
          href="#projects"
          accent="cyan"
        >
          <ul className="flex flex-col gap-2">
            {projects.map((p) => (
              <li key={p.name} className="min-w-0">
                <div className="truncate text-[12px] font-medium">{p.name}</div>
                <div className="truncate text-[10px] text-foreground/55">
                  {p.note}
                </div>
              </li>
            ))}
          </ul>
        </BentoTile>

        {/* Events */}
        <BentoTile
          className="col-span-1 row-span-2"
          title="Events"
          icon={<Award size={14} className="text-amber-400" />}
          href="#events"
          accent="amber"
        >
          <ul className="flex flex-col gap-2">
            {events.map((ev) => (
              <li key={ev.name} className="min-w-0">
                <div className="truncate text-[12px] font-medium">{ev.name}</div>
                <div className="truncate text-[10px] text-foreground/55">
                  {ev.role} · {ev.year}
                </div>
              </li>
            ))}
          </ul>
        </BentoTile>

        {/* Blogs */}
        <BentoTile
          className="col-span-2 row-span-1"
          title="Blogs"
          icon={<BookOpen size={14} className="text-rose-400" />}
          href="#blog"
          accent="rose"
        >
          <ul className="grid grid-cols-2 gap-2">
            {blogs.map((b) => (
              <li
                key={b.title}
                className="min-w-0 rounded-lg border border-foreground/10 bg-foreground/[0.03] px-3 py-1.5"
              >
                <div className="truncate text-[12px] font-medium">{b.title}</div>
                <div className="truncate text-[10px] text-foreground/55">
                  {b.meta}
                </div>
              </li>
            ))}
          </ul>
        </BentoTile>
      </section>

      {/* Contact bar */}
      <motion.div variants={item}>
        <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
          <span className="text-xs text-foreground/55">
            Let&apos;s build something.
          </span>
          <div className="flex flex-wrap gap-2">
            <ContactPill
              href={`mailto:${profile.email}`}
              icon={<Mail size={13} />}
              label="Email"
            />
            <ContactPill
              href={profile.github}
              icon={<GithubGlyph />}
              label="GitHub"
            />
            <ContactPill
              href={profile.linkedin}
              icon={<LinkedInGlyph />}
              label="LinkedIn"
            />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

type AccentKey = "emerald" | "violet" | "cyan" | "amber" | "rose";

const ACCENTS: Record<
  AccentKey,
  { border: string; bg: string; shadow: string; arrow: string }
> = {
  emerald: {
    border: "border-emerald-400/40",
    bg: "bg-gradient-to-br from-emerald-400/[0.10] via-foreground/[0.02] to-transparent",
    shadow: "shadow-emerald-400/10",
    arrow:
      "border-emerald-400/30 bg-emerald-400/10 hover:bg-emerald-400/20 hover:text-emerald-400",
  },
  violet: {
    border: "border-violet-400/35",
    bg: "bg-gradient-to-br from-violet-400/[0.10] via-foreground/[0.02] to-transparent",
    shadow: "shadow-violet-400/10",
    arrow:
      "border-violet-400/30 bg-violet-400/10 hover:bg-violet-400/20 hover:text-violet-400",
  },
  cyan: {
    border: "border-cyan-400/35",
    bg: "bg-gradient-to-br from-cyan-400/[0.10] via-foreground/[0.02] to-transparent",
    shadow: "shadow-cyan-400/10",
    arrow:
      "border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/20 hover:text-cyan-400",
  },
  amber: {
    border: "border-amber-400/35",
    bg: "bg-gradient-to-br from-amber-400/[0.10] via-foreground/[0.02] to-transparent",
    shadow: "shadow-amber-400/10",
    arrow:
      "border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 hover:text-amber-400",
  },
  rose: {
    border: "border-rose-400/35",
    bg: "bg-gradient-to-br from-rose-400/[0.10] via-foreground/[0.02] to-transparent",
    shadow: "shadow-rose-400/10",
    arrow:
      "border-rose-400/30 bg-rose-400/10 hover:bg-rose-400/20 hover:text-rose-400",
  },
};

function BentoTile({
  className,
  title,
  icon,
  href,
  accent,
  featured,
  badge,
  children,
}: {
  className?: string;
  title: string;
  icon?: React.ReactNode;
  href: string;
  accent?: AccentKey;
  featured?: boolean;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  const a = accent ? ACCENTS[accent] : null;
  return (
    <motion.div variants={item} className={cn("min-h-0", className)}>
      <div
        className={cn(
          "relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border p-4 shadow-sm backdrop-blur lg:p-5",
          a
            ? `${a.border} ${a.bg} ${a.shadow}`
            : "border-foreground/10 bg-foreground/[0.02]",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {icon}
            <h3
              className={cn(
                "font-medium",
                featured ? "text-base" : "text-sm",
              )}
            >
              {title}
            </h3>
            {badge}
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
        <a
          href={href}
          aria-label={`Open ${title}`}
          className={cn(
            "absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full border text-foreground/60 transition hover:text-foreground",
            a
              ? a.arrow
              : "border-foreground/10 bg-foreground/[0.04] hover:bg-foreground/10",
          )}
        >
          <ArrowUpRight size={13} />
        </a>
      </div>
    </motion.div>
  );
}

function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-foreground/10 bg-foreground/[0.02] shadow-sm backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}

function GithubGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55 0-.27-.01-1-.02-1.97-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.41-5.27 5.7.41.36.78 1.07.78 2.16 0 1.56-.02 2.82-.02 3.2 0 .31.21.67.8.55A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
}

function ContactPill({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1.5 text-xs hover:bg-foreground/10"
    >
      {icon} {label}
    </a>
  );
}
