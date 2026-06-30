import {
  Atom,
  Bot,
  Code,
  Database,
  GitBranch,
  Layers,
  Palette,
  Server,
  Smartphone,
  Sparkles,
  Triangle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Map skill name (from portfolio.json) → lucide icon component.
 * Add to this map when you add a new skill.
 */
const SKILL_ICON_MAP: Record<string, LucideIcon> = {
  React: Atom,
  "Next.js": Triangle,
  TypeScript: Code,
  JavaScript: Code,
  "React Native": Smartphone,
  "Tailwind CSS": Palette,
  "Shadcn/ui": Layers,
  Git: GitBranch,
  GitHub: GitBranch,
  MongoDB: Database,
  PostgreSQL: Database,
  Prisma: Database,
  Supabase: Database,
  "Node.js": Server,
  "Express.js": Server,
  "REST APIs": Server,
  "Mastra AI": Bot,
  "Gemini API": Bot,
  "OpenAI API": Bot,
  "Claude API": Bot,
  "Vercel AI SDK": Bot,
  LangChain: Bot,
  N8N: Bot,
  Vercel: Triangle,
  Docker: Layers,
  AWS: Server,
  Cursor: Code,
  Figma: Palette,
};

type Skill = { name: string; icon: string; type: "svg" | "emoji" };

export function SkillIcon({
  skill,
  size = 14,
  className,
}: {
  skill: Skill;
  size?: number;
  className?: string;
}) {
  // 1. JSON says emoji and it's a printable emoji → render emoji
  if (skill.type === "emoji" && skill.icon.length <= 3) {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex items-center justify-center",
          className,
        )}
        style={{ fontSize: size + 2, lineHeight: 1 }}
      >
        {skill.icon}
      </span>
    );
  }

  // 2. Otherwise lookup lucide map by name
  const Icon = SKILL_ICON_MAP[skill.name] ?? Sparkles;
  return <Icon size={size} className={className} />;
}
