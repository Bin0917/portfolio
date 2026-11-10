import Image from "next/image";
import { ProjectCover } from "@/components/ProjectCover";
import { ReachChart } from "@/components/ReachChart";
import { RichText } from "@/components/RichText";
import type { Project, StepBlock } from "@/content/projects";

interface ProjectDetailProps {
  project: Project;
}

function Step({ step }: { step: StepBlock }) {
  return (
    <div className="relative border-l pb-8 pl-6 last:pb-0">
      <span
        aria-hidden
        className={`absolute top-2 -left-[4.5px] size-2 rounded-full border ${
          step.highlight
            ? "border-primary bg-primary"
            : "border-muted-foreground bg-background"
        }`}
      />
      <h3
        className={`text-sm font-semibold ${
          step.highlight ? "text-primary" : "text-foreground"
        }`}
      >
        {step.title}
      </h3>
      <div className="mt-2 space-y-3 text-muted-foreground">
        {step.content.map((block) =>
          block.type === "code" ? (
            <pre
              key={block.code}
              className="overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-[13px] leading-relaxed text-foreground"
            >
              {block.code}
            </pre>
          ) : (
            <p key={block.text}>
              <RichText text={block.text} />
            </p>
          ),
        )}
      </div>
    </div>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="grid gap-10 md:grid-cols-[14rem_1fr] md:gap-12">
      <aside className="md:sticky md:top-24 md:self-start">
        <p className="text-sm text-muted-foreground tabular-nums">
          {project.no}
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          {project.title}
        </h1>
        <dl className="mt-6 space-y-4 text-sm">
          {project.meta.map((item) => (
            <div key={item.label}>
              <dt className="text-muted-foreground">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
          {project.links.length > 0 ? (
            <div>
              <dt className="text-muted-foreground">링크</dt>
              {project.links.map((link) => (
                <dd key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-primary hover:underline"
                  >
                    {link.label}
                  </a>
                </dd>
              ))}
            </div>
          ) : null}
        </dl>
      </aside>
      <div className="min-w-0">
        <h2 className="mb-8 text-xl leading-snug font-semibold sm:text-2xl">
          {project.headline}
        </h2>
        <ProjectCover
          cover={project.cover}
          sizes="(min-width: 768px) 48rem, 100vw"
          className="mb-10 rounded-xl border"
          priority
        />
        {project.body.map((block) => {
          switch (block.type) {
            case "chart":
              return (
                <div key={block.title} className="pb-8">
                  <ReachChart chart={block} />
                </div>
              );
            case "image":
              return (
                <figure key={block.src} className="pb-8">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={block.width}
                    height={block.height}
                    sizes="(min-width: 768px) 48rem, 100vw"
                    className="h-auto w-full rounded-xl border bg-white"
                  />
                  <figcaption className="mt-2 text-sm text-muted-foreground">
                    {block.caption}
                  </figcaption>
                </figure>
              );
            case "step":
              return <Step key={block.title} step={block} />;
          }
        })}
      </div>
    </article>
  );
}
