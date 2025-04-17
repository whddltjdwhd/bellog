"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 클라이언트 마운트 이후에만 theme 접근
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <label className="flex items-center gap-2 select-none">
      <Sun className={`h-4 w-4 ${isDark ? "opacity-40" : "opacity-100"}`} />
      <Switch
        checked={isDark}
        onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
        className="cursor-pointer"
      />
      <Moon className={`h-4 w-4 ${isDark ? "opacity-100" : "opacity-40"}`} />
    </label>
  );
}
