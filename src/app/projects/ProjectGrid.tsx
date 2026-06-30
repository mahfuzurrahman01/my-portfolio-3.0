"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const ALL = "All";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const types = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => set.add(p.type));
    return [ALL, ...Array.from(set)];
  }, [projects]);

  const [filter, setFilter] = useState<string>(ALL);
  const filtered = useMemo(
    () => (filter === ALL ? projects : projects.filter((p) => p.type === filter)),
    [filter, projects],
  );

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.4,
  });

  return (
    <>
      {/* Scroll progress bar at top of viewport */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400"
      />

      {/* Filter pills */}
      <div className="sticky top-3 z-30 mt-8 -mx-2 flex flex-wrap items-center gap-2 px-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className="group relative rounded-full border border-foreground/10 bg-background/70 px-3 py-1 text-xs backdrop-blur transition hover:bg-foreground/[0.06]"
          >
            {filter === t && (
              <motion.span
                layoutId="projects-filter-pill"
                className="absolute inset-0 rounded-full bg-cyan-400/15 border border-cyan-400/40"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={
                filter === t
                  ? "relative text-cyan-400 font-medium"
                  : "relative text-foreground/65 group-hover:text-foreground"
              }
            >
              {t}
              <span className="ml-1 text-foreground/35">
                {t === ALL
                  ? projects.length
                  : projects.filter((p) => p.type === t).length}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.section
        layout
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </AnimatePresence>
      </motion.section>
    </>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  // Tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useTransform(my, [0, 1], [6, -6]);
  const rotateY = useTransform(mx, [0, 1], [-6, 6]);
  const sx = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const sy = useSpring(rotateY, { stiffness: 200, damping: 20 });

  // Spotlight gradient
  const spotX = useTransform(mx, (v) => `${v * 100}%`);
  const spotY = useTransform(my, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${spotX} ${spotY}, rgba(34, 211, 238, 0.18), transparent 55%)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      ref={ref}
      layout
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: sx,
        rotateY: sy,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] shadow-sm backdrop-blur transition-colors hover:border-cyan-400/30"
    >
      <motion.div
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <Preview p={p} />

      <div className="relative z-[1] flex flex-1 flex-col gap-3 p-4 lg:p-5">
        <h2 className="text-lg font-semibold lg:text-xl">{p.name}</h2>
        <p className="text-sm leading-relaxed text-foreground/70">
          {p.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {p.techStack.map((t) => (
            <span
              key={t}
              className="rounded-md border border-foreground/10 bg-foreground/[0.04] px-1.5 py-0.5 text-[10px] text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {p.liveLink && (
            <a
              href={p.liveLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-400 hover:bg-cyan-400/20"
            >
              <ExternalLink size={12} /> Live
            </a>
          )}
          {p.githubLink && p.githubLink !== "Private Repository" ? (
            <a
              href={p.githubLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs hover:bg-foreground/10"
            >
              <GithubIcon /> Code
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-xs text-foreground/45">
              Private repo
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Preview({ p }: { p: Project }) {
  const url = p.liveLink;
  const src = url
    ? `https://api.microlink.io/?url=${encodeURIComponent(
        url,
      )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=820`
    : null;

  let host = "";
  try {
    if (url) host = new URL(url).host;
  } catch {}

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-cyan-400/[0.05] via-foreground/[0.02] to-violet-400/[0.05]">
      {/* Browser chrome */}
      <div className="absolute inset-x-0 top-0 z-20 flex h-7 items-center gap-1.5 border-b border-white/10 bg-zinc-900/85 px-3 backdrop-blur dark:bg-black/70">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <div className="mx-auto flex max-w-[60%] items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-white/65">
          <span className="text-emerald-400">🔒</span>
          <span className="truncate">{host || "preview soon"}</span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-7 overflow-hidden">
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={`${p.name} screenshot`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.05]"
          />
        ) : p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-foreground/35">
            <div className="flex flex-col items-center gap-1.5">
              <Folder size={26} className="text-cyan-400/60" />
              <span className="text-[10px] uppercase tracking-[0.2em]">
                Preview soon
              </span>
            </div>
          </div>
        )}
      </div>

      <span className="absolute right-3 top-10 z-10 rounded-full border border-cyan-400/30 bg-cyan-400/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-cyan-400 backdrop-blur">
        {p.type}
      </span>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55 0-.27-.01-1-.02-1.97-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.41-5.27 5.7.41.36.78 1.07.78 2.16 0 1.56-.02 2.82-.02 3.2 0 .31.21.67.8.55A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
