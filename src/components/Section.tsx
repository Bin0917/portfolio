import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  /** 연회색 배경을 번갈아 깔 때 쓴다 */
  muted?: boolean;
  children: ReactNode;
}

export function Section({
  id,
  title,
  description,
  muted = false,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-4 py-24 sm:px-6 lg:px-8 ${muted ? "bg-muted/30" : ""}`}
    >
      <Reveal className="mx-auto max-w-5xl">
        <SectionTitle title={title} description={description} />
        {children}
      </Reveal>
    </section>
  );
}
