import Background from "@/components/ui/background";
import BackBar from "@/components/portfolio/BackBar";
import { SkillIcon } from "@/components/portfolio/skillIcons";
import { skillGroups, profile } from "@/lib/portfolio-data";
import { Sparkles } from "lucide-react";

export const metadata = { title: "Skills · Mafuzur Rahman" };

export default function SkillsPage() {
  const totalSkills = skillGroups.reduce(
    (n, g) => n + g.skills.length,
    0,
  );

  return (
    <main className="relative min-h-screen w-full">
      <Background />
      <div className="mx-auto max-w-4xl px-6 py-8 lg:py-12">
        <BackBar
          badge={
            <>
              <Sparkles size={12} /> Skills
            </>
          }
          badgeColor="violet"
        />

        <header className="mt-8">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Skills
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/65 lg:text-base">
            {totalSkills} tools across {skillGroups.length} disciplines.
            Built with {profile.years}+ years on production stacks.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          {skillGroups.map((group) => (
            <section
              key={group.title}
              className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 shadow-sm backdrop-blur lg:p-7"
            >
              <h2 className="text-lg font-semibold lg:text-xl">
                {group.title}
              </h2>
              <p className="mt-1 text-xs uppercase tracking-wider text-foreground/45">
                {group.skills.length} skills
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {group.skills.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 text-sm transition hover:bg-foreground/[0.06]"
                  >
                    <SkillIcon
                      skill={s}
                      size={16}
                      className="text-foreground/70"
                    />
                    <span className="truncate">{s.name}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
