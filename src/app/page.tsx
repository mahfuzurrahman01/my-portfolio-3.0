import Background from "@/components/ui/background";
import Portfolio from "@/components/portfolio/Portfolio";
import { getDevtoArticles } from "@/lib/portfolio-data";

export default async function Home() {
  const latestBlogs = await getDevtoArticles(6);
  return (
    <main className="relative w-full overflow-x-hidden min-h-screen 2xl:h-screen 2xl:min-h-[720px] 2xl:overflow-y-auto">
      <Background />
      <Portfolio latestBlogs={latestBlogs} />
    </main>
  );
}
