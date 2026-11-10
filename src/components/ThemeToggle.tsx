"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="다크 모드 전환"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
    >
      {/* 아이콘은 CSS로 바꿔서 하이드레이션 전에도 어긋나지 않는다 */}
      <Moon className="size-4 dark:hidden" aria-hidden />
      <Sun className="hidden size-4 dark:block" aria-hidden />
    </button>
  );
}
