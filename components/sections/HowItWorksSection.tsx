import { Section } from "@/components/layout/Section";
import { RichTitle, type RichTitleValue } from "@/components/ui/RichTitle";
import Image from "next/image";
import { cn } from "@/lib/cn";

type Step = {
  title: string;
  description?: string | null;
  iconUrl?: string | null;
  iconAlt?: string | null;
  iconWidth?: number | null;
  iconHeight?: number | null;
};

type HowItWorksSectionProps = {
  backgroundColor?: string | null;
  title: RichTitleValue;
  subtitle?: string | null;
  steps?: Step[];
};

export function HowItWorksSection({
  backgroundColor,
  title,
  subtitle,
  steps = [],
}: HowItWorksSectionProps) {
  return (
    <Section
      style={backgroundColor ? { backgroundColor } : undefined}
      className="relative"
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-5xl -translate-x-1/2",
          "bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.21)_0,rgba(255,255,255,0.21)_8px,transparent_8px,transparent_16px)]",
          "mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
          "[-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        )}
      />
      <div className="text-center">
        <RichTitle
          as="h2"
          value={title}
          className="text-[40px] font-semibold tracking-tight sm:text-[52px]"
        />
        {subtitle ? (
          <p className="mx-auto mt-5 max-w-[62ch] text-[14px] leading-6 text-foreground/80 sm:text-[15px] sm:leading-7">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="mt-14 grid gap-18 lg:grid-cols-3 lg:gap-10">
        {steps.map((s, idx) => {
          const number = String(idx + 1).padStart(2, "0");
          const iconW =
            typeof s.iconWidth === "number" && s.iconWidth > 0 ? s.iconWidth : 260;
          const iconH =
            typeof s.iconHeight === "number" && s.iconHeight > 0 ? s.iconHeight : 260;
          const hasManualSize =
            typeof s.iconWidth === "number" ||
            typeof s.iconHeight === "number";
          return (
            <div key={s.title} className="text-center">
              <div className="relative z-0 pointer-events-none select-none">
                {s.iconUrl ? (
                  <Image
                    src={s.iconUrl}
                    alt={s.iconAlt ?? ""}
                    width={iconW}
                    height={iconH}
                    unoptimized={isLocalStrapiAsset(s.iconUrl)}
                    style={
                      hasManualSize
                        ? {
                            width:
                              typeof s.iconWidth === "number" && s.iconWidth > 0
                                ? s.iconWidth
                                : undefined,
                            height:
                              typeof s.iconHeight === "number" && s.iconHeight > 0
                                ? s.iconHeight
                                : undefined,
                          }
                        : undefined
                    }
                    className={cn(
                      "mx-auto",
                      hasManualSize
                        ? ""
                        : "h-auto w-[140px] sm:w-[160px] lg:w-[180px]"
                    )}
                  />
                ) : (
                  <div className="text-[128px] font-semibold leading-none tracking-tight text-accent sm:text-[150px] lg:text-[170px]">
                    {number}
                  </div>
                )}
              </div>
              <div className="relative z-10 -mt-10 text-[24px] font-semibold leading-[1.08] sm:-mt-12 sm:text-[28px]">
                {s.title}
              </div>
              {s.description ? (
                <p className="relative z-10 mx-auto mt-5 max-w-[40ch] text-[14px] leading-6 text-foreground/80">
                  {s.description}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function isLocalStrapiAsset(url: string) {
  return (
    url.startsWith("http://localhost:1337/") ||
    url.startsWith("http://127.0.0.1:1337/")
  );
}

