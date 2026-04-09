import { readFile } from "node:fs/promises";
import path from "node:path";

const ALLOWED_FILES = new Set([
  "DAVIDA-6_Homepage_v3.png",
  "DAVIDA-6_Homepage_v3-mobile.png",
  "hero-desktop.png",
  "hero-mobile.png",
  "WhyDividandySection desktop.png",
  "WhyDividandySection mobile.png",
  "HowItWorksSection desktop.png",
  "HowItWorksSection mobile.png",
  "LatestInsightsSection desktop.png",
  "LatestInsightsSection mobile.png",
  "DownloadAppSection desktop.png",
  "DownloadAppSection mobile.png",
  "The Arena is Getting Crowded desktop.png",
  "The Arena is Getting Crowded mobile.png",
  "Feel the Energy desktop.png",
  "Feel the Energy mobile.png",
  "FaqSection desktop.png",
  "FaqSection mobile.png",
  "CtaMarketsLiveSection desktop.png",
  "CtaMarketsLiveSection mobile.png",
  "Footers desktop.png",
  "Footers mobile.png",
]);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not Found", { status: 404 });
  }

  const { file } = await params;
  const safe = file;
  if (
    !ALLOWED_FILES.has(safe) ||
    safe.includes("..") ||
    safe.includes("/") ||
    safe.includes("\\")
  ) {
    return new Response("Not Found", { status: 404 });
  }

  const absolute = path.join(process.cwd(), "..", "DIZAJN", safe);
  const buf = await readFile(absolute);

  return new Response(buf, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}

