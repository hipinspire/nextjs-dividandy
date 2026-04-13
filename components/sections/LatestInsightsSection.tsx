"use client";

import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Button, type ButtonSize } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { RichTitle, type RichTitleValue } from "@/components/ui/RichTitle";
import { useEffect, useMemo, useRef, useState } from "react";

type Insight = {
  title: string;
  excerpt?: string | null;
  dateLabel?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  href?: string | null;
};

type LatestInsightsSectionProps = {
  backgroundColor?: string | null;
  title: RichTitleValue;
  viewAll?: { label: string; href: string; buttonSize?: ButtonSize } | null;
  items?: Insight[];
};

function isLocalStrapiAsset(url: string) {
  return (
    url.startsWith("http://localhost:1337/") ||
    url.startsWith("http://127.0.0.1:1337/")
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M19 12H7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LatestInsightsSection({
  backgroundColor,
  title,
  viewAll,
  items = [],
}: LatestInsightsSectionProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  // Use `null` initially to avoid SSR/CSR hydration mismatches for boolean attributes
  // like `disabled` while we haven't measured scroll state yet.
  const [canPrev, setCanPrev] = useState<boolean | null>(null);
  const [canNext, setCanNext] = useState<boolean | null>(null);

  const hasItems = items.length > 0;

  const stepPx = useMemo(() => {
    // Fallback value used until the first layout pass.
    return 360;
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const compute = () => {
      const max = el.scrollWidth - el.clientWidth;
      const left = el.scrollLeft;
      setCanPrev(left > 4);
      setCanNext(left < max - 4);
    };

    compute();
    el.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      el.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [items.length]);

  const scrollByOne = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-slide]");
    const styles = window.getComputedStyle(el);
    const gapRaw = styles.columnGap || styles.gap || "0px";
    const gap = Number.parseFloat(gapRaw) || 0;
    const w = first?.getBoundingClientRect().width ?? stepPx;
    el.scrollBy({ left: dir * (w + gap), behavior: "smooth" });
  };

  return (
    <Section style={backgroundColor ? { backgroundColor } : undefined} as="section">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <RichTitle
          as="h2"
          value={title}
          className="text-[34px] font-semibold tracking-tight sm:text-[44px]"
          mainClassName="text-foreground"
        />

        <div className="flex items-center gap-3">
          {viewAll?.href ? (
            <Link href={viewAll.href} className="shrink-0">
              <Button
                size={viewAll.buttonSize ?? "sm"}
                className={cn(
                  "h-12 px-6 text-[16px] font-normal tracking-wide uppercase",
                  "text-accent-foreground"
                )}
              >
                {viewAll.label || "View all"}
                <IconArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : null}

          {/* Slider controls */}
          {hasItems ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByOne(-1)}
                disabled={canPrev === null ? undefined : !canPrev}
                aria-label="Previous insights"
                className={cn(
                  "grid h-12 w-12 place-items-center rounded-full border",
                  "border-accent/40 text-accent",
                  "bg-black/10 hover:bg-accent/10 transition-colors",
                  "disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                <IconArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByOne(1)}
                disabled={canNext === null ? undefined : !canNext}
                aria-label="Next insights"
                className={cn(
                  "grid h-12 w-12 place-items-center rounded-full border",
                  "border-accent/40 text-accent",
                  "bg-black/10 hover:bg-accent/10 transition-colors",
                  "disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                <IconArrowRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div
        ref={scrollerRef}
        className={cn(
          "mt-10 flex gap-6 overflow-x-auto pb-2",
          "snap-x snap-mandatory",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        )}
        aria-label="Latest insights slider"
      >
        {items.map((it, idx) => (
          <div
            key={`${it.title}:${idx}`}
            data-slide
            className={cn(
              "snap-start shrink-0",
              "w-[280px] sm:w-[320px] lg:w-[340px]"
            )}
          >
            <InsightCard insight={it} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function InsightCard({ insight }: { insight: Insight }) {
  const cardInner = (
    <div
      className={cn(
        "overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/5",
        "backdrop-blur-md shadow-(--shadow-soft)"
      )}
    >
      <div className="relative h-[170px] w-full bg-white/5">
        {insight.imageUrl ? (
          <Image
            src={insight.imageUrl}
            alt={insight.imageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 340px, 320px"
            unoptimized={isLocalStrapiAsset(insight.imageUrl)}
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.28)_85%,rgba(0,0,0,0.42)_100%)]" />
      </div>

      <div className="p-6">
        <div className="text-[24px] font-semibold leading-6 text-foreground">
          {insight.title}
        </div>

        {insight.excerpt ? (
          <p className="mt-2 min-h-[44px] text-[16px] leading-5 text-foreground/55">
            {insight.excerpt}
          </p>
        ) : (
          <div className="mt-2 min-h-[44px]" />
        )}

        <div className="mt-5 border-t border-dashed border-white" />

        <div className="mt-5 flex items-center justify-between gap-4">
          {insight.dateLabel ? (
            <span className="inline-flex items-center rounded-[4px] bg-accent px-3 py-1 text-[16px] font-semibold tracking-wide text-black">
              {insight.dateLabel}
            </span>
          ) : (
            <span />
          )}

          {insight.href ? (
            <Link
              href={insight.href}
              className="inline-flex items-center gap-2 text-[15px] font-semibold tracking-wide text-foreground/85 hover:text-foreground transition-colors"
            >
              READ MORE <IconArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 text-[15px] font-semibold tracking-wide text-foreground/40">
              READ MORE <IconArrowRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return cardInner;
}

