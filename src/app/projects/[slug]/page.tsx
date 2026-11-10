import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProjectDetail } from "@/components/ProjectDetail";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | ${site.name}`,
    description: project.headline,
  };
}

export default function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  return (
    <main className="min-h-screen px-4 pt-28 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          프로젝트 목록
        </Link>
        {/* 목록에 없는 slug는 요청 시점에 확인하므로 params 접근을 Suspense 안에 둔다 */}
        <Suspense>
          <ProjectContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}

async function ProjectContent({
  params,
}: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <>
        <ProjectDetail project={project} />
        <div className="mt-16 flex justify-end border-t pt-8">
          <Link
            href={`/projects/${next.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            다음: {next.no} {next.title}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
    </>
  );
}
