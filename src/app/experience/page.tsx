"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Background from "@/components/ui/background";
import { experience, education, profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

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

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen w-full">
      <Background />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-4xl px-6 py-8 lg:py-12"
      >
        {/* Top bar */}
        <motion.div
          variants={item}
          className="flex items-center justify-between"
        >
          <Link
            href="/"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-foreground/10 bg-background/80 px-3 text-xs text-foreground/70 shadow-sm backdrop-blur-md hover:bg-foreground/[0.06]"
          >
            <ArrowLeft size={12} /> Back
          </Link>
          <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 text-xs font-medium text-emerald-400">
            <Briefcase size={12} /> Experience
          </span>
        </motion.div>

        {/* Title */}
        <motion.header variants={item} className="mt-8">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Experience
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/65 lg:text-base">
            {profile.years}+ years across healthcare, ERP and AI-driven SaaS.
            Below is what I owned at each role and the work that came out of it.
          </p>
        </motion.header>

        {/* Roles */}
        <div className="mt-10 space-y-8">
          {experience.map((e, i) => (
            <motion.section
              key={e.slug}
              variants={item}
              className="relative rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 shadow-sm backdrop-blur lg:p-7"
            >
              {/* Header */}
              <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-foreground/10 pb-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold lg:text-2xl">
                      {e.role}
                    </h2>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                        i === 0
                          ? "bg-emerald-400/15 text-emerald-400"
                          : "bg-foreground/10 text-foreground/65",
                      )}
                    >
                      {e.tag}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-foreground/65">
                    <b className="font-semibold text-foreground/90">
                      {e.company}
                    </b>{" "}
                    · {e.range}
                  </div>
                </div>
              </header>

              {/* Bullets */}
              <ul className="mt-4 flex flex-col gap-2.5">
                {e.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2.5 text-sm leading-relaxed text-foreground/80"
                  >
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-emerald-400/80"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Projects worked on */}
              {e.projects?.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground/55">
                    <Sparkles size={12} className="text-cyan-400" />
                    Projects at {e.company}
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {e.projects.map((p) => (
                      <div
                        key={p.name}
                        className="flex flex-col gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-3 transition hover:bg-foreground/[0.06]"
                      >
                        <div className="text-sm font-medium">{p.name}</div>
                        <p className="text-[11px] leading-relaxed text-foreground/60">
                          {p.brief}
                        </p>
                        <div className="mt-auto flex flex-wrap gap-1">
                          {p.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-foreground/10 bg-foreground/[0.04] px-1.5 py-0.5 text-[10px] text-foreground/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          ))}
        </div>

        {/* Education */}
        {education[0] && (
          <motion.section
            variants={item}
            className="mt-8 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 shadow-sm backdrop-blur lg:p-7"
          >
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground/55">
              <GraduationCap size={14} className="text-emerald-400" /> Education
            </h3>
            {education.map((ed) => (
              <div
                key={ed.degree}
                className="flex flex-wrap items-baseline justify-between gap-2"
              >
                <div>
                  <div className="text-base font-semibold">{ed.degree}</div>
                  <div className="text-xs text-foreground/60">{ed.school}</div>
                </div>
                <span className="text-xs text-foreground/55">{ed.range}</span>
              </div>
            ))}
          </motion.section>
        )}

        {/* Back link bottom */}
        <motion.div variants={item} className="mt-10 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.04] px-4 py-1.5 text-xs hover:bg-foreground/10"
          >
            <ArrowLeft size={12} /> Back to home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
