"use client";

import { cn } from "@/lib/cn";
import { useEffect, useMemo, useState } from "react";

export type LanguageOption = { code: string; isDefault?: boolean };

const STORAGE_KEY = "dividandy.activeLanguage";

function normalize(code: string) {
  return code.trim().toUpperCase();
}

function getDefault(languages: LanguageOption[]) {
  const def = languages.find((l) => l.isDefault)?.code ?? languages[0]?.code ?? "EN";
  return normalize(def);
}

export function useActiveLanguage(languages: LanguageOption[]) {
  const fallback = useMemo(() => getDefault(languages), [languages]);
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    queueMicrotask(() => {
      setActive((prev) => prev || fallback);
    });
  }, [fallback]);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setActive(normalize(saved));
      } catch {
        // ignore
      }
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, active);
    } catch {
      // ignore
    }
  }, [active]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      if (typeof e.newValue === "string" && e.newValue) setActive(normalize(e.newValue));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { active, setActive };
}

export function LanguageInline({
  languages,
  className,
  activeClassName,
  inactiveClassName,
}: {
  languages: LanguageOption[];
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}) {
  const { active, setActive } = useActiveLanguage(languages);

  return (
    <div className={cn("flex items-center gap-4", className)} role="navigation" aria-label="Languages">
      {languages.map((l) => {
        const code = normalize(l.code);
        const isActive = code === active;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setActive(code)}
            className={cn(
              isActive ? activeClassName : inactiveClassName,
              "transition-colors"
            )}
            aria-current={isActive ? "true" : undefined}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}

