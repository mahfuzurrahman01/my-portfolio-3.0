import Background from "@/components/ui/background";
import Portfolio from "@/components/portfolio/Portfolio";
import { getDevtoArticles } from "@/lib/portfolio-data";

export default async function Home() {
  const latestBlogs = await getDevtoArticles(6);
  return (
    <main className="relative w-full overflow-x-hidden min-h-screen lg:h-screen lg:min-h-[720px] lg:overflow-hidden">
      <Background />
      <Portfolio latestBlogs={latestBlogs} />
    </main>
  );
}
