import Image from "next/image";
import { RichTitle, type RichTitleValue } from "@/components/ui/RichTitle";

type HeroSectionProps = {
  backgroundImageUrl?: string | null;
  backgroundImageAlt?: string | null;
  backgroundImageMobileUrl?: string | null;
  backgroundImageMobileAlt?: string | null;
  backgroundColor?: string | null;
  heading: RichTitleValue;
  subheading?: string | null;
};

function isLocalStrapiAsset(url: string) {
  return (
    url.startsWith("http://localhost:1337/") ||
    url.startsWith("http://127.0.0.1:1337/")
  );
}

export function HeroSection({
  backgroundImageUrl,
  backgroundImageAlt,
  backgroundImageMobileUrl,
  backgroundImageMobileAlt,
  backgroundColor,
  heading,
  subheading,
}: HeroSectionProps) {
  const showImage = Boolean(backgroundImageUrl || backgroundImageMobileUrl);
  const style =
    !showImage && backgroundColor ? { backgroundColor } : undefined;

  return (
    <section
      className="relative -mt-20 flex min-h-[62svh] items-end justify-center overflow-hidden"
      style={style}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 hidden sm:block">
          {backgroundImageUrl ? (
            <Image
              src={backgroundImageUrl}
              alt={backgroundImageAlt ?? ""}
              fill
              priority
              sizes="100vw"
              unoptimized={isLocalStrapiAsset(backgroundImageUrl)}
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="absolute inset-0 sm:hidden">
          {backgroundImageMobileUrl || backgroundImageUrl ? (
            <Image
              src={backgroundImageMobileUrl ?? backgroundImageUrl!}
              alt={backgroundImageMobileAlt ?? backgroundImageAlt ?? ""}
              fill
              priority
              sizes="100vw"
              unoptimized={isLocalStrapiAsset(backgroundImageMobileUrl ?? backgroundImageUrl!)}
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.65)_75%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
        <div className="mx-auto max-w-3xl pb-12 sm:pb-16">
          <RichTitle
            as="h1"
            value={heading}
            className="text-[44px] font-semibold leading-[1.05] tracking-tight sm:text-[82px] sm:tracking-[-0.02em]"
            mainClassName="block"
            accentDisplay="block"
          />

          {subheading ? (
            <p className="mt-7 whitespace-pre-line text-[15px] leading-6 text-foreground/80 sm:mt-8 sm:text-[16px] sm:leading-7">
              {subheading}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

