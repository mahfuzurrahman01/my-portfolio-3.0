import Image from "next/image";
import { notFound } from "next/navigation";
import Background from "@/components/ui/background";
import BackBar from "@/components/portfolio/BackBar";
import { extensions } from "@/lib/portfolio-data";
import {
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  Puzzle,
  Settings2,
  Shield,
  Target,
  Wrench,
} from "lucide-react";

export function generateStaticParams() {
  return extensions.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ext = extensions.find((e) => e.slug === slug);
  return {
    title: ext ? `${ext.name} · Mafuzur Rahman` : "Extension not found",
  };
}

export default async function ExtensionDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ext = extensions.find((e) => e.slug === slug);
  if (!ext) notFound();

  const d = ext.details;

  return (
    <main className="relative min-h-screen w-full">
      <Background />
      <div className="mx-auto max-w-4xl px-6 py-8 lg:py-12">
        <BackBar
          badge={
            <>
              <Puzzle size={12} /> Extension
            </>
          }
          badgeColor="violet"
        />

        {/* Hero */}
        <header className="mt-8 flex flex-wrap items-start gap-5">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-violet-400/30 bg-violet-400/10 text-4xl">
            {ext.icon}
          </div>
          <div className="min-w-0 flex-1">
            <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-violet-400">
              {ext.category}
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight lg:text-4xl">
              {ext.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-foreground/70 lg:text-base">
              {d.tagline}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {d.heroTags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2.5 py-0.5 text-[11px] text-foreground/70"
                >
                  {t}
                </span>
              ))}
            </div>
            {ext.chromeStoreLink && (
              <a
                href={ext.chromeStoreLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm font-medium text-violet-400 hover:bg-violet-400/20"
              >
                <ExternalLink size={14} /> Get on Chrome Web Store
              </a>
            )}
          </div>
        </header>

        {ext.image && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
            <Image
              src={ext.image}
              alt={ext.name}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {/* Feature details */}
        <Section title="Features" icon={<Wrench size={20} className="text-violet-400" />}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {d.featureDetails.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 shadow-sm backdrop-blur"
              >
                <h3 className="text-sm font-semibold">{f.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-foreground/65">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Perfect for */}
        {"perfectFor" in d && d.perfectFor && (
          <Section
            title="Perfect for"
            icon={<Target size={20} className="text-violet-400" />}
          >
            <BulletList items={d.perfectFor} />
          </Section>
        )}

        {/* Configurable options */}
        {"configurableOptions" in d && d.configurableOptions && (
          <Section
            title="Configurable"
            icon={<Settings2 size={20} className="text-violet-400" />}
          >
            <BulletList items={d.configurableOptions} />
          </Section>
        )}

        {/* Privacy */}
        {d.privacyFeatures && d.privacyFeatures.length > 0 && (
          <Section
            title="Privacy"
            icon={<Shield size={20} className="text-emerald-400" />}
          >
            <BulletList items={d.privacyFeatures} tone="emerald" />
          </Section>
        )}

        {/* How to use */}
        {d.howToUse && d.howToUse.length > 0 && (
          <Section
            title="How to use"
            icon={<Lightbulb size={20} className="text-amber-400" />}
          >
            <ol className="space-y-2">
              {d.howToUse.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-3 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-3 text-sm"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-400/15 text-xs font-semibold text-amber-400">
                    {i + 1}
                  </span>
                  <span className="text-foreground/80">{step}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Long description */}
        {"longDescription" in d && d.longDescription && (
          <Section title="About">
            <div className="space-y-3 text-sm leading-relaxed text-foreground/75">
              {d.longDescription.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Section>
        )}
      </div>
    </main>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight lg:text-2xl">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({
  items,
  tone = "violet",
}: {
  items: string[];
  tone?: "violet" | "emerald";
}) {
  const c = tone === "violet" ? "text-violet-400/80" : "text-emerald-400/80";
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((it) => (
        <li
          key={it}
          className="flex gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-3 text-sm"
        >
          <CheckCircle2 size={15} className={`mt-0.5 shrink-0 ${c}`} />
          <span className="text-foreground/80">{it}</span>
        </li>
      ))}
    </ul>
  );
}
