import type { ChartBlock } from "@/content/projects";

interface ReachChartProps {
  chart: ChartBlock;
}

interface BarProps {
  value: number;
  variant: "before" | "after";
}

function Bar({ value, variant }: BarProps) {
  const isAfter = variant === "after";
  return (
    <div className="flex items-center gap-2">
      <div className="h-2.5 flex-1">
        <div
          className={`h-full rounded-sm ${isAfter ? "bg-primary" : "bg-chart-before"}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span
        className={`w-12 text-right text-xs tabular-nums ${
          isAfter ? "font-medium text-foreground" : "text-muted-foreground"
        }`}
      >
        {value.toFixed(1)}%
      </span>
    </div>
  );
}

/** 개선 전후 도달률 비교. 차트 라이브러리 없이 div 너비로만 그린다. */
export function ReachChart({ chart }: ReachChartProps) {
  return (
    <figure className="rounded-xl border bg-card p-6">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <span className="font-semibold">{chart.title}</span>
        <span className="flex gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <i className="size-2.5 rounded-sm bg-chart-before" />
            개선 전
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="size-2.5 rounded-sm bg-primary" />
            개선 후
          </span>
        </span>
      </figcaption>
      <div className="divide-y">
        {chart.rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-x-4 gap-y-1.5 py-3 sm:grid-cols-[9.5rem_1fr] sm:items-center"
          >
            <div className="text-sm leading-snug">
              {row.label}
              {row.note ? (
                <span className="block text-xs text-muted-foreground">
                  {row.note}
                </span>
              ) : null}
            </div>
            <div className="space-y-1">
              <Bar value={row.before} variant="before" />
              <Bar value={row.after} variant="after" />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{chart.caption}</p>
    </figure>
  );
}
