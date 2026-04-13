import Link from "next/link";
import Image from "next/image";
import { Button, type ButtonSize } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { IconCheck } from "@/components/ui/icons";
import { RichTitle, type RichTitleValue } from "@/components/ui/RichTitle";

function isLocalStrapiAsset(url: string) {
  return (
    url.startsWith("http://localhost:1337/") ||
    url.startsWith("http://127.0.0.1:1337/")
  );
}

type Cta = { label: string; href: string; buttonSize?: ButtonSize };
type Bullet = { text: string };

type FeelEnergySectionProps = {
  backgroundColor?: string | null;
  title: RichTitleValue;
  subtitle?: string | null;
  bullets?: Bullet[];
  cta?: Cta | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

export function FeelEnergySection({
  backgroundColor,
  title,
  subtitle,
  bullets = [],
  cta,
  imageUrl,
  imageAlt,
}: FeelEnergySectionProps) {
  return (
    <section
      className="relative py-14 sm:py-0 min-h-[62svh] overflow-hidden"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 z-20 h-px w-full max-w-5xl -translate-x-1/2",
          "bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.21)_0,rgba(255,255,255,0.21)_8px,transparent_8px,transparent_16px)]",
          "mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
          "[-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        )}
      />

      {imageUrl ? (
        <div className="absolute inset-y-0 left-0 hidden w-1/2 lg:flex lg:items-center">
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              alt={imageAlt ?? ""}
              fill
              sizes="50vw"
              unoptimized={isLocalStrapiAsset(imageUrl)}
              className="object-contain object-left"
            />
          </div>
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex min-h-[62svh] w-full max-w-6xl flex-col px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:items-center">
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7 lg:pl-10">
          <RichTitle
            as="h2"
            value={title}
            className="text-[44px] font-semibold leading-[1.03] tracking-tight sm:text-[56px]"
            mainClassName="text-foreground"
          />
          {subtitle ? (
            <p className="mt-5 max-w-[48ch] text-[14px] leading-7 text-white sm:text-[16px]">
              {subtitle}
            </p>
          ) : null}

          <div className="mt-8 grid gap-4">
            {bullets.map((b) => (
              <div key={b.text} className="flex items-start gap-4">
                <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-accent text-accent-foreground">
                  <IconCheck className="h-4 w-4" />
                </span>
                <div className="text-[16px] font-medium leading-7 text-white">
                  {b.text}
                </div>
              </div>
            ))}
          </div>

          {cta?.href ? (
            <div className="mt-10">
              <Link href={cta.href}>
                <Button size={cta.buttonSize ?? "lg"} className="font-normal tracking-wide">
                  {cta.label || "Join the arena"}
                </Button>
              </Link>
            </div>
          ) : null}
        </div>

        <div className="order-2 -mx-4 sm:-mx-6 lg:hidden">
          <div className="relative aspect-4/3 w-full">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt ?? ""}
                fill
                sizes="100vw"
                unoptimized={isLocalStrapiAsset(imageUrl)}
                className="object-contain object-center"
              />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.18)_68%,rgba(0,0,0,0.52)_100%)]" />
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-6" />
      </div>
    </section>
  );
}

