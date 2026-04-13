import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";
import Image from "next/image";
import {
  IconAdult,
  IconInstagram,
  IconTwitch,
  IconX,
  IconYouTube,
} from "@/components/ui/icons";
import { LanguageInline } from "@/components/i18n/LanguageUI";

export type LinkItem = { label: string; href: string };
export type FooterColumn = { title: string; links?: LinkItem[] };
export type SocialLink = { platform: string; href: string };
export type FooterLanguage = { code: string; isDefault?: boolean };

function isLocalStrapiAsset(url: string) {
  return (
    url.startsWith("http://localhost:1337/") ||
    url.startsWith("http://127.0.0.1:1337/")
  );
}

type FooterProps = {
  brandText?: string;
  logoUrl?: string | null;
  logoAlt?: string | null;
  logoSubtitle?: string | null;
  legalMenu?: FooterColumn | null;
  contactBlock?: { title: string; email: string } | null;
  socialsBlock?: { title: string; links?: SocialLink[] } | null;
  separatorText?: string | null;
  copyrightText?: string | null;
  languages?: FooterLanguage[];
  className?: string;
};

export function Footer({
  brandText = "Dividandy",
  logoUrl,
  logoAlt,
  logoSubtitle,
  legalMenu,
  contactBlock,
  socialsBlock,
  separatorText,
  copyrightText,
  languages = [],
  className,
}: FooterProps) {
  const legalColumn = legalMenu ?? null;
  const contactTitle = contactBlock?.title ?? "Contact";
  const contactEmail = contactBlock?.email ?? null;
  const socialsTitle = socialsBlock?.title ?? "Our Socials";
  const socials = socialsBlock?.links ?? [];

  return (
    <footer
      className={cn(
        "bg-[radial-gradient(120%_120%_at_20%_0%,rgba(35,116,135,0.28)_0%,rgba(5,8,11,1)_55%,rgba(5,8,11,1)_100%)]",
        className
      )}
    >
      <Container className="py-16 md:py-14">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-12 md:grid-cols-[1fr_auto] md:items-start md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <div className="w-[280px] md:w-[210px]">
                  <Image
                    src={logoUrl}
                    alt={logoAlt ?? ""}
                    width={560}
                    height={200}
                    sizes="(min-width: 768px) 210px, 280px"
                    className="h-auto w-full object-contain"
                    unoptimized={isLocalStrapiAsset(logoUrl)}
                  />
                </div>
              ) : null}
              {!logoUrl ? (
                <div className="text-[22px] font-semibold tracking-tight text-accent">
                  {brandText.toLowerCase()}
                </div>
              ) : null}
            </div>

            <div className="mt-7 space-y-3">
              <p className="whitespace-pre-line text-[16px] font-semibold leading-7 text-foreground md:text-[14px] md:font-medium md:leading-6 md:text-foreground/85">
                {logoSubtitle ?? "Master The Market.\nPlay The Game."}
              </p>
            </div>
          </div>

          {/* Right-side group (Legal + Contact/Socials) */}
          <div className="col-span-2 grid grid-cols-2 gap-1 md:col-span-1 md:justify-end md:gap-5">
            {/* Legal */}
            <div className="col-span-1 md:text-right">
              <div className="text-[28px] font-semibold tracking-tight text-foreground md:text-[14px]">
                {legalColumn?.title ?? "Legal"}
              </div>
              <div className="mt-7 flex flex-col gap-4 md:mt-4 md:gap-3">
                {(legalColumn?.links ?? []).map((l) => (
                  <Link
                    key={`${l.label}:${l.href}`}
                    href={l.href || "#"}
                    className="text-[16px] lg:text-[18px] font-semibold text-foreground/90 hover:text-foreground transition-colors md:text-[12px] md:font-normal md:text-foreground/45 md:hover:text-foreground/80"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact + socials */}
            <div className="col-span-1 md:text-right">
              <div className="text-[28px] font-semibold tracking-tight text-foreground md:text-[14px]">
                {contactTitle}
              </div>
              {contactEmail ? (
                <div className="mt-7 md:mt-4">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-[16px] lg:text-[18px] font-semibold text-foreground/90 hover:text-foreground transition-colors md:text-[12px] md:font-normal md:text-foreground/45 md:hover:text-foreground/80"
                  >
                    {contactEmail}
                  </a>
                </div>
              ) : null}

              <div className="mt-12 md:mt-10">
                <div className="text-[28px] font-semibold tracking-tight text-foreground md:text-[14px]">
                  {socialsTitle}
                </div>
                <div className="mt-7 flex items-center gap-1 lg:gap-10 md:mt-4 md:justify-end md:gap-4">
                  {socials.map((s) => (
                    <Link
                      key={`${s.platform}:${s.href}`}
                      href={s.href}
                      className="text-foreground/90 hover:text-foreground transition-colors"
                      aria-label={s.platform}
                    >
                      <SocialIcon platform={s.platform} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="mt-14 border-t border-white/10" />
        {separatorText ? (
          <div className="mt-10 flex items-start gap-4 text-foreground/70 md:text-foreground/55">
            <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-md border border-white/15 bg-white/5">
              <IconAdult className="h-5 w-5" />
            </span>
            <p className="max-w-[70ch] text-[16px] font-medium leading-7 md:text-[12px] md:font-normal md:leading-6">
              {separatorText}
            </p>
          </div>
        ) : null}
        <div className="mt-10 border-t border-white/10" />

        {/* Row 3 */}
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="text-[16px] font-medium text-foreground/75 md:text-[12px] md:font-normal md:text-foreground/50">
            {copyrightText ??
              `© ${new Date().getFullYear()} ${brandText}. All rights reserved.`}
          </div>

          {languages.length ? (
            <div className="md:justify-self-end">
              <LanguageInline
                languages={languages}
                className="gap-7 md:gap-4"
                activeClassName="text-[16px] font-semibold tracking-wide text-accent md:text-[12px]"
                inactiveClassName="text-[16px] font-semibold tracking-wide text-foreground/80 hover:text-foreground md:text-[12px]"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  const cls = "h-7 w-7 md:h-5 md:w-5";
  switch (platform) {
    case "x":
      return <IconX className={cls} />;
    case "instagram":
      return <IconInstagram className={cls} />;
    case "twitch":
      return <IconTwitch className={cls} />;
    case "youtube":
      return <IconYouTube className={cls} />;
    default:
      return <span className="text-[12px] font-semibold">{platform}</span>;
  }
}

