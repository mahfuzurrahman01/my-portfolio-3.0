import { cn } from "@/lib/utils";

type BackgroundProps = {
  className?: string;
};

export function Background({ className }: BackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      {/* Noise Texture (Darker Dots) */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Dark-mode dot variant */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.18) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Soft Yellow Glow — dark mode only */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #FFF991 0%, transparent 70%)",
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}

export default Background;
