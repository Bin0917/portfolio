interface SectionTitleProps {
  title: string;
  description?: string;
}

export function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div className="mb-14 text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      <div className="mx-auto mt-3 h-1 w-10 rounded bg-primary" />
      {description ? (
        <p className="mt-5 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
