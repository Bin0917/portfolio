import { ArrowUpRight, Code2, Mail, type LucideIcon } from "lucide-react";

interface ContactLink {
  label: string;
  href: string;
}

interface ContactProps {
  emails: readonly string[];
  github: ContactLink;
}

interface Channel {
  icon: LucideIcon;
  kind: string;
  value: string;
  href: string;
  external: boolean;
}

export function Contact({ emails, github }: ContactProps) {
  const channels: Channel[] = [
    ...emails.map((email) => ({
      icon: Mail,
      kind: "이메일",
      value: email,
      href: `mailto:${email}`,
      external: false,
    })),
    {
      icon: Code2,
      kind: "GitHub",
      value: github.label,
      href: github.href,
      external: true,
    },
  ];

  return (
    <div className="relative isolate overflow-hidden rounded-3xl border bg-card px-6 py-12 sm:px-12 sm:py-16">
      {/* 카드 안쪽에만 깔리는 옅은 빛 */}
      <div
        aria-hidden
        className="absolute -top-24 -left-16 -z-10 size-72 rounded-full bg-primary opacity-15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-16 -bottom-28 -z-10 size-80 rounded-full bg-[#7c5cff] opacity-10 blur-3xl"
      />

      <div className="mx-auto max-w-xl text-center">
        <p className="text-2xl font-bold tracking-tight sm:text-3xl">
          메일이나 GitHub로 연락 주세요
        </p>
        <a
          href={`mailto:${emails[0]}`}
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Mail className="size-4" aria-hidden />
          메일 보내기
        </a>
      </div>

      <ul className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
        {channels.map((channel) => (
          <li key={channel.href}>
            <a
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex h-full items-center gap-4 rounded-2xl border bg-background/70 p-5 backdrop-blur transition-colors hover:border-primary/50"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <channel.icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-muted-foreground">
                  {channel.kind}
                </span>
                <span className="block truncate text-sm font-medium">
                  {channel.value}
                </span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
