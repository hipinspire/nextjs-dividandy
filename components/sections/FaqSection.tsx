"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/cn";
import { IconChevronDown } from "@/components/ui/icons";
import { RichTitle, type RichTitleValue } from "@/components/ui/RichTitle";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  backgroundColor?: string | null;
  title: RichTitleValue;
  subtitle?: string | null;
  items?: FaqItem[];
};

export function FaqSection({
  backgroundColor,
  title,
  subtitle,
  items = [],
}: FaqSectionProps) {
  const defaultOpenIndex = useMemo(() => (items.length > 0 ? 0 : null), [items]);
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const { leftColumnItems, rightColumnItems } = useMemo(() => {
    const indexedItems = items.map((item, index) => ({ item, index }));

    if (indexedItems.length === 5) {
      return {
        leftColumnItems: indexedItems.slice(0, 2),
        rightColumnItems: indexedItems.slice(2),
      };
    }

    const midpoint = Math.ceil(indexedItems.length / 2);
    return {
      leftColumnItems: indexedItems.slice(0, midpoint),
      rightColumnItems: indexedItems.slice(midpoint),
    };
  }, [items]);

  return (
    <Section
      className="relative py-14! sm:py-20! overflow-hidden"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="text-center">
        <RichTitle
          as="h2"
          value={title}
          className="text-[44px] font-semibold tracking-tight sm:text-[56px]"
        />
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-[70ch] text-[14px] leading-6 text-foreground/70 sm:text-[15px] sm:leading-7">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="mt-12 space-y-6 lg:hidden">
        {items.map((it, index) => (
          <FaqCard
            key={`${it.question}-${index}`}
            item={it}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>

      <div className="mt-12 hidden lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="space-y-6">
          {leftColumnItems.map(({ item, index }) => {
            return (
              <FaqCard
                key={`${item.question}-${index}`}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            );
          })}
        </div>

        <div className="space-y-6">
          {rightColumnItems.map(({ item, index }) => {
            return (
              <FaqCard
                key={`${item.question}-${index}`}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function FaqCard({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-[#0b1217]",
        "shadow-(--shadow-mega) overflow-hidden"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-8 py-7 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[18px] font-semibold leading-[1.2] text-white sm:text-[24px]">
          {item.question}
        </span>
        <span
          className={cn(
            "grid h-9 w-9 place-items-center",
            "text-accent transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
          <IconChevronDown className="h-5 w-5" />
        </span>
      </button>

      {isOpen ? (
        <div className="px-8 pb-8">
          <div className="border-t border-dashed border-white/15 pt-6" />
          <p className="text-[18px] leading-7 text-white">{item.answer}</p>
        </div>
      ) : null}
    </div>
  );
}

