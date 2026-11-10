import { RichText } from "@/components/RichText";
import type { Stat } from "@/content/site";

interface AboutProps {
  paragraphs: string[];
  stats: Stat[];
}

export function About({ paragraphs, stats }: AboutProps) {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div className="space-y-4 text-muted-foreground">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>
            <RichText text={paragraph} />
          </p>
        ))}
      </div>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse justify-end gap-2 rounded-xl border bg-card p-6 text-center"
          >
            <dt className="text-sm leading-snug text-muted-foreground">
              {stat.label}
              <span className="mt-1 block text-xs">{stat.note}</span>
            </dt>
            <dd className="text-2xl font-bold text-primary tabular-nums">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
