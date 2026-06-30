"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Briefcase,
  BookOpen,
  Calendar,
  Folder,
  GraduationCap,
  Route,
  Sparkles,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import {
  SiGithub,
  SiX,
  SiDevdotto,
  SiGmail,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const GREETINGS = [
  "Hello",
  "Hola",
  "Bonjour",
  "Ciao",
  "Hallo",
  "Olá",
  "你好",
  "こんにちは",
  "안녕하세요",
  "नमस्ते",
  "مرحبا",
  "Aloha",
];
import {
  profile,
  skillGroups,
  projects,
  experience,
  education,
  type DevtoArticle,
} from "@/lib/portfolio-data";
import { SkillIcon } from "./skillIcons";

// Short label per skill group (first word, "Frontend Development" → "Frontend")
const tabLabel = (title: string) => title.split(/\s|&/)[0];

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

type PortfolioProps = { latestBlogs?: DevtoArticle[] };

export default function Portfolio({ latestBlogs = [] }: PortfolioProps) {
  const [tabIdx, setTabIdx] = useState(0);
  const activeGroup = skillGroups[tabIdx];
  const totalSkills = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto flex h-full max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 sm:py-5 lg:gap-4 lg:py-6"
    >
      {/* Header */}
      <motion.div
        variants={item}
        className="flex items-center justify-end gap-2"
      >
        <ThemeToggle />
        <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-foreground/10 bg-background/80 px-3 text-xs text-foreground/70 shadow-sm backdrop-blur-md">
          <MapPin size={12} className="text-rose-400" />
          {profile.location}
        </span>
      </motion.div>

      {/* Hero row */}
      <section className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_1fr] lg:gap-4">
        <motion.div variants={item}>
          <Card className="flex h-full flex-col justify-between gap-3 p-5">
            <div className="space-y-3">
              <div className="relative h-11 w-full lg:h-12">
                <GooeyText
                  texts={GREETINGS}
                  morphTime={1}
                  cooldownTime={1.4}
                  className="h-full"
                  textClassName="!text-3xl lg:!text-4xl font-bold tracking-tight"
                />
              </div>
              <h2 className="text-2xl font-semibold leading-tight tracking-tight lg:text-3xl">
                I&apos;m {profile.shortName}.
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
              className="inline-flex w-fit items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-1.5 text-sm hover:bg-foreground/10"
            >
              <Calendar size={14} /> Book a call
            </a>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="group relative h-full min-h-[160px] overflow-hidden p-0">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover object-[center_15%] grayscale transition duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.02]"
              priority
            />
            <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur">
              {profile.name}
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Bento grid — Experience featured */}
      <section className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 lg:gap-4">
        {/* Experience — FEATURED, top-left big */}
        <BentoTile
          className="md:col-span-2 lg:col-span-2 lg:row-span-3"
          title="Experience"
          icon={<Briefcase size={16} className="text-emerald-400" />}
          href="/experience"
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
          {education[0] && (
            <div className="mt-3 flex items-center gap-2 border-t border-emerald-400/15 pt-2 text-[11px] text-foreground/55">
              <GraduationCap size={12} className="text-emerald-400/80" />
              <span className="truncate">
                <b className="font-semibold text-foreground/80">
                  {education[0].degree}
                </b>{" "}
                · {education[0].school} · {education[0].range}
              </span>
            </div>
          )}
        </BentoTile>

        {/* Skills — top-right */}
        <BentoTile
          className="md:col-span-2 lg:col-span-2 lg:row-span-2"
          title="Skills"
          icon={<Sparkles size={14} className="text-violet-400" />}
          href="/skills"
          accent="violet"
        >
          <div className="flex h-full flex-col gap-3">
            <div className="relative flex gap-1 rounded-lg bg-foreground/5 p-1">
              {skillGroups.map((g, i) => (
                <button
                  key={g.title}
                  onClick={() => setTabIdx(i)}
                  className={cn(
                    "relative flex-1 rounded-md px-2 py-1 text-xs",
                    tabIdx === i
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground",
                  )}
                >
                  {tabIdx === i && (
                    <motion.span
                      layoutId="skill-tab-pill"
                      className="absolute inset-0 rounded-md bg-foreground/10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative">{tabLabel(g.title)}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tabIdx}
                variants={tabContent}
                initial="hidden"
                animate="show"
                exit="exit"
                className="grid grid-cols-2 gap-2 sm:grid-cols-3"
              >
                {activeGroup.skills.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-2 rounded-lg border border-foreground/10 bg-foreground/[0.03] px-2.5 py-2 text-xs"
                  >
                    <SkillIcon
                      skill={s}
                      size={14}
                      className="text-foreground/70"
                    />
                    <span className="truncate">{s.name}</span>
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
            <div className="mt-auto flex items-center justify-between border-t border-foreground/10 pt-2 text-[10px] text-foreground/45">
              <span>
                {totalSkills} total · {profile.years}+ yrs active
              </span>
              <span className="text-violet-400">View all →</span>
            </div>
          </div>
        </BentoTile>

        {/* Projects */}
        <BentoTile
          className="lg:col-span-1 lg:row-span-2"
          title="Projects"
          icon={<Folder size={14} className="text-cyan-400" />}
          href="/projects"
          accent="cyan"
        >
          <ul className="flex flex-col gap-2">
            {projects.slice(0, 3).map((p) => (
              <li key={p.name} className="min-w-0">
                <div className="truncate text-[12px] font-medium">{p.name}</div>
                <div className="truncate text-[10px] text-foreground/55">
                  {p.type}
                </div>
              </li>
            ))}
          </ul>
        </BentoTile>

        {/* Trail — education + certifications */}
        <BentoTile
          className="lg:col-span-1 lg:row-span-2"
          title="Trail"
          icon={<Route size={14} className="text-amber-400" />}
          href="/trail"
          accent="amber"
        >
          <ul className="flex flex-col gap-2.5 text-[11px]">
            {education.slice(0, 2).map((ed) => (
              <li key={ed.id} className="min-w-0">
                <div className="truncate font-medium text-foreground/85">
                  {ed.degree}
                </div>
                <div className="truncate text-[10px] text-foreground/55">
                  {ed.school} · {ed.range}
                </div>
              </li>
            ))}
            <li className="mt-1 inline-flex w-fit items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">
              <GraduationCap size={10} /> + certifications
            </li>
          </ul>
        </BentoTile>

        {/* Blogs — dev.to */}
        <BentoTile
          className="md:col-span-2 lg:col-span-2 lg:row-span-1"
          title="Blogs"
          icon={<BookOpen size={14} className="text-rose-400" />}
          href="/blog"
          accent="rose"
        >
          {latestBlogs.length > 0 ? (
            <ul className="grid grid-cols-2 gap-2">
              {latestBlogs.slice(0, 2).map((b) => (
                <li
                  key={b.id}
                  className="min-w-0 rounded-lg border border-foreground/10 bg-foreground/[0.03] px-3 py-1.5"
                >
                  <div className="truncate text-[12px] font-medium">
                    {b.title}
                  </div>
                  <div className="truncate text-[10px] text-foreground/55">
                    {new Date(b.published_at).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {b.reading_time_minutes} min
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-full items-center justify-center text-[11px] text-foreground/45">
              Loading from dev.to…
            </div>
          )}
        </BentoTile>
      </section>

      {/* Contact bar */}
      <motion.div variants={item}>
        <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
          <span className="text-xs font-medium text-foreground/70">
            Building something? <span className="text-foreground">Let&apos;s talk.</span>
          </span>
          <div className="flex flex-wrap gap-2">
            <SocialPill
              href={`mailto:${profile.email}`}
              icon={<SiGmail />}
              label="Email"
              iconClass="text-[#EA4335]"
            />
            <SocialPill
              href={profile.github}
              icon={<SiGithub />}
              label="GitHub"
              iconClass="text-foreground"
            />
            <SocialPill
              href={profile.linkedin}
              icon={<FaLinkedin />}
              label="LinkedIn"
              iconClass="text-[#0A66C2]"
            />
            <SocialPill
              href={profile.x}
              icon={<SiX />}
              label="X"
              iconClass="text-foreground"
            />
            <SocialPill
              href={profile.devto}
              icon={<SiDevdotto />}
              label="dev.to"
              iconClass="text-foreground"
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
        <Link
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
        </Link>
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

function SocialPill({
  href,
  icon,
  label,
  iconClass,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  iconClass?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1.5 text-xs transition hover:bg-foreground/10"
    >
      <span
        className={cn(
          "inline-flex h-3.5 w-3.5 items-center justify-center transition group-hover:scale-110",
          iconClass,
        )}
      >
        {icon}
      </span>
      {label}
    </a>
  );
}
