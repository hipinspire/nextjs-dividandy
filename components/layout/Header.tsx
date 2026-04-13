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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setLangOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

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
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                setLangOpen(false);
                setMobileMenuOpen((v) => !v);
              }}
              className={cn(
                "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/60 transition-colors duration-300",
                mobileMenuOpen && "border-accent bg-accent/10"
              )}
            >
              <span className="relative block h-5 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-[2px] w-5 -translate-y-[7px] bg-accent transition-transform duration-300",
                    mobileMenuOpen && "translate-y-0 rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 bg-accent transition-all duration-300",
                    mobileMenuOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-[2px] w-5 translate-y-[5px] bg-accent transition-transform duration-300",
                    mobileMenuOpen && "translate-y-0 -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

      <div
        className={cn(
          "md:hidden",
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <button
          type="button"
          aria-label="Close mobile menu overlay"
          className={cn(
            "fixed inset-0 z-40 bg-black/55 backdrop-blur-sm transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          id="mobile-navigation"
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex h-dvh w-full max-w-sm flex-col overflow-y-auto border-l border-white/10 bg-[#05080B]/95 px-6 pb-8 pt-24 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            aria-label="Close mobile menu"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/60 bg-black/20 transition-colors duration-300 hover:border-accent hover:bg-accent/10"
          >
            <span className="relative block h-4 w-4">
              <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 rotate-45 bg-accent transition-transform duration-300 hover:scale-110" />
              <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 -rotate-45 bg-accent transition-transform duration-300 hover:scale-110" />
            </span>
          </button>

          <div className="space-y-3">
            {effectiveNav.map((item) => {
              const href = item.href ?? "#";

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/3 px-5 py-4"
                >
                  <Link
                    href={href}
                    className="block text-lg font-semibold text-foreground transition-colors hover:text-accent"
                    onClick={() => setMobileMenuOpen(false)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                  >
                    {item.label}
                  </Link>

                  {item.children?.length ? (
                    <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href || "#"}
                          className="block text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                          target={child.external ? "_blank" : undefined}
                          rel={child.external ? "noreferrer" : undefined}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Link href={joinCta.href} onClick={() => setMobileMenuOpen(false)}>
              <Button size={mapButtonSize(joinCta.buttonSize) ?? "md"} className="w-full">
                {joinCta.label}
              </Button>
            </Link>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/45">
              Language
            </div>
            <div className="flex flex-wrap gap-3">
              {(languages.length ? languages : [{ code: "EN", isDefault: true }]).map((l) => {
                const code = l.code.toUpperCase();
                const isActive = activeLang === code;

                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setActiveLang(code)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                      isActive
                        ? "border-accent bg-accent text-background"
                        : "border-white/10 text-foreground/70 hover:border-accent/60 hover:text-foreground"
                    )}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

