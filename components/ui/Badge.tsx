import { cn } from "@/lib/cn";

type BadgeVariant = "accent" | "muted";

type BadgeProps = React.PropsWithChildren<{
  className?: string;
  variant?: BadgeVariant;
}>;

const variants: Record<BadgeVariant, string> = {
  accent: "bg-accent text-accent-foreground",
  muted: "bg-muted text-muted-foreground",
};

export function Badge({ className, variant = "muted", children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

