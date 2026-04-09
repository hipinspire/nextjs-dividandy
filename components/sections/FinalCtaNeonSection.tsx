import Link from "next/link";
import Image from "next/image";
import { Button, type ButtonSize } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { RichTitle, type RichTitleValue } from "@/components/ui/RichTitle";

function isLocalStrapiAsset(url: string) {
  return (
    url.startsWith("http://localhost:1337/") ||
    url.startsWith("http://127.0.0.1:1337/")
  );
}

type Cta = { label: string; href: string; buttonSize?: ButtonSize };

type FinalCtaNeonSectionProps = {
  backgroundColor?: string | null;
  backgroundImageUrl?: string | null;
  backgroundImageAlt?: string | null;
  topTitle: RichTitleValue;
  bottomTitle: RichTitleValue;
  subtitle?: string | null;
  cta?: Cta | null;
};

export function FinalCtaNeonSection({
  backgroundColor,
  backgroundImageUrl,
  backgroundImageAlt,
  topTitle,
  bottomTitle,
  subtitle,
  cta,
}: FinalCtaNeonSectionProps) {
  const showImage = Boolean(backgroundImageUrl);
  return (
    <section
      className={cn(
        "relative min-h-[450px] overflow-hidden text-accent-foreground ui-grain",
        !showImage && (backgroundColor ? "" : "bg-accent")
      )}
      style={!showImage && backgroundColor ? { backgroundColor } : undefined}
    >
      {backgroundImageUrl ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundImageUrl}
            alt={backgroundImageAlt ?? ""}
            fill
            sizes="100vw"
            unoptimized={isLocalStrapiAsset(backgroundImageUrl)}
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex min-h-[450px] w-full max-w-6xl items-center px-4 py-16 sm:px-6 sm:py-20">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-4/5 text-center lg:text-left">
              <RichTitle
                as="h2"
                value={topTitle}
                className="w-full whitespace-pre-line text-[44px] font-semibold leading-[0.95] tracking-tight text-accent-foreground sm:text-[72px] xl:text-[96px]"
                mainClassName="text-accent-foreground"
                accentClassName="text-accent-foreground"
                accentLeadingSpace={true}
              />
              
              <div className="mt-6 grid w-full gap-0 lg:mt-0 lg:grid-cols-5 lg:items-end text-center lg:text-left">
                <RichTitle
                  as="h2"
                  value={bottomTitle}
                  className="whitespace-pre-line text-[44px] font-semibold leading-[0.95] tracking-tight text-accent-foreground sm:text-[72px] lg:col-span-3 xl:text-[96px]"
                  mainClassName="text-accent-foreground"
                  accentClassName="text-accent-foreground"
                  accentLeadingSpace={true}
                />

                {subtitle ? (
                  <p className="text-[18px] leading-[1.3] text-accent-foreground/90 sm:text-[20px] lg:col-span-2 lg:leading-[1.35] mt-4 lg:mt-0">
                    {subtitle}
                  </p>
                ) : (
                  <div className="hidden lg:block lg:col-span-2" />
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/5">
              {cta?.href ? (
                <div className="mt-10 w-full text-center lg:mt-8 lg:text-right">
                  <Link href={cta.href}>
                    <Button
                      className="min-w-[250px] bg-black text-accent! hover:bg-black/92 sm:min-w-[440px] lg:min-w-0 lg:px-8 lg:text-[15px]"
                      size={cta.buttonSize ?? "lg"}
                    >
                      {cta.label || "Download The App"}
                    </Button>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

