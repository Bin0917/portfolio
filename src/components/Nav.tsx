import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navItems, site } from "@/content/site";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur">
      <nav
        aria-label="주요 메뉴"
        className="flex h-16 items-center justify-between px-4 sm:px-8"
      >
        <Link href="/" className="font-semibold tracking-tight">
          {site.name}
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm text-muted-foreground transition-colors hover:text-foreground ${
                item.hideOnMobile ? "hidden sm:inline" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
