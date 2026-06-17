"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Activity,
  Atom,
  Boxes,
  Calendar,
  Code,
  Database,
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

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export default function Portfolio() {
  const [tab, setTab] = useState<SkillTab>("software");
  const items = skills[tab];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={stagger}
      className="mx-auto grid h-full max-w-6xl grid-rows-[auto_auto_1fr_auto] gap-4 px-6 py-6 lg:gap-5 lg:py-8"
    >
      {/* Header */}
      <motion.div
        variants={fade}
        className="flex items-end justify-between"
      >
        <h1 className="text-3xl font-semibold tracking-tight text-foreground/90 lg:text-4xl">
          Portfolio
        </h1>
        <span className="text-xs text-foreground/50">
          {profile.location}
        </span>
      </motion.div>

      {/* Hero row */}
      <motion.section
        variants={fade}
        className="grid grid-cols-1 gap-4 md:grid-cols-[1.4fr_1fr]"
      >
        <Card className="flex flex-col justify-between gap-4 p-6">
          <div className="space-y-3">
            <h2 className="text-xl font-medium lg:text-2xl">
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
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-sm transition hover:bg-foreground/10"
          >
            <Calendar size={14} /> Book a call
          </a>
        </Card>
        <Card className="relative overflow-hidden p-0">
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
      </motion.section>

      {/* Bento — Skills / Projects / Experience */}
      <motion.section
        variants={fade}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {/* Skills */}
        <Card className="flex flex-col gap-3 p-5 md:col-span-1">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-foreground/60" />
            <h3 className="text-sm font-medium">Skills</h3>
          </div>
          <div className="flex gap-1 rounded-lg bg-foreground/5 p-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "flex-1 rounded-md px-2 py-1 text-xs transition",
                  tab === t.key
                    ? "bg-foreground/10 text-foreground"
                    : "text-foreground/60 hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {items.map((s) => {
              const Icon =
                ICONS[s.icon as keyof typeof ICONS] ?? Sparkles;
              return (
                <div
                  key={s.name}
                  className="flex items-center gap-2 rounded-lg border border-foreground/10 bg-foreground/[0.03] px-2.5 py-2 text-xs"
                >
                  <Icon size={14} className="text-foreground/60" />
                  <span className="truncate">{s.name}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Projects */}
        <Card className="flex flex-col gap-3 p-5">
          <h3 className="text-sm font-medium">Projects</h3>
          <ul className="flex flex-col gap-2">
            {projects.map((p) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  className="group flex items-center justify-between rounded-lg border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 transition hover:bg-foreground/[0.06]"
                >
                  <div>
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-foreground/55">
                      {p.note}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-foreground/40 transition group-hover:text-foreground"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Card>

        {/* Experience */}
        <Card className="flex flex-col gap-3 p-5">
          <h3 className="text-sm font-medium">Experience</h3>
          <ol className="flex flex-col gap-3">
            {experience.map((e, i) => (
              <li key={e.company} className="flex gap-3">
                <div className="mt-1.5 flex flex-col items-center">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      i === 0
                        ? "bg-emerald-400"
                        : "bg-foreground/30",
                    )}
                  />
                  {i < experience.length - 1 && (
                    <span className="mt-1 h-8 w-px bg-foreground/15" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium">{e.role}</div>
                  <div className="text-xs text-foreground/55">
                    {e.company} · {e.range}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </motion.section>

      {/* Contact bar */}
      <motion.section variants={fade}>
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
      </motion.section>
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
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55 0-.27-.01-1-.02-1.97-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.41-5.27 5.7.41.36.78 1.07.78 2.16 0 1.56-.02 2.82-.02 3.2 0 .31.21.67.8.55A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
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
      className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1.5 text-xs transition hover:bg-foreground/10"
    >
      {icon} {label}
    </a>
  );
}
