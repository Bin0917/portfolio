import Image from "next/image";
import type { ProjectCover as Cover } from "@/content/projects";

interface ProjectCoverProps {
  cover: Cover;
  /** 반응형 이미지 크기 힌트 */
  sizes: string;
  className?: string;
  priority?: boolean;
}

/** 16:9 틀 안에 대표 이미지를 넣는다. 로고류는 잘리지 않게 contain으로 둔다. */
export function ProjectCover({
  cover,
  sizes,
  className = "",
  priority = false,
}: ProjectCoverProps) {
  const isContain = cover.fit === "contain";
  return (
    <div
      className={`relative aspect-video overflow-hidden ${className}`}
      style={{ background: cover.background }}
    >
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={cover.src.endsWith(".svg")}
        className={isContain ? "object-contain p-6" : "object-cover"}
      />
    </div>
  );
}
