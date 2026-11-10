import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { footerLinks, navItems, site } from "@/content/site";

const headingClass = "text-sm font-semibold";
const itemClass =
  "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  return (
    <footer className="border-t px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-2">
          <p className="text-lg font-bold tracking-tight">{site.name}</p>
          <p className="text-sm text-muted-foreground">{site.tagline}</p>
        </div>

        <div className="space-y-3">
          <h2 className={headingClass}>연락</h2>
          <ul className="space-y-2">
            {site.emails.map((email) => (
              <li key={email}>
                <a href={`mailto:${email}`} className={itemClass}>
                  <Mail className="size-4 shrink-0" aria-hidden />
                  <span className="break-all">{email}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className={headingClass}>링크</h2>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={itemClass}
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="바로가기" className="space-y-3">
          <h2 className={headingClass}>바로가기</h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={itemClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-5xl border-t py-6 text-sm text-muted-foreground">
        © 2026 {site.name}
      </div>
    </footer>
  );
}
