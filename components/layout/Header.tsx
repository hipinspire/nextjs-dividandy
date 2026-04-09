"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button, type ButtonSize } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useActiveLanguage } from "@/components/i18n/LanguageUI";

type StrapiButtonSize = "small" | "medium" | "large";

function mapButtonSize(v: StrapiButtonSize | undefined): ButtonSize | undefined {
  if (v === "small") return "sm";
  if (v === "medium") return "md";
  if (v === "large") return "lg";
  return undefined;
}

export type NavChild = {
  label: string;
  href: string;
  external?: boolean;
  buttonSize?: StrapiButtonSize;
};
export type NavItem = {
  label: string;
  href?: string;
  external?: boolean;
  children?: NavChild[];
};

export type Language = { code: string; isDefault?: boolean };

function isLocalStrapiAsset(url: string) {
  return (
    url.startsWith("http://localhost:1337/") ||
    url.startsWith("http://127.0.0.1:1337/")
  );
}

type HeaderProps = {
  logoHref?: string;
  logoText?: string;
  logoUrl?: string | null;
  logoAlt?: string | null;
  languages?: Language[];
  nav?: NavItem[];
  cta?: NavChild | null;
  className?: string;
};

export function Header({
  logoHref = "/",
  logoText = "Dividandy",
  logoUrl,
  logoAlt,
  languages = [],
  nav = [],
  cta,
  className,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const { active: activeLang, setActive: setActiveLang } = useActiveLanguage(
    languages
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    const onClick = () => setLangOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [langOpen]);

  const placeholderNav: NavItem[] = useMemo(
    () => [
      { label: "Why Dividandy?", href: "#" },
      { label: "How it works", href: "#" },
      { label: "Live tournaments", href: "#" },
      { label: "Insights", href: "#" },
    ],
    []
  );

  const effectiveNav = nav.length ? nav : placeholderNav;
  const joinCta = cta?.href ? cta : { label: "Join the arena", href: "#" };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-colors duration-200",
        scrolled ? "bg-black" : "bg-transparent",
        className
      )}
    >
      <Container className="flex h-20 items-center justify-between py-4">
        <Link
          href={logoHref}
          className="flex items-center gap-3"
        >
          {logoUrl ? (
            <span className="block w-[170px] sm:w-[210px]">
              <Image
                src={logoUrl}
                alt={logoAlt ?? ""}
                width={420}
                height={140}
                sizes="(min-width: 640px) 210px, 170px"
                className="h-auto w-full object-contain"
                unoptimized={isLocalStrapiAsset(logoUrl)}
                priority
              />
            </span>
          ) : null}
          {!logoUrl ? (
            <span className="text-lg font-semibold tracking-tight text-foreground">
              {logoText}
            </span>
          ) : null}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {effectiveNav.map((item) => {
            const href = item.href ?? "#";
            return (
              <div key={item.label} className="relative group">
                <Link
                  href={href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>

                {item.children?.length ? (
                  <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all absolute left-0 top-full mt-3 w-56 rounded-md border border-border bg-card p-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href || "#"}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href={joinCta.href}>
              <Button size={mapButtonSize(joinCta.buttonSize) ?? "sm"}>
                {joinCta.label}
              </Button>
            </Link>
          </div>

          {/* Desktop language dropdown */}
          <div className="relative hidden md:block" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              aria-haspopup="menu"
              aria-expanded={langOpen}
            >
              {activeLang}
              <span className="text-foreground/50">▾</span>
            </button>

            {langOpen ? (
              <div className="absolute right-0 top-full mt-3 w-20 rounded-md border border-border bg-card p-1 shadow-lg">
                {(languages.length ? languages : [{ code: "EN", isDefault: true }]).map(
                  (l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setActiveLang(l.code.toUpperCase());
                        setLangOpen(false);
                      }}
                      className={cn(
                        "w-full rounded-md px-3 py-2 text-left text-sm",
                        activeLang === l.code.toUpperCase()
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {l.code.toUpperCase()}
                    </button>
                  )
                )}
              </div>
            ) : null}
          </div>

          {/* Mobile language + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/90"
                aria-haspopup="menu"
                aria-expanded={langOpen}
              >
                {activeLang} <span className="text-foreground/50">▾</span>
              </button>
              {langOpen ? (
                <div className="absolute left-0 top-full mt-3 w-20 rounded-md border border-border bg-card p-1 shadow-lg">
                  {(languages.length ? languages : [{ code: "EN", isDefault: true }]).map(
                    (l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setActiveLang(l.code.toUpperCase());
                          setLangOpen(false);
                        }}
                        className={cn(
                          "w-full rounded-md px-3 py-2 text-left text-sm",
                          activeLang === l.code.toUpperCase()
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {l.code.toUpperCase()}
                      </button>
                    )
                  )}
                </div>
              ) : null}
            </div>
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/60"
            >
              <span className="flex flex-col gap-1">
                <span className="h-[2px] w-5 bg-accent" />
                <span className="h-[2px] w-5 bg-accent" />
                <span className="h-[2px] w-5 bg-accent" />
              </span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}

