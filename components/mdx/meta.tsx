import { cn } from "@/lib/utils";

interface MetaProps {
  title: string;
  description?: string;
  /** Small label above the title, e.g. the sidebar section ("Trackers"). */
  eyebrow?: string;
  className?: string;
}

/** The page header: eyebrow, H1 and the one-line summary. */
export function Meta({ title, description, eyebrow, className }: MetaProps) {
  return (
    <div className={cn("not-prose mb-10 space-y-3 border-b pb-8", className)}>
      {eyebrow && (
        <p className="text-sm font-medium text-violet-600 dark:text-violet-400">{eyebrow}</p>
      )}
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-lg leading-8 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
