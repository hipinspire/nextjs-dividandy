import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button, type ButtonSize } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { IconAndroid, IconApple } from "@/components/ui/icons";
import { RichTitle, type RichTitleValue } from "@/components/ui/RichTitle";
import Image from "next/image";

function isLocalStrapiAsset(url: string) {
  return (
    url.startsWith("http://localhost:1337/") ||
    url.startsWith("http://127.0.0.1:1337/")
  );
}

type LinkItem = { label: string; href: string; buttonSize?: ButtonSize };

type LeftCard = {
  statusLabel?: string | null;
  title: string;
  subtitle?: string | null;
  iconUrl?: string | null;
  iconAlt?: string | null;
  cta?: LinkItem | null;
};

type RightCard = {
  statusLabel?: string | null;
  title: string;
  subtitle?: string | null;
  iconUrl?: string | null;
  iconAlt?: string | null;
  emailPlaceholder?: string | null;
  buttonLabel?: string | null;
  buttonSize?: ButtonSize;
};

type DownloadAppSectionProps = {
  backgroundColor?: string | null;
  backgroundImageUrl?: string | null;
  backgroundImageAlt?: string | null;
  title: RichTitleValue;
  subtitle?: string | null;
  leftCard?: LeftCard | null;
  rightCard?: RightCard | null;
};

export function DownloadAppSection({
  backgroundColor,
  backgroundImageUrl,
  backgroundImageAlt,
  title,
  subtitle,
  leftCard,
  rightCard,
}: DownloadAppSectionProps) {
  const showImage = Boolean(backgroundImageUrl);
  return (
    <Section
      className={cn(
        "relative overflow-hidden scroll-mt-24 text-accent-foreground",
        showImage ? "" : "ui-grain",
        !showImage ? (backgroundColor ? "" : "bg-accent") : ""
      )}
      containerClassName="!max-w-4xl py-18 sm:py-22"
      as="section"
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

      <div className="relative z-10">
      <div id="download" className="scroll-mt-24" />

      <div className="text-left sm:text-center">
        <RichTitle
          as="h2"
          value={title}
          className="text-[44px] font-semibold leading-[1.02] tracking-tight sm:text-[64px]"
        />
        {subtitle ? (
          <p className="mt-4 max-w-[60ch] text-[14px] leading-6 text-accent-foreground/75 sm:mx-auto sm:mt-5 sm:max-w-[64ch] sm:text-[16px] sm:leading-7">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2 md:gap-8">
        <LeftDownloadCard card={leftCard} />
        <RightDownloadCard card={rightCard} />
      </div>
      </div>
    </Section>
  );
}

function LeftDownloadCard({ card }: { card?: LeftCard | null }) {
  if (!card) return null;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl text-foreground",
        "bg-[radial-gradient(120%_120%_at_30%_0%,rgba(18,32,38,1)_0%,rgba(6,11,14,1)_55%,rgba(5,8,11,1)_100%)]",
        "shadow-(--shadow-mega)"
      )}
    >
      <div className="absolute right-8 top-8 md:right-10 md:top-10">
        {card.iconUrl ? (
          <Image
            src={card.iconUrl}
            alt={card.iconAlt ?? ""}
            width={64}
            height={64}
            unoptimized={isLocalStrapiAsset(card.iconUrl)}
            className="h-16 w-16 object-contain"
          />
        ) : (
          <div className="text-accent/90">
            <IconAndroid className="h-16 w-16" />
          </div>
        )}
      </div>

      <div className="flex min-h-[400px] flex-col justify-end p-4 sm:p-6">
        <div className="flex items-center gap-3 text-[12px] font-semibold tracking-wide text-accent">
          <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_6px_rgba(204,255,0,0.14)]" />
          <span>{card.statusLabel ?? "AVAILABLE NOW"}</span>
        </div>

        <div className="mt-5 text-[32px] font-semibold leading-[1.05] tracking-tight sm:text-[40px]">
          {card.title}
        </div>
        {card.subtitle ? (
          <div className="mt-2 text-[14px] leading-6 text-foreground/55">
            {card.subtitle}
          </div>
        ) : null}

        <div className="pt-6">
          {card.cta?.href ? (
            <Link href={card.cta.href} className="block">
              <Button className="w-full font-semibold" size={card.cta.buttonSize ?? "lg"}>
                {card.cta.label || "Get the app"}
              </Button>
            </Link>
          ) : (
            <Button
              className="w-full font-semibold"
              size={card.cta?.buttonSize ?? "lg"}
              type="button"
            >
              {card.cta?.label || "Get the app"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function RightDownloadCard({ card }: { card?: RightCard | null }) {
  if (!card) return null;
  const size = card.buttonSize ?? "sm";
  const inputSizeClass =
    size === "sm" ? "h-9" : size === "md" ? "h-11" : "h-12";
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-transparent text-accent-foreground",
        "border border-black/35 shadow-(--shadow-soft)"
      )}
    >
      <div className="absolute right-8 top-8 md:right-10 md:top-10">
        {card.iconUrl ? (
          <Image
            src={card.iconUrl}
            alt={card.iconAlt ?? ""}
            width={64}
            height={64}
            unoptimized={isLocalStrapiAsset(card.iconUrl)}
            className="h-16 w-16 object-contain"
          />
        ) : (
          <div className="text-accent-foreground/90">
            <IconApple className="h-16 w-16" />
          </div>
        )}
      </div>

      <div className="flex min-h-[400px] flex-col justify-end p-4 sm:p-6">
        <div className="flex items-center gap-3 text-[12px] font-semibold tracking-wide text-accent-foreground/80">
          <span className="inline-flex items-center justify-center text-accent-foreground/80">
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="20" height="20" fill="white" fillOpacity="0.01" style={{ mixBlendMode: "multiply" }} />
              <path d="M13.125 18.75C12.1361 18.75 11.1694 18.4568 10.3471 17.9073C9.5249 17.3579 8.88404 16.577 8.5056 15.6634C8.12716 14.7498 8.02815 13.7445 8.22107 12.7745C8.414 11.8046 8.8902 10.9137 9.58947 10.2145C10.2887 9.5152 11.1796 9.039 12.1495 8.84607C13.1195 8.65315 14.1248 8.75216 15.0384 9.1306C15.952 9.50904 16.7329 10.1499 17.2823 10.9721C17.8318 11.7944 18.125 12.7611 18.125 13.75C18.125 15.0761 17.5982 16.3479 16.6605 17.2855C15.7229 18.2232 14.4511 18.75 13.125 18.75ZM13.125 10C12.3833 10 11.6583 10.2199 11.0416 10.632C10.4249 11.044 9.94428 11.6297 9.66045 12.3149C9.37662 13.0002 9.30236 13.7542 9.44705 14.4816C9.59175 15.209 9.9489 15.8772 10.4733 16.4017C10.9978 16.9261 11.666 17.2833 12.3934 17.4279C13.1208 17.5726 13.8748 17.4984 14.5601 17.2145C15.2453 16.9307 15.831 16.4501 16.243 15.8334C16.6551 15.2167 16.875 14.4917 16.875 13.75C16.875 12.7554 16.4799 11.8016 15.7767 11.0983C15.0734 10.3951 14.1196 10 13.125 10Z" fill="currentColor" />
              <path d="M14.1187 15.625L12.5 14.0063V11.25H13.75V13.4937L15 14.7437L14.1187 15.625Z" fill="currentColor" />
              <path d="M17.5 3.75C17.5 3.41848 17.3683 3.10054 17.1339 2.86612C16.8995 2.6317 16.5815 2.5 16.25 2.5H13.75V1.25H12.5V2.5H7.5V1.25H6.25V2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H6.25V16.25H3.75V3.75H6.25V5H7.5V3.75H12.5V5H13.75V3.75H16.25V7.5H17.5V3.75Z" fill="currentColor" />
            </svg>
          </span>
          <span>{card.statusLabel ?? "COMING SOON"}</span>
        </div>

        <div className="mt-5 text-[34px] font-semibold leading-[1.05] tracking-tight sm:text-[40px]">
          {card.title}
        </div>
        {card.subtitle ? (
          <div className="mt-2 text-[14px] leading-6 text-accent-foreground/70">
            {card.subtitle}
          </div>
        ) : null}

        <div className="pt-6">
          <div className="flex items-center gap-3 rounded-full border border-black/35 bg-black/10 p-1 pl-5">
            <input
              type="email"
              placeholder={card.emailPlaceholder ?? "Enter your email..."}
              className={cn(
                inputSizeClass,
                "w-full bg-transparent text-[14px] text-accent-foreground placeholder:text-accent-foreground/55 focus:outline-none"
              )}
            />
            <Button
              className="shrink-0 bg-black text-accent! hover:bg-black/90"
              size={size}
              type="button"
            >
              {card.buttonLabel ?? "Join Waitlist"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

