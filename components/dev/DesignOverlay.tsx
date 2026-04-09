"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import Image from "next/image";

type Mode = "desktop" | "mobile";

const PRESETS: Record<Mode, { file: string; width: number; height: number }> = {
  desktop: { file: "DAVIDA-6_Homepage_v3.png", width: 1440, height: 7920 },
  mobile: { file: "DAVIDA-6_Homepage_v3-mobile.png", width: 375, height: 8759 },
};

export function DesignOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("desktop");
  const [opacity, setOpacity] = useState(0.35);
  const [scale, setScale] = useState(1);

  const src = useMemo(() => {
    const f = PRESETS[mode].file;
    return `/design/${encodeURIComponent(f)}`;
  }, [mode]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`") setEnabled((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  const preset = PRESETS[mode];

  return (
    <>
      {/* Controls */}
      <div className="fixed bottom-4 left-4 z-9999 pointer-events-auto">
        <div className="w-[320px] rounded-xl border border-white/10 bg-black/70 p-4 text-white shadow-lg backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="text-[12px] font-semibold tracking-wide text-white/85">
              Design overlay
            </div>
            <button
              type="button"
              onClick={() => setEnabled((v) => !v)}
              className={cn(
                "rounded-full px-3 py-1 text-[12px] font-semibold",
                enabled ? "bg-accent text-accent-foreground" : "bg-white/10 text-white"
              )}
            >
              {enabled ? "ON" : "OFF"} <span className="text-white/60">( ` )</span>
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode("desktop")}
              className={cn(
                "flex-1 rounded-lg px-3 py-2 text-[12px] font-semibold",
                mode === "desktop" ? "bg-white/10" : "bg-transparent text-white/70"
              )}
            >
              Desktop (1440)
            </button>
            <button
              type="button"
              onClick={() => setMode("mobile")}
              className={cn(
                "flex-1 rounded-lg px-3 py-2 text-[12px] font-semibold",
                mode === "mobile" ? "bg-white/10" : "bg-transparent text-white/70"
              )}
            >
              Mobile (375)
            </button>
          </div>

          <label className="mt-4 block text-[12px] text-white/70">
            Opacity: {opacity.toFixed(2)}
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="mt-2 w-full"
          />

          <label className="mt-3 block text-[12px] text-white/70">
            Scale: {scale.toFixed(2)}
          </label>
          <input
            type="range"
            min={0.5}
            max={1.5}
            step={0.01}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="mt-2 w-full"
          />
        </div>
      </div>

      {/* Overlay image */}
      {enabled ? (
        <div
          className="fixed inset-0 z-9998 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute left-1/2 top-0"
            style={{
              width: preset.width,
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: "top center",
              opacity,
            }}
          >
            <Image
              src={src}
              alt=""
              width={preset.width}
              height={preset.height}
              sizes={`${preset.width}px`}
              className="block h-auto w-full"
              priority={false}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

