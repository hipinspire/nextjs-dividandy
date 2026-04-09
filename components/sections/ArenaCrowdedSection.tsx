import Image from "next/image";
import { RichTitle, type RichTitleValue } from "@/components/ui/RichTitle";

function isLocalStrapiAsset(url: string) {
  return (
    url.startsWith("http://localhost:1337/") ||
    url.startsWith("http://127.0.0.1:1337/")
  );
}

type Chip = {
  label: string;
  iconUrl?: string | null;
  iconAlt?: string | null;
};

type ArenaCrowdedSectionProps = {
  backgroundImageUrl?: string | null;
  backgroundImageAlt?: string | null;
  backgroundColor?: string | null;
  title: RichTitleValue;
  subtitle?: string | null;
  chips?: Chip[];
};

export function ArenaCrowdedSection({
  backgroundImageUrl,
  backgroundImageAlt,
  backgroundColor,
  title,
  subtitle,
  chips = [],
}: ArenaCrowdedSectionProps) {
  const showImage = Boolean(backgroundImageUrl);
  const style =
    !showImage && backgroundColor ? { backgroundColor } : undefined;

  return (
    <section className="relative min-h-[62svh] overflow-hidden" style={style}>
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
          <div className="absolute inset-0 bg-black/45" />
          {/* <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_15%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.75)_75%,rgba(0,0,0,0.92)_100%)]" /> */}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex min-h-[62svh] w-full max-w-6xl flex-col px-4 py-20 sm:px-6 sm:py-24">
        <div className="flex justify-center sm:justify-end">
          <div className="flex gap-1 sm:gap-2">
            {chips.map((c) => (
              <ChipPill key={c.label} chip={c} />
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <RichTitle
            as="h2"
            value={title}
            className="text-[48px] font-semibold leading-[1.02] tracking-tight sm:text-[60px] max-w-[400px]"
            mainClassName="text-foreground"
          />
          {subtitle ? (
            <p className="mt-4 max-w-[52ch] text-[14px] leading-6 text-foreground/75 sm:text-[15px] sm:leading-7">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ChipPill({ chip }: { chip: Chip }) {
  return (
    <div className="text-center relative">
      <div className="mx-auto grid h-[120px] w-[120px] place-items-center sm:h-[135px] sm:w-[135px]">
        {chip.iconUrl ? (
          <Image
            src={chip.iconUrl}
            alt={chip.iconAlt ?? ""}
            width={88}
            height={88}
            unoptimized={isLocalStrapiAsset(chip.iconUrl)}
            className="h-full w-full object-contain"
          />
        ) : null}
      </div>
      <div className="text-[16px] font-medium text-white absolute bottom-0 left-[40%]">
        {chip.label}
      </div>
    </div>
  );
}

