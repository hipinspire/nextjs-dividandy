import { cn } from "@/lib/cn";

type GridProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Grid({ className, children }: GridProps) {
  return <div className={cn("grid gap-6", className)}>{children}</div>;
}

