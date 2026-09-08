import Image from "next/image";
import Background from "@/components/ui/background";
import BackBar from "@/components/portfolio/BackBar";
import { BookOpen, Clock, ExternalLink } from "lucide-react";
import { blogConfig, getDevtoArticles } from "@/lib/portfolio-data";
import { siteConfig } from "@/config/site";

export const metadata = { title: `Blog · ${siteConfig.name}` };

export default async function BlogPage() {
  const articles = await getDevtoArticles(30);

  return (
    <main className="relative min-h-screen w-full">
      <Background />
      <div className="mx-auto max-w-4xl px-6 py-8 lg:py-12">
        <BackBar
          badge={
            <>
              <BookOpen size={12} /> Blog
            </>
          }
          badgeColor="rose"
        />

        <header className="mt-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Writing
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-foreground/65 lg:text-base">
              Posts pulled live from{" "}
              <a
                href={blogConfig.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-rose-400 hover:underline"
              >
                dev.to/{blogConfig.username}
              </a>{" "}
              — refreshed hourly.
            </p>
          </div>
          <a
            href={blogConfig.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-400/10 px-3 text-xs font-medium text-rose-400 hover:bg-rose-400/20"
          >
            <ExternalLink size={12} /> View on dev.to
          </a>
        </header>

        {articles.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 text-center text-sm text-foreground/55">
            No posts available right now. Check{" "}
            <a
              href={blogConfig.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-rose-400 hover:underline"
            >
              dev.to
            </a>{" "}
            directly.
          </div>
        ) : (
          <ul className="mt-10 space-y-3">
            {articles.map((a) => (
              <li key={a.id}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 shadow-sm backdrop-blur transition hover:border-rose-400/30 hover:bg-foreground/[0.04] lg:p-5"
                >
                  {a.cover_image && (
                    <div className="relative hidden h-24 w-40 shrink-0 overflow-hidden rounded-xl bg-foreground/5 sm:block">
                      <Image
                        src={a.cover_image}
                        alt={a.title}
                        fill
                        sizes="160px"
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold leading-snug group-hover:text-rose-400 lg:text-lg">
                      {a.title}
                    </h2>
                    {a.description && (
                      <p className="mt-1 line-clamp-2 text-xs text-foreground/65 lg:text-sm">
                        {a.description}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-foreground/55">
                      <span>
                        {new Date(a.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-foreground/30">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} /> {a.reading_time_minutes} min
                      </span>
                      {a.tag_list?.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-foreground/[0.05] px-1.5 py-0.5 text-[10px] text-foreground/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
