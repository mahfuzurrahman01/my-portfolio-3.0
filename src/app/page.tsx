import Background from "@/components/ui/background";
import ThemeToggle from "@/components/ThemeToggle";
import Portfolio from "@/components/portfolio/Portfolio";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden lg:h-screen lg:min-h-0">
      <Background />
      <ThemeToggle />
      <Portfolio />
    </main>
  );
}
