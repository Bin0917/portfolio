import {
  GitMerge,
  GraduationCap,
  Package,
  School,
  type LucideIcon,
} from "lucide-react";
import type { TimelineIcon, TimelineItem } from "@/content/site";

interface TimelineProps {
  items: TimelineItem[];
}

const icons: Record<TimelineIcon, LucideIcon> = {
  merge: GitMerge,
  package: Package,
  graduation: GraduationCap,
  school: School,
};

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative mx-auto max-w-3xl space-y-6">
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-4 w-px bg-border"
      />
      {items.map((item) => {
        const Icon = icons[item.icon];
        return (
          <li key={item.title} className="relative pl-14">
            <span className="absolute top-4 left-0 flex size-8 items-center justify-center rounded-full border bg-background text-muted-foreground">
              <Icon className="size-4" aria-hidden />
            </span>
            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">{item.when}</p>
              <h3 className="mt-1 font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
