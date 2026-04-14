import Link from "next/link";
import { Button, type ButtonSize } from "@/components/ui/Button";
import Image from "next/image";
import { RichTitle, type RichTitleValue } from "@/components/ui/RichTitle";

function isLocalStrapiAsset(url: string) {
  return (
    url.startsWith("http://localhost:1337/") ||
    url.startsWith("http://127.0.0.1:1337/")
  );
}

type Cta = { label: string; href: string; buttonSize?: ButtonSize };

type CtaMarketsLiveSectionProps = {
  backgroundVideoUrl?: string | null;
  backgroundImageUrl?: string | null;
  backgroundImageAlt?: string | null;
  backgroundColor?: string | null;
  title: RichTitleValue;
  subtitle?: string | null;
  cta?: Cta | null;
};

function BackgroundVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string | null;
}) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster ?? undefined}
      aria-hidden="true"
      className="h-full w-full object-cover"
    >
      <source src={src} />
    </video>
  );
}

export function CtaMarketsLiveSection({
  backgroundVideoUrl,
  backgroundImageUrl,
  backgroundImageAlt,
  backgroundColor,
  title,
  subtitle,
  cta,
}: CtaMarketsLiveSectionProps) {
  const showMedia = Boolean(backgroundVideoUrl || backgroundImageUrl);
  const style =
    !showMedia && backgroundColor ? { backgroundColor } : undefined;
  return (
    <section
      className="relative min-h-[62svh] overflow-hidden bg-[#05080B]"
      style={style}
    >
      {backgroundVideoUrl || backgroundImageUrl ? (
        <div className="absolute inset-0">
          {backgroundVideoUrl ? (
            <BackgroundVideo src={backgroundVideoUrl} poster={backgroundImageUrl} />
          ) : (
            <Image
              src={backgroundImageUrl!}
              alt={backgroundImageAlt ?? ""}
              fill
              sizes="100vw"
              unoptimized={isLocalStrapiAsset(backgroundImageUrl!)}
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_25%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.75)_78%,rgba(0,0,0,0.92)_100%)]" />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex min-h-[62svh] w-full max-w-6xl items-end px-4 pb-18 sm:px-6 sm:pb-24">
        <div className="w-full">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <RichTitle
                as="h2"
                value={title}
                className="whitespace-pre-line text-[40px] font-semibold leading-[1.03] tracking-tight sm:text-[56px] lg:text-[64px]"
                mainClassName="text-foreground"
                accentLeadingSpace={false}
              />
            </div>

            <div className="lg:col-span-5 lg:pb-3">
              {subtitle ? (
                <p className="max-w-[44ch] text-[14px] leading-6 text-foreground/75 sm:text-[15px] sm:leading-7">
                  {subtitle}
                </p>
              ) : null}

              {cta?.href ? (
                <div className="mt-6">
                  <Link href={cta.href}>
                    <Button size={cta.buttonSize ?? "lg"}>
                      {cta.label || "Join the arena"}
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

