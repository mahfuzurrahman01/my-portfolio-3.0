import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackBar({
  badge,
  badgeColor = "emerald",
}: {
  badge: React.ReactNode;
  badgeColor?: "emerald" | "violet" | "cyan" | "amber" | "rose";
}) {
  const tones: Record<string, string> = {
    emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
    violet: "border-violet-400/30 bg-violet-400/10 text-violet-400",
    cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-400",
    amber: "border-amber-400/30 bg-amber-400/10 text-amber-400",
    rose: "border-rose-400/30 bg-rose-400/10 text-rose-400",
  };
  return (
    <div className="flex items-center justify-between">
      <Link
        href="/"
        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-foreground/10 bg-background/80 px-3 text-xs text-foreground/70 shadow-sm backdrop-blur-md hover:bg-foreground/[0.06]"
      >
        <ArrowLeft size={12} /> Back
      </Link>
      <span
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium",
          tones[badgeColor],
        )}
      >
        {badge}
      </span>
    </div>
  );
}
