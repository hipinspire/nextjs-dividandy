import { cn } from "@/lib/cn";

export type RichTitleValue = {
  mainText: string;
  accentText?: string | null;
  accentColor?: string | null;
};

export function RichTitle({
  as,
  value,
  className,
  mainClassName,
  accentClassName,
  accentLeadingSpace = true,
  accentDisplay = "inline",
}: {
  as: "h1" | "h2" | "h3";
  value: RichTitleValue;
  className?: string;
  mainClassName?: string;
  accentClassName?: string;
  accentLeadingSpace?: boolean;
  accentDisplay?: "inline" | "block";
}) {
  const Tag = as;
  const main = value.mainText ?? "";
  const accent = value.accentText ?? "";
  const hasAccent = Boolean(accent && accent.trim().length);
  const accentStyle =
    value.accentColor && value.accentColor.trim().length
      ? { color: value.accentColor }
      : undefined;

  return (
    <Tag className={cn(className)}>
      <span className={cn(mainClassName)}>{main}</span>
      {hasAccent ? (
        <span
          className={cn(
            accentDisplay === "block" ? "block" : "inline",
            accentLeadingSpace && accentDisplay !== "block" ? "ml-1" : "",
            accentStyle ? "" : "text-accent",
            accentClassName
          )}
          style={accentStyle}
        >
          {accent}
        </span>
      ) : null}
    </Tag>
  );
}

