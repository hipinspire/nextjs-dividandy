import Link from "next/link";
import Image from "next/image";
import { Button, type ButtonSize } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { IconGem } from "@/components/ui/icons";
import { RichTitle, type RichTitleValue } from "@/components/ui/RichTitle";

function isLocalStrapiAsset(url: string) {
  return (
    url.startsWith("http://localhost:1337/") ||
    url.startsWith("http://127.0.0.1:1337/")
  );
}

type Cta = { label: string; href: string; buttonSize?: ButtonSize };

type Legend = {
  avatarUrl?: string | null;
  avatarAlt?: string | null;
  name: string;
  meta?: string | null;
  tagLabel?: string | null;
  amountText?: string | null;
  percentText?: string | null;
};

type ArenaLegendsSectionProps = {
  backgroundColor?: string | null;
  backgroundImageUrl?: string | null;
  backgroundImageAlt?: string | null;
  title: RichTitleValue;
  subtitle?: string | null;
  cta?: Cta | null;
  items?: Legend[];
};

export function ArenaLegendsSection({
  backgroundColor,
  backgroundImageUrl,
  backgroundImageAlt,
  title,
  subtitle,
  cta,
  items = [],
}: ArenaLegendsSectionProps) {
  const showImage = Boolean(backgroundImageUrl);
  const style = !showImage && backgroundColor ? { backgroundColor } : undefined;

  return (
    <section
      className={cn(
        "relative min-h-[62svh] flex items-center justify-center overflow-hidden",
        !showImage && backgroundColor
          ? ""
          : !showImage
            ? "bg-[radial-gradient(120%_120%_at_30%_20%,rgba(35,116,135,0.55)_0%,rgba(4,8,11,0.92)_55%,rgba(4,8,11,1)_100%)]"
            : ""
      )}
      style={style}
    >
      {backgroundImageUrl ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImageUrl}
            alt={backgroundImageAlt ?? ""}
            fill
            sizes="100vw"
            unoptimized={isLocalStrapiAsset(backgroundImageUrl)}
            className="object-cover z-10"
            priority={false}
          />
          {/* keep the same gradient feel on top of the uploaded image */}
          {/* <div className="absolute inset-0 bg-black/35" /> */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_30%_20%,rgba(35,116,135,0.55)_0%,rgba(4,8,11,0.92)_55%,rgba(4,8,11,1)_100%)]" />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 py-24 lg:py-0">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <RichTitle
              as="h2"
              value={title}
              className="text-[44px] font-semibold leading-[1.03] tracking-tight sm:text-[56px]"
              mainClassName="block text-foreground"
              accentDisplay="block"
            />

            {subtitle ? (
              <p className="mt-5 max-w-[46ch] text-[14px] leading-6 text-foreground/75 sm:text-[15px] sm:leading-7">
                {subtitle}
              </p>
            ) : null}

            {cta?.href ? (
              <div className="mt-8">
                <Link href={cta.href}>
                  <Button
                    size={cta.buttonSize ?? "md"}
                    className="font-normal tracking-wide"
                  >
                    {cta.label || "Join the arena"}
                  </Button>
                </Link>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid gap-5">
              {items.map((it) => (
                <LegendRow key={it.name} item={it} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LegendRow({ item }: { item: Legend }) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-white/10 bg-white/5",
        "backdrop-blur-md shadow-(--shadow-soft)"
      )}
    >
      <div className="px-6 py-5">
        {/* Row 1 (mobile + desktop) */}
        <div className="flex items-center gap-5">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/10">
            {item.avatarUrl ? (
              <Image
                src={item.avatarUrl}
                alt={item.avatarAlt ?? ""}
                fill
                sizes="48px"
                unoptimized={isLocalStrapiAsset(item.avatarUrl)}
                className="object-cover"
              />
            ) : null}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <div className="truncate text-[16px] font-semibold text-foreground sm:text-[18px]">
                {item.name}
              </div>
              {item.tagLabel ? (
                <span className="hidden items-center gap-2 rounded-[4px] bg-accent px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-accent-foreground sm:inline-flex">
                  <IconGem className="h-4 w-4" />
                  {item.tagLabel}
                </span>
              ) : null}
            </div>

            {item.meta ? (
              <div className="mt-1 text-[12px] text-foreground/55">{item.meta}</div>
            ) : null}
          </div>

          {/* Amounts stay in row 1 on sm+ */}
          <div className="hidden text-right sm:block">
            {item.amountText ? (
              <div className="text-[14px] font-semibold text-foreground">
                {item.amountText}
              </div>
            ) : null}
            {item.percentText ? (
              <div className="mt-1 text-[12px] font-semibold text-accent">
                {item.percentText}
              </div>
            ) : null}
          </div>
        </div>

        {/* Mobile-only divider + row 2 */}
        {item.amountText || item.percentText || item.tagLabel ? (
          <>
            <div className="mt-5 border-t border-dashed border-white/15 sm:hidden" />
            <div className="mt-5 flex items-center justify-between gap-4 sm:hidden">
              <div className="flex min-w-0 items-center gap-2">
                {item.amountText ? (
                  <div className="truncate text-[16px] font-semibold text-foreground">
                    {item.amountText}
                  </div>
                ) : null}
                {item.percentText ? (
                  <div className="shrink-0 text-[12px] font-semibold text-accent">
                    {item.percentText}
                  </div>
                ) : null}
              </div>

              {item.tagLabel ? (
                <span className="inline-flex shrink-0 items-center gap-2 rounded-[4px] bg-accent px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-accent-foreground">
                  <IconGem className="h-4 w-4" />
                  {item.tagLabel}
                </span>
              ) : (
                <span />
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

