import { HeroSection } from "@/components/sections/HeroSection";
import { WhyDividandySection } from "@/components/sections/WhyDividandySection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { LiveTournamentsSection } from "@/components/sections/LiveTournamentsSection";
import { LatestInsightsSection } from "@/components/sections/LatestInsightsSection";
import { DownloadAppSection } from "@/components/sections/DownloadAppSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaMarketsLiveSection } from "@/components/sections/CtaMarketsLiveSection";
import { ArenaLegendsSection } from "@/components/sections/ArenaLegendsSection";
import { ArenaCrowdedSection } from "@/components/sections/ArenaCrowdedSection";
import { FeelEnergySection } from "@/components/sections/FeelEnergySection";
import { FinalCtaNeonSection } from "@/components/sections/FinalCtaNeonSection";
import { getMediaAlt, getMediaUrl, type StrapiDynamicZoneItem } from "@/lib/strapi";
import type { RichTitleValue } from "@/components/ui/RichTitle";
import type { ButtonSize } from "@/components/ui/Button";

type SectionsRendererProps = {
  sections: StrapiDynamicZoneItem[];
};

type Link = { label: string; href: string; buttonSize?: ButtonSize };
type FeatureItem = {
  title: string;
  description?: string | null;
  iconKey?: "trophy" | "crown" | "swords" | "eye" | null;
};
type Step = {
  title: string;
  description?: string | null;
  iconKey?: "account" | "trade" | "prize" | null;
  iconUrl?: string | null;
  iconAlt?: string | null;
  iconWidth?: number | null;
  iconHeight?: number | null;
};
type Tournament = {
  name: string;
  status: "live" | "upcoming";
  prizePoolText?: string | null;
  playersText?: string | null;
  cta?: Link | null;
};
type Insight = {
  title: string;
  excerpt?: string | null;
  dateLabel?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  href?: string | null;
};
type DownloadLeftCard = {
  statusLabel?: string | null;
  title: string;
  subtitle?: string | null;
  iconUrl?: string | null;
  iconAlt?: string | null;
  cta?: Link | null;
};
type DownloadRightCard = {
  statusLabel?: string | null;
  title: string;
  subtitle?: string | null;
  iconUrl?: string | null;
  iconAlt?: string | null;
  emailPlaceholder?: string | null;
  buttonLabel?: string | null;
  buttonSize?: ButtonSize;
};
type FaqItem = { question: string; answer: string };
type Legend = {
  avatarUrl?: string | null;
  avatarAlt?: string | null;
  name: string;
  meta?: string | null;
  tagLabel?: string | null;
  amountText?: string | null;
  percentText?: string | null;
};
type IconChip = {
  label: string;
  iconUrl?: string | null;
  iconAlt?: string | null;
};
type BulletItem = { text: string };

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function getString(v: unknown, fallback = "") {
  return typeof v === "string" ? v : fallback;
}

function getOptionalString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function parseArray<T>(v: unknown, parse: (item: unknown) => T | null): T[] {
  if (!Array.isArray(v)) return [];
  const out: T[] = [];
  for (const item of v) {
    const parsed = parse(item);
    if (parsed) out.push(parsed);
  }
  return out;
}

function parseButtonSize(v: unknown): ButtonSize | undefined {
  if (v === "small") return "sm";
  if (v === "medium") return "md";
  if (v === "large") return "lg";
  return undefined;
}

function parseLink(v: unknown): Link | null {
  if (!isRecord(v)) return null;
  const label = getString(v.label);
  const href = getString(v.href);
  if (!label || !href) return null;
  return { label, href, buttonSize: parseButtonSize(v.buttonSize) };
}

function parseFeatureItem(v: unknown): FeatureItem | null {
  if (!isRecord(v)) return null;
  const title = getString(v.title);
  if (!title) return null;
  const iconKey =
    v.iconKey === "trophy" ||
    v.iconKey === "crown" ||
    v.iconKey === "swords" ||
    v.iconKey === "eye"
      ? v.iconKey
      : null;
  return { title, description: getOptionalString(v.description) ?? null, iconKey };
}

function parseStep(v: unknown): Step | null {
  if (!isRecord(v)) return null;
  const title = getString(v.title);
  if (!title) return null;
  const iconKey =
    v.iconKey === "account" || v.iconKey === "trade" || v.iconKey === "prize"
      ? v.iconKey
      : null;
  const iconWidth = typeof v.iconWidth === "number" ? v.iconWidth : null;
  const iconHeight = typeof v.iconHeight === "number" ? v.iconHeight : null;
  return {
    title,
    description: getOptionalString(v.description) ?? null,
    iconKey,
    iconUrl: getMediaUrl(v.icon),
    iconAlt: getMediaAlt(v.icon),
    iconWidth,
    iconHeight,
  };
}

function parseTournament(v: unknown): Tournament | null {
  if (!isRecord(v)) return null;
  const name = getString(v.name);
  const status = v.status === "live" || v.status === "upcoming" ? v.status : null;
  if (!name || !status) return null;
  return {
    name,
    status,
    prizePoolText: getOptionalString(v.prizePoolText) ?? null,
    playersText: getOptionalString(v.playersText) ?? null,
    cta: parseLink(v.cta),
  };
}

function parseInsight(v: unknown): Insight | null {
  if (!isRecord(v)) return null;
  const title = getString(v.title);
  if (!title) return null;
  return {
    title,
    excerpt: getOptionalString(v.excerpt) ?? null,
    dateLabel: getOptionalString(v.dateLabel) ?? null,
    imageUrl: getMediaUrl(v.image),
    imageAlt: getMediaAlt(v.image),
    href: getOptionalString(v.href) ?? null,
  };
}

function parseDownloadLeftCard(v: unknown): DownloadLeftCard | null {
  if (!isRecord(v)) return null;
  const title = getString(v.title);
  if (!title) return null;
  return {
    title,
    statusLabel: getOptionalString(v.statusLabel) ?? null,
    subtitle: getOptionalString(v.subtitle) ?? null,
    iconUrl: getMediaUrl(v.icon),
    iconAlt: getMediaAlt(v.icon),
    cta: parseLink(v.cta),
  };
}

function parseDownloadRightCard(v: unknown): DownloadRightCard | null {
  if (!isRecord(v)) return null;
  const title = getString(v.title);
  if (!title) return null;
  return {
    title,
    statusLabel: getOptionalString(v.statusLabel) ?? null,
    subtitle: getOptionalString(v.subtitle) ?? null,
    iconUrl: getMediaUrl(v.icon),
    iconAlt: getMediaAlt(v.icon),
    emailPlaceholder: getOptionalString(v.emailPlaceholder) ?? null,
    buttonLabel: getOptionalString(v.buttonLabel) ?? null,
    buttonSize: parseButtonSize(v.buttonSize),
  };
}

function parseFaqItem(v: unknown): FaqItem | null {
  if (!isRecord(v)) return null;
  const question = getString(v.question);
  const answer = getString(v.answer);
  if (!question || !answer) return null;
  return { question, answer };
}

function parseLegend(v: unknown): Legend | null {
  if (!isRecord(v)) return null;
  const name = getString(v.name);
  if (!name) return null;
  const avatarUrl = getMediaUrl(v.avatar);
  const avatarAlt = getMediaAlt(v.avatar);
  return {
    name,
    avatarUrl,
    avatarAlt,
    meta: getOptionalString(v.meta) ?? null,
    tagLabel: getOptionalString(v.tagLabel) ?? null,
    amountText: getOptionalString(v.amountText) ?? null,
    percentText: getOptionalString(v.percentText) ?? null,
  };
}

function parseIconChip(v: unknown): IconChip | null {
  if (!isRecord(v)) return null;
  const label = getString(v.label);
  if (!label) return null;
  return {
    label,
    iconUrl: getMediaUrl(v.icon),
    iconAlt: getMediaAlt(v.icon),
  };
}

function parseBulletItem(v: unknown): BulletItem | null {
  if (!isRecord(v)) return null;
  const text = getString(v.text);
  if (!text) return null;
  return { text };
}

function parseRichTitle(v: unknown): RichTitleValue | null {
  if (!isRecord(v)) return null;
  const mainText = getString(v.mainText);
  if (!mainText) return null;
  return {
    mainText,
    accentText: getOptionalString(v.accentText) ?? null,
    accentColor: getOptionalString(v.accentColor) ?? null,
  };
}

function splitTitle(v: unknown): RichTitleValue {
  const raw = getString(v);
  const [left, right] = raw.split("|", 2).map((s) => s.trim());
  return {
    mainText: left || raw,
    accentText: right || null,
    accentColor: null,
  };
}

export function SectionsRenderer({ sections }: SectionsRendererProps) {
  return (
    <>
      {sections.map((s) => {
        const v = s as unknown as Record<string, unknown>;
        switch (s.__component) {
          case "sections.hero": {
            const headingRich =
              parseRichTitle(v.headingRich) ?? splitTitle(v.heading);
            return (
              <HeroSection
                key={`hero:${s.id}`}
                backgroundImageUrl={getMediaUrl(v.backgroundImage)}
                backgroundImageAlt={getMediaAlt(v.backgroundImage)}
                backgroundImageMobileUrl={getMediaUrl(v.backgroundImageMobile)}
                backgroundImageMobileAlt={getMediaAlt(v.backgroundImageMobile)}
                backgroundColor={getOptionalString(v.backgroundColor) ?? null}
                heading={headingRich}
                subheading={getOptionalString(v.subheading)}
              />
            );
          }
          case "sections.why-dividandy": {
            return (
              <WhyDividandySection
                key={`why:${s.id}`}
                title={parseRichTitle(v.titleRich) ?? splitTitle(v.title)}
                backgroundColor={getOptionalString(v.backgroundColor) ?? null}
                items={parseArray(v.items, parseFeatureItem)}
              />
            );
          }
          case "sections.how-it-works": {
            return (
              <HowItWorksSection
                key={`how:${s.id}`}
                title={parseRichTitle(v.titleRich) ?? splitTitle(v.title)}
                backgroundColor={getOptionalString(v.backgroundColor) ?? null}
                subtitle={getOptionalString(v.subtitle)}
                steps={parseArray(v.steps, parseStep)}
              />
            );
          }
          case "sections.live-tournaments": {
            return (
              <LiveTournamentsSection
                key={`tournaments:${s.id}`}
                title={parseRichTitle(v.titleRich) ?? splitTitle(v.title)}
                backgroundColor={getOptionalString(v.backgroundColor) ?? null}
                viewAll={parseLink(v.viewAll)}
                items={parseArray(v.items, parseTournament)}
              />
            );
          }
          case "sections.latest-insights": {
            return (
              <LatestInsightsSection
                key={`insights:${s.id}`}
                title={parseRichTitle(v.titleRich) ?? splitTitle(v.title)}
                backgroundColor={getOptionalString(v.backgroundColor) ?? null}
                viewAll={parseLink(v.viewAll)}
                items={parseArray(v.items, parseInsight)}
              />
            );
          }
          case "sections.download-app": {
            return (
              <DownloadAppSection
                key={`download:${s.id}`}
                title={parseRichTitle(v.titleRich) ?? { mainText: "" }}
                backgroundColor={getOptionalString(v.backgroundColor) ?? null}
                backgroundImageUrl={getMediaUrl(v.backgroundImage)}
                backgroundImageAlt={getMediaAlt(v.backgroundImage)}
                subtitle={getOptionalString(v.subtitle)}
                leftCard={parseDownloadLeftCard(v.leftCard ?? v.androidCard)}
                rightCard={parseDownloadRightCard(v.rightCard ?? v.iosCard)}
              />
            );
          }
          case "sections.faq": {
            return (
              <FaqSection
                key={`faq:${s.id}`}
                title={parseRichTitle(v.titleRich) ?? splitTitle(v.title)}
                backgroundColor={getOptionalString(v.backgroundColor) ?? null}
                subtitle={getOptionalString(v.subtitle)}
                items={parseArray(v.items, parseFaqItem)}
              />
            );
          }
          case "sections.cta-markets-live": {
            return (
              <CtaMarketsLiveSection
                key={`cta:${s.id}`}
                backgroundImageUrl={getMediaUrl(v.backgroundImage)}
                backgroundImageAlt={getMediaAlt(v.backgroundImage)}
                backgroundColor={getOptionalString(v.backgroundColor) ?? null}
                title={parseRichTitle(v.titleRich) ?? { mainText: "" }}
                subtitle={getOptionalString(v.subtitle)}
                cta={parseLink(v.cta)}
              />
            );
          }
          case "sections.arena-legends": {
            return (
              <ArenaLegendsSection
                key={`legends:${s.id}`}
                backgroundImageUrl={getMediaUrl(v.backgroundImage)}
                backgroundImageAlt={getMediaAlt(v.backgroundImage)}
                title={parseRichTitle(v.titleRich) ?? { mainText: "" }}
                backgroundColor={getOptionalString(v.backgroundColor) ?? null}
                subtitle={getOptionalString(v.subtitle)}
                cta={parseLink(v.cta)}
                items={parseArray(v.items, parseLegend)}
              />
            );
          }
          case "sections.arena-crowded": {
            return (
              <ArenaCrowdedSection
                key={`crowded:${s.id}`}
                backgroundImageUrl={getMediaUrl(v.backgroundImage)}
                backgroundImageAlt={getMediaAlt(v.backgroundImage)}
                backgroundColor={getOptionalString(v.backgroundColor) ?? null}
                title={parseRichTitle(v.titleRich) ?? { mainText: "" }}
                subtitle={getOptionalString(v.subtitle)}
                chips={parseArray(v.chips, parseIconChip)}
              />
            );
          }
          case "sections.feel-energy": {
            return (
              <FeelEnergySection
                key={`energy:${s.id}`}
                title={parseRichTitle(v.titleRich) ?? { mainText: "" }}
                backgroundColor={getOptionalString(v.backgroundColor) ?? null}
                subtitle={getOptionalString(v.subtitle)}
                bullets={parseArray(v.bullets, parseBulletItem)}
                cta={parseLink(v.cta)}
                imageUrl={getMediaUrl(v.image)}
                imageAlt={getMediaAlt(v.image)}
              />
            );
          }
          case "sections.final-cta-neon": {
            return (
              <FinalCtaNeonSection
                key={`final:${s.id}`}
                topTitle={parseRichTitle(v.topTitleRich) ?? { mainText: "" }}
                bottomTitle={parseRichTitle(v.bottomTitleRich) ?? { mainText: "" }}
                backgroundImageUrl={getMediaUrl(v.backgroundImage)}
                backgroundImageAlt={getMediaAlt(v.backgroundImage)}
                backgroundColor={getOptionalString(v.backgroundColor) ?? null}
                subtitle={getOptionalString(v.subtitle)}
                cta={parseLink(v.cta)}
              />
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}

