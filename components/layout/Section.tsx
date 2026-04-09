import { cn } from "@/lib/cn";

type SectionProps = React.PropsWithChildren<{
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
  as?: "section" | "div";
}>;

export function Section({
  className,
  containerClassName,
  style,
  as = "section",
  children,
}: SectionProps) {
  const Tag = as;
  return (
    <Tag className={cn("py-14 sm:py-18 lg:py-24", className)} style={style}>
      <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", containerClassName)}>
        {children}
      </div>
    </Tag>
  );
}

