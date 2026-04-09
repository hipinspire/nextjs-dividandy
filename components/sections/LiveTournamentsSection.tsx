import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/ui/Card";
import { Button, type ButtonSize } from "@/components/ui/Button";
import { RichTitle, type RichTitleValue } from "@/components/ui/RichTitle";

type Tournament = {
  name: string;
  status: "live" | "upcoming";
  prizePoolText?: string | null;
  playersText?: string | null;
  cta?: { label: string; href: string; buttonSize?: ButtonSize } | null;
};

type LiveTournamentsSectionProps = {
  backgroundColor?: string | null;
  title: RichTitleValue;
  viewAll?: { label: string; href: string; buttonSize?: ButtonSize } | null;
  items?: Tournament[];
};

export function LiveTournamentsSection({
  backgroundColor,
  title,
  viewAll,
  items = [],
}: LiveTournamentsSectionProps) {
  return (
    <Section
      className="scroll-mt-24"
      containerClassName="relative"
      as="section"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="flex items-center justify-between gap-4">
        <RichTitle
          as="h2"
          value={title}
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        />
        {viewAll?.href ? (
          <Link href={viewAll.href}>
            <Button variant="outline" size={viewAll.buttonSize ?? "sm"}>
              {viewAll.label || "View all"}
            </Button>
          </Link>
        ) : null}
      </div>

      <Grid className="mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((t) => (
          <Card key={t.name} className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs font-semibold text-accent">
                {t.status.toUpperCase()}
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              {t.prizePoolText ? <div>Prize Pool: {t.prizePoolText}</div> : null}
              {t.playersText ? <div>Players: {t.playersText}</div> : null}
            </div>
            {t.cta?.href ? (
              <div className="mt-5">
                <Link href={t.cta.href}>
                  <Button
                    variant="outline"
                    size={t.cta.buttonSize ?? "md"}
                    className="w-full"
                  >
                    {t.cta.label || "Join now"}
                  </Button>
                </Link>
              </div>
            ) : null}
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

