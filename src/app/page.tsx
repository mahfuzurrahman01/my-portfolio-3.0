import Background from "@/components/ui/background";
import ThemeToggle from "@/components/ThemeToggle";
import Portfolio from "@/components/portfolio/Portfolio";

export default function Home() {
  return (
    <main className="relative h-screen min-h-[700px] w-full overflow-hidden">
      <Background />
      <ThemeToggle />
      <Portfolio />
    </main>
  );
}
