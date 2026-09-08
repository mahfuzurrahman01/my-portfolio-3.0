import Image from "next/image";
import Background from "@/components/ui/background";
import BackBar from "@/components/portfolio/BackBar";
import { education, certifications } from "@/lib/portfolio-data";
import { Award, GraduationCap, CheckCircle2, Route } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata = { title: `Trail · ${siteConfig.name}` };

export default function TrailPage() {
  return (
    <main className="relative min-h-screen w-full">
      <Background />
      <div className="mx-auto max-w-4xl px-6 py-8 lg:py-12">
        <BackBar
          badge={
            <>
              <Route size={12} /> Trail
            </>
          }
          badgeColor="amber"
        />

        <header className="mt-8">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            The Trail
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/65 lg:text-base">
            Where I came from and what I picked up along the way — formal
            education and the certifications I&apos;ve collected since pivoting to
            engineering.
          </p>
        </header>

        {/* Education */}
        <section className="mt-10">
          <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold tracking-tight lg:text-3xl">
            <GraduationCap size={22} className="text-amber-400" />
            Education
          </h2>
          <div className="space-y-4">
            {education.map((ed, i) => (
              <article
                key={ed.id}
                className="relative rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 shadow-sm backdrop-blur lg:p-6"
              >
                <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-foreground/10 pb-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold lg:text-xl">
                        {ed.degree}
                      </h3>
                      {i === education.length - 1 && (
                        <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-400">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-foreground/65">
                      <b className="font-semibold text-foreground/85">
                        {ed.school}
                      </b>
                      {ed.location ? ` · ${ed.location}` : ""}
                    </div>
                  </div>
                  <span className="text-xs text-foreground/55">
                    {ed.range}
                  </span>
                </header>

                {ed.description && (
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                    {ed.description}
                  </p>
                )}

                {ed.achievements && ed.achievements.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {ed.achievements.map((a) => (
                      <li
                        key={a}
                        className="flex gap-2 text-xs text-foreground/70"
                      >
                        <CheckCircle2
                          size={13}
                          className="mt-0.5 shrink-0 text-amber-400/80"
                        />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {ed.gpa && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-400">
                    {ed.gpa}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mt-12">
          <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold tracking-tight lg:text-3xl">
            <Award size={22} className="text-amber-400" />
            Certifications
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {certifications.map((c) => (
              <article
                key={c.id}
                className="flex gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 shadow-sm backdrop-blur transition hover:bg-foreground/[0.04]"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-foreground/5">
                  {c.image && (
                    <Image
                      src={c.image}
                      alt={c.platform}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold">
                    {c.title}
                  </h3>
                  <div className="truncate text-[11px] text-foreground/60">
                    {c.platform} · {c.period}
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11px] text-foreground/55">
                    {c.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
