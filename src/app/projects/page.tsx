import Link from "next/link";
import Background from "@/components/ui/background";
import BackBar from "@/components/portfolio/BackBar";
import ProjectGrid from "./ProjectGrid";
import { projects, extensions } from "@/lib/portfolio-data";
import { Folder, Info, Puzzle } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata = { title: `Projects · ${siteConfig.name}` };

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen w-full">
      <Background />
      <div className="mx-auto max-w-5xl px-6 py-8 lg:py-12">
        <BackBar
          badge={
            <>
              <Folder size={12} /> Projects
            </>
          }
          badgeColor="cyan"
        />

        <header className="mt-8">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Projects
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/65 lg:text-base">
            {projects.length} shipped — products, tools, and side things I
            built end-to-end. Below that, {extensions.length} Chrome extensions
            on the Web Store.
          </p>

          <div className="mt-5 flex gap-3 rounded-2xl border border-cyan-400/25 bg-cyan-400/[0.06] p-4 text-sm text-foreground/75 backdrop-blur lg:p-5">
            <Info
              size={16}
              className="mt-0.5 shrink-0 text-cyan-400"
              aria-hidden
            />
            <p className="leading-relaxed">
              <b className="font-semibold text-foreground/90">
                Quick context —
              </b>{" "}
              most of my real engineering work has been{" "}
              <b className="text-foreground/90">in-house</b> at the companies
              listed under{" "}
              <a
                href="/experience"
                className="font-medium text-cyan-400 underline-offset-4 hover:underline"
              >
                Experience
              </a>{" "}
              (proprietary, not shown). What you&apos;ll find below are my{" "}
              <b className="text-foreground/90">hobby projects</b> and a few{" "}
              <b className="text-foreground/90">live products</b> I&apos;m
              running for clients — the public-facing stuff I can share.
            </p>
          </div>
        </header>

        {/* Interactive project grid */}
        <ProjectGrid projects={projects} />

        {/* Extensions */}
        <section className="mt-16">
          <header className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight lg:text-3xl">
                <Puzzle size={20} className="text-violet-400" />
                Chrome Extensions
              </h2>
              <p className="mt-1 text-sm text-foreground/60">
                Shipped on the Chrome Web Store.
              </p>
            </div>
          </header>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {extensions.map((ext) => (
              <Link
                key={ext.id}
                href={`/extensions/${ext.slug}`}
                className="group flex gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 shadow-sm backdrop-blur transition hover:border-violet-400/30 hover:bg-violet-400/[0.04] lg:p-5"
              >
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-violet-400/30 bg-violet-400/10 text-2xl">
                  {ext.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-base font-semibold">
                      {ext.name}
                    </h3>
                    <span className="rounded-full border border-violet-400/25 bg-violet-400/10 px-2 py-0.5 text-[10px] font-medium text-violet-400">
                      {ext.category}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-foreground/65">
                    {ext.summary}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {ext.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-foreground/[0.05] px-1.5 py-0.5 text-[10px] text-foreground/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
