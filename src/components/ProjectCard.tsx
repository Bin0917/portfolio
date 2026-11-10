import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCover } from "@/components/ProjectCover";
import type { Project, ProjectSummary } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
}

const summaryRows: { key: keyof ProjectSummary; label: string }[] = [
  { key: "odd", label: "어, 이상한데" },
  { key: "judgment", label: "판단" },
  { key: "result", label: "결과" },
];

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50"
    >
      <ProjectCover
        cover={project.cover}
        sizes="(min-width: 640px) 50vw, 100vw"
        className="border-b"
      />
      <div className="flex flex-1 flex-col gap-4 p-6">
      <div>
        <p className="text-sm text-muted-foreground tabular-nums">
          {project.no}
        </p>
        <h3 className="mt-1 text-xl font-semibold">{project.title}</h3>
        <p className="mt-2 text-muted-foreground">{project.headline}</p>
      </div>
      <dl className="space-y-3 border-t pt-4 text-sm">
        {summaryRows.map((row) => (
          <div key={row.key}>
            <dt
              className={
                row.key === "odd"
                  ? "font-medium text-primary"
                  : "font-medium text-foreground"
              }
            >
              {row.label}
            </dt>
            <dd className="text-muted-foreground">{project.summary[row.key]}</dd>
          </div>
        ))}
      </dl>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
        자세히 보기
        <ArrowRight className="size-4" aria-hidden />
      </span>
      </div>
    </Link>
  );
}
