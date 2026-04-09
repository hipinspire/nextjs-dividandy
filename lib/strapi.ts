type StrapiResponse<T> = {
  data: T;
  meta?: unknown;
  error?: { status: number; name: string; message: string; details?: unknown };
};

export type StrapiDynamicZoneItem = {
  __component: string;
  id: number;
  [key: string]: unknown;
};

export type StrapiMedia = {
  id?: number;
  documentId?: string;
  name?: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  formats?: unknown;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url?: string;
  previewUrl?: string | null;
  provider?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type StrapiButtonSize = "small" | "medium" | "large";

export type StrapiNavChild = {
  label: string;
  href: string;
  external?: boolean;
  buttonSize?: StrapiButtonSize;
};
export type StrapiNavItem = {
  label: string;
  href?: string;
  external?: boolean;
  children?: StrapiNavChild[];
};

export type StrapiFooterColumn = { title: string; links?: StrapiNavChild[] };
export type StrapiSocialLink = { platform: string; href: string };
export type StrapiLanguage = { code: string; isDefault?: boolean };

export type StrapiHeaderSettings = {
  id: number;
  documentId: string;
  logo?: unknown;
  primaryNav?: StrapiNavItem[];
  cta?: StrapiNavChild | null;
};

export type StrapiFooterContact = {
  title: string;
  email: string;
};

export type StrapiFooterSocials = {
  title: string;
  links?: StrapiSocialLink[];
};

export type StrapiDownloadIosCard = {
  statusLabel?: string | null;
  title: string;
  subtitle?: string | null;
  emailPlaceholder?: string | null;
  buttonLabel?: string | null;
  buttonSize?: StrapiButtonSize;
};

export type StrapiFooterSettings = {
  id: number;
  documentId: string;
  logoSubtitle?: string | null;
  legalMenu?: StrapiFooterColumn | null;
  contactBlock?: StrapiFooterContact | null;
  socialsBlock?: StrapiFooterSocials | null;
  separatorText?: string | null;
  copyrightText?: string | null;
  languages?: StrapiLanguage[];
};

export type StrapiPage = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  sections: StrapiDynamicZoneItem[];
};

export type StrapiSiteSettings = {
  id: number;
  documentId: string;
  logo?: unknown;
  primaryNav?: StrapiNavItem[];
  headerCta?: StrapiNavChild | null;
  footerTagline?: string | null;
  footerTaglineSecondary?: string | null;
  footerLegal?: StrapiFooterColumn | null;
  footerColumns?: StrapiFooterColumn[];
  contactEmail?: string | null;
  footerDisclaimer?: string | null;
  footerLanguages?: StrapiLanguage[];
  socialLinks?: StrapiSocialLink[];
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function getStrapiBaseUrl() {
  const baseUrl = process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!baseUrl) {
    throw new Error(
      "Missing env: set STRAPI_URL (preferred) or NEXT_PUBLIC_STRAPI_URL"
    );
  }
  return baseUrl.replace(/\/+$/, "");
}

function getString(v: unknown): string | null {
  return typeof v === "string" ? v : null;
}

function toAbsoluteUrl(url: string) {
  const baseUrl = getStrapiBaseUrl();
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (!url.startsWith("/")) return `${baseUrl}/${url}`;
  return `${baseUrl}${url}`;
}

export function getMediaUrl(media: unknown): string | null {
  if (!media) return null;

  // Strapi v5 often returns media object directly.
  if (isRecord(media)) {
    // v4: { data: { attributes: { url } } }
    if ("data" in media && isRecord(media.data)) {
      const attrs =
        "attributes" in media.data && isRecord(media.data.attributes)
          ? media.data.attributes
          : null;
      const url = attrs ? getString(attrs.url) : null;
      return url ? toAbsoluteUrl(url) : null;
    }

    // v5: { url: "/uploads/..." }
    const url = getString(media.url);
    return url ? toAbsoluteUrl(url) : null;
  }

  return null;
}

export function getMediaAlt(media: unknown): string | null {
  if (!media || !isRecord(media)) return null;

  if ("data" in media && isRecord(media.data)) {
    const attrs =
      "attributes" in media.data && isRecord(media.data.attributes)
        ? media.data.attributes
        : null;
    const alt = attrs ? getString(attrs.alternativeText) : null;
    return alt ?? null;
  }

  return getString(media.alternativeText) ?? null;
}

export async function strapiFetch<T>(
  path: string,
  opts?: {
    cache?: RequestCache;
  }
): Promise<T> {
  const baseUrl = getStrapiBaseUrl();
  const url = `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, { cache: opts?.cache ?? "no-store" });
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function getPageBySlug(slug: string) {
  try {
    // Base fetch: returns ALL dynamic zone components, but may omit nested media inside
    // repeatable components (e.g. latest-insights.items.image).
    const baseQ = [
      `filters[slug][$eq]=${encodeURIComponent(slug)}`,
      "populate[sections][populate]=*",
    ].join("&");

    // Deep fetch: Strapi can return nested component media via fragment API, but it
    // currently returns ONLY the fragment-matched components. We'll merge results.
    const deepQ = [
      `filters[slug][$eq]=${encodeURIComponent(slug)}`,
      "populate[sections][populate]=*",
      "populate[sections][on][sections.latest-insights][populate][items][populate]=*",
      "populate[sections][on][sections.arena-legends][populate][items][populate]=*",
      "populate[sections][on][sections.arena-crowded][populate][chips][populate]=*",
      "populate[sections][on][sections.how-it-works][populate][steps][populate]=*",
      // download-app: populate card icon media (both new and legacy keys)
      "populate[sections][on][sections.download-app][populate][leftCard][populate]=*",
      "populate[sections][on][sections.download-app][populate][rightCard][populate]=*",
    ].join("&");

    const baseJson = await strapiFetch<StrapiResponse<StrapiPage[]>>(
      `/api/pages?${baseQ}`
    );
    const basePage = baseJson.data?.[0] ?? null;

    if (!basePage?.sections?.length) return basePage;

    let deepPage: StrapiPage | null = null;
    try {
      const deepJson = await strapiFetch<StrapiResponse<StrapiPage[]>>(
        `/api/pages?${deepQ}`
      );
      deepPage = deepJson.data?.[0] ?? null;
    } catch {
      deepPage = null;
    }

    if (!deepPage?.sections?.length) return basePage;

    const deepByKey = new Map<string, StrapiDynamicZoneItem>();
    for (const s of deepPage.sections) {
      deepByKey.set(`${s.__component}:${s.id}`, s);
    }

    const mergedSections = basePage.sections.map((s) => {
      const key = `${s.__component}:${s.id}`;
      const deep = deepByKey.get(key);
      if (!deep) return s;

      // Fragment deep-populate responses can omit non-target fields and return them as
      // `null`/missing (e.g. arena-legends.titleRich, arena-legends.cta). We only want
      // the deep-populated nested media arrays from the fragment response.
      if (s.__component === "sections.latest-insights") {
        const items = Array.isArray(deep.items) ? deep.items : s.items;
        return { ...s, items };
      }
      if (s.__component === "sections.arena-legends") {
        const items = Array.isArray(deep.items) ? deep.items : s.items;
        return { ...s, items };
      }
      if (s.__component === "sections.arena-crowded") {
        const chips = Array.isArray(deep.chips) ? deep.chips : s.chips;
        return { ...s, chips };
      }
      if (s.__component === "sections.how-it-works") {
        const steps = Array.isArray(deep.steps) ? deep.steps : s.steps;
        return { ...s, steps };
      }
      if (s.__component === "sections.download-app") {
        // Preserve base fields (titleRich, subtitle, etc.) and only merge icon media from deep.
        const sRec = s as unknown as Record<string, unknown>;
        const deepRec = deep as unknown as Record<string, unknown>;

        const baseLeft = isRecord(sRec.leftCard)
          ? sRec.leftCard
          : isRecord(sRec.androidCard)
            ? sRec.androidCard
            : null;
        const deepLeft = isRecord(deepRec.leftCard)
          ? deepRec.leftCard
          : isRecord(deepRec.androidCard)
            ? deepRec.androidCard
            : null;

        const baseRight = isRecord(sRec.rightCard)
          ? sRec.rightCard
          : isRecord(sRec.iosCard)
            ? sRec.iosCard
            : null;
        const deepRight = isRecord(deepRec.rightCard)
          ? deepRec.rightCard
          : isRecord(deepRec.iosCard)
            ? deepRec.iosCard
            : null;

        const merged: StrapiDynamicZoneItem = { ...s };
        const mergedRec = merged as unknown as Record<string, unknown>;

        if (baseLeft || deepLeft) {
          const leftBase = (baseLeft ?? deepLeft) as Record<string, unknown>;
          const icon = (deepLeft?.icon ?? baseLeft?.icon) as unknown;
          mergedRec.leftCard = { ...leftBase, icon };
        }
        if (baseRight || deepRight) {
          const rightBase = (baseRight ?? deepRight) as Record<string, unknown>;
          const icon = (deepRight?.icon ?? baseRight?.icon) as unknown;
          mergedRec.rightCard = { ...rightBase, icon };
        }

        return merged;
      }

      return s;
    });

    return { ...basePage, sections: mergedSections };
  } catch {
    return null;
  }
}

export async function getSiteSettings() {
  // Single type: Strapi returns { data: { ... } } or { data: null } when not created yet.
  try {
    const json = await strapiFetch<StrapiResponse<StrapiSiteSettings | null>>(
      "/api/site-setting?populate=*"
    );
    return json.data ?? null;
  } catch {
    // During early setup this endpoint is commonly forbidden until Public permissions are enabled.
    return null;
  }
}

export async function getHeaderSettings() {
  try {
    const json = await strapiFetch<StrapiResponse<StrapiHeaderSettings | null>>(
      "/api/header-setting?populate=*"
    );
    return json.data ?? null;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[strapi] getHeaderSettings failed", err);
    }
    return null;
  }
}

export async function getFooterSettings() {
  try {
    // populate=* does not deep-populate nested components (e.g. legalMenu.links, socialsBlock.links)
    const q =
      "populate[languages][populate]=*&populate[contactBlock][populate]=*&populate[legalMenu][populate]=*&populate[socialsBlock][populate]=*";
    const json = await strapiFetch<StrapiResponse<StrapiFooterSettings | null>>(
      `/api/footer-setting?${q}`
    );
    return json.data ?? null;
  } catch {
    return null;
  }
}

