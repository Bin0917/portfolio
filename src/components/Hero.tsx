import { site } from "@/content/site";

const buttonBase =
  "inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm font-medium transition-colors";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-center px-4 pt-16 sm:px-6 lg:px-8">
      <div aria-hidden className="hero-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
          안녕하세요,
          <br />
          <span className="text-primary">{site.name}</span>입니다
        </h1>
        <p className="text-xl font-medium text-muted-foreground sm:text-2xl">
          {site.tagline}
        </p>
        <p className="mx-auto max-w-2xl text-muted-foreground">{site.lede}</p>
        <div className="flex justify-center gap-3 pt-2">
          <a
            href="#contact"
            className={`${buttonBase} bg-primary text-primary-foreground hover:bg-primary/90`}
          >
            연락하기
          </a>
          <a
            href={site.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonBase} border bg-background hover:border-foreground/30`}
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
