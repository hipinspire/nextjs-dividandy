"use client";

import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/cn";
import { IconCrown, IconEye, IconSwords, IconTrophy } from "@/components/ui/icons";
import { RichTitle, type RichTitleValue } from "@/components/ui/RichTitle";
import { useEffect, useRef, useState } from "react";

type FeatureItem = {
  title: string;
  description?: string | null;
  iconKey?: "trophy" | "crown" | "swords" | "eye" | null;
};

type WhyDividandySectionProps = {
  backgroundColor?: string | null;
  title: RichTitleValue;
  items?: FeatureItem[];
};

export function WhyDividandySection({
  backgroundColor,
  title,
  items = [],
}: WhyDividandySectionProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const updateControlsRef = useRef<(() => void) | null>(null);
  const [canPrev, setCanPrev] = useState<boolean | null>(null);
  const [canNext, setCanNext] = useState<boolean | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const compute = () => {
      const max = el.scrollWidth - el.clientWidth;
      const left = el.scrollLeft;
      setCanPrev(left > 4);
      setCanNext(left < max - 4);
    };

    updateControlsRef.current = compute;
    compute();
    el.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      el.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
      if (updateControlsRef.current === compute) updateControlsRef.current = null;
    };
  }, [items.length]);

  const scrollByOne = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-slide]");
    const styles = window.getComputedStyle(el);
    const gapRaw = styles.columnGap || styles.gap || "0px";
    const gap = Number.parseFloat(gapRaw) || 0;
    const w = first?.getBoundingClientRect().width ?? 320;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const nextLeft = Math.min(max, Math.max(0, el.scrollLeft + dir * (w + gap)));
    el.scrollTo({ left: nextLeft, behavior: "smooth" });
    // Some browsers are inconsistent about emitting `scroll` events for programmatic
    // smooth scrolling; force a control-state recompute on the next frame.
    requestAnimationFrame(() => {
      updateControlsRef.current?.();
    });
  };

  return (
    <Section style={backgroundColor ? { backgroundColor } : undefined}>
      <div className="text-center">
        <RichTitle
          as="h2"
          value={title}
          className="text-[34px] font-semibold tracking-tight sm:text-[44px]"
        />
      </div>

      {/* Desktop/tablet grid */}
      <div className="mt-10 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, idx) => (
          <FeatureCard key={`${it.title}:${idx}`} item={it} />
        ))}
      </div>

      {/* Mobile slider */}
      <div className="mt-10 sm:hidden">
        <div
          ref={scrollerRef}
          className={cn(
            "flex gap-4 overflow-x-auto pb-4",
            "snap-x snap-mandatory",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          )}
          aria-label="Why Dividandy slider"
        >
          {items.map((it, idx) => (
            <div
              key={`${it.title}:${idx}`}
              data-slide
              className="snap-start shrink-0 w-[320px]"
            >
              <FeatureCard item={it} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => scrollByOne(-1)}
            disabled={canPrev === null ? undefined : !canPrev}
            aria-label="Previous card"
            className={cn(
              "grid h-12 w-12 place-items-center rounded-full border",
              "border-accent/40 text-accent",
              "bg-black/10 hover:bg-accent/10 transition-colors",
              "disabled:opacity-30 disabled:cursor-not-allowed"
            )}
          >
            <span className="text-[18px] leading-none">←</span>
          </button>
          <button
            type="button"
            onClick={() => scrollByOne(1)}
            disabled={canNext === null ? undefined : !canNext}
            aria-label="Next card"
            className={cn(
              "grid h-12 w-12 place-items-center rounded-full border",
              "border-accent/40 text-accent",
              "bg-black/10 hover:bg-accent/10 transition-colors",
              "disabled:opacity-30 disabled:cursor-not-allowed"
            )}
          >
            <span className="text-[18px] leading-none">→</span>
          </button>
        </div>
      </div>
    </Section>
  );
}

function FeatureCard({
  item,
}: {
  item: FeatureItem;
}) {
  return (
    <div
      className={cn(
        "group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[24px] px-5 py-5",
        "shadow-(--shadow-mega)",
        "bg-[#0b1217] text-foreground border border-white/10",
        "transition-colors duration-200",
        // hover state (matches the neon card in the design)
        "hover:bg-accent hover:border-transparent hover:text-[#05242E]"
      )}
    >
      <div
        className={cn(
          "absolute right-6 top-6 grid h-14 w-14 place-items-center rounded-full",
          "bg-white/5 transition-colors duration-200",
          "group-hover:bg-black/10"
        )}
      >
        <FeatureIcon
          iconKey={item.iconKey ?? null}
          className={cn(
            "h-7 w-7",
            "text-accent transition-colors duration-200",
            "group-hover:text-[#05242E]"
          )}
        />
      </div>

      <div>
        <div
          className={cn(
            "text-[24px] font-semibold leading-[1.15]",
            "text-foreground transition-colors duration-200",
            "group-hover:text-[#05242E]"
          )}
        >
          {item.title}
        </div>
        {item.description ? (
          <p
            className={cn(
              "mt-4 text-[16px] leading-6",
              "text-foreground/55 transition-colors duration-200",
              "group-hover:text-[#05242E]/70"
            )}
          >
            {item.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function FeatureIcon({
  iconKey,
  className,
}: {
  iconKey: FeatureItem["iconKey"];
  className?: string;
}) {
  switch (iconKey) {
    case "trophy":
      return <IconTrophy className={className} />;
    case "crown":
      return <IconCrown className={className} />;
    case "swords":
      return <IconSwords className={className} />;
    case "eye":
      return <IconEye className={className} />;
    default:
      return null;
  }
}

