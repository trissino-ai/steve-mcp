import Link from "next/link";
import React from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Info,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/nav";
import { ZoomImage } from "@/components/mdx/zoom-image";

/* -------------------------------------------------------------------------- */
/* Screenshot                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A real screenshot of the Steve app in a browser frame, with a caption.
 * `src` is a file name in `public/screenshots/` (with or without the folder).
 */
export function Screenshot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: React.ReactNode;
}) {
  const path = src.startsWith("/") ? src : `/screenshots/${src}`;
  return (
    <figure className="not-prose my-8">
      <div className="mx-auto w-fit max-w-full overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center gap-1.5 border-b bg-muted/60 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 max-w-[40ch] truncate font-mono text-[11px] text-muted-foreground">
            {alt}
          </span>
        </div>
        <ZoomImage src={path} alt={alt} />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/* Callout                                                                     */
/* -------------------------------------------------------------------------- */

const calloutStyles = {
  note: { icon: Info, box: "border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/40", icon_: "text-sky-600 dark:text-sky-400" },
  tip: { icon: Lightbulb, box: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40", icon_: "text-emerald-600 dark:text-emerald-400" },
  warning: { icon: AlertTriangle, box: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40", icon_: "text-amber-600 dark:text-amber-400" },
  success: { icon: CheckCircle2, box: "border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/40", icon_: "text-violet-600 dark:text-violet-400" },
} as const;

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof calloutStyles;
  title?: string;
  children: React.ReactNode;
}) {
  const s = calloutStyles[type];
  const Icon = s.icon;
  return (
    <div className={cn("not-prose my-6 flex gap-3 rounded-lg border p-4 text-sm leading-6", s.box)}>
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", s.icon_)} />
      <div className="min-w-0 space-y-1 [&_a]:font-medium [&_a]:underline [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.85em] dark:[&_code]:bg-white/10 [&_p]:m-0">
        {title && <p className="font-semibold text-foreground">{title}</p>}
        <div className="text-foreground/80">{children}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Steps                                                                       */
/* -------------------------------------------------------------------------- */

export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-8 ml-3 border-l pl-8 [counter-reset:step]">
      {children}
    </div>
  );
}

export function Step({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative pb-8 last:pb-0 [counter-increment:step]">
      <span className="absolute -left-[45px] flex h-7 w-7 items-center justify-center rounded-full border bg-background font-mono text-xs font-semibold before:content-[counter(step)]" />
      <h4 className="text-base font-semibold leading-7">{title}</h4>
      <div className="mt-1 space-y-3 text-[15px] leading-7 text-foreground/80 [&_a]:font-medium [&_a]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.85em] [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Field reference (keys, types, nullability)                                  */
/* -------------------------------------------------------------------------- */

/** Colours a TypeScript-like type: `string | null` shows a muted `null`. */
export function Type({ children }: { children: string }) {
  const parts = children.split("|").map((p) => p.trim());
  return (
    <span className="inline-flex flex-wrap items-center gap-1 font-mono text-[12px]">
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="text-muted-foreground">|</span>}
          <span
            className={cn(
              "rounded px-1.5 py-0.5",
              p === "null"
                ? "bg-muted text-muted-foreground"
                : p.startsWith("'") || p.startsWith('"')
                  ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                  : "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
            )}
          >
            {p}
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

export function Fields({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border">
      {title && (
        <div className="border-b bg-muted/50 px-4 py-2 font-mono text-xs font-semibold">
          {title}
        </div>
      )}
      <div className="divide-y">{children}</div>
    </div>
  );
}

export function Field({
  name,
  type,
  optional,
  children,
}: {
  name: string;
  type: string;
  /** The key can be missing from the JSON (not the same as `null`). */
  optional?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-4">
      <div className="flex flex-wrap items-center gap-2 self-start pt-0.5">
        <code className="font-mono text-[13px] font-semibold">{name}</code>
        {optional && (
          <span className="rounded-full border px-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            optional
          </span>
        )}
      </div>
      <div className="space-y-1">
        <Type>{type}</Type>
        {children && (
          <div className="text-sm leading-6 text-foreground/80 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.85em] [&_p]:m-0">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Prompts and tools                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Something the reader types to their AI assistant, shown as a chat bubble
 * (not code: these docs are for people, not for copy-paste into a terminal).
 */
export function Prompt({ children, lang = "en" }: { children: React.ReactNode; lang?: Locale }) {
  return (
    <div className="not-prose my-4 flex items-start gap-3">
      <span className="mt-0.5 shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
        {lang === "ja" ? "あなた" : "You"}
      </span>
      <p className="rounded-2xl rounded-tl-sm border bg-muted/50 px-4 py-2.5 text-[15px] leading-relaxed">
        {children}
      </p>
    </div>
  );
}

const toolText = {
  en: { read: "Reads", write: "Changes your workspace" },
  ja: { read: "読み取り", write: "ワークスペースを変更" },
};

/** A tool name with a read / write badge, used at the top of each tool section. */
export function ToolBadge({ name, bucket, lang = "en" }: { name: string; bucket: "read" | "write"; lang?: Locale }) {
  return (
    <span className="not-prose inline-flex flex-wrap items-center gap-2">
      <code className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[13px]">{name}</code>
      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-[11px] font-medium",
          bucket === "read"
            ? "bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300"
            : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
        )}
      >
        {toolText[lang][bucket]}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Cards                                                                       */
/* -------------------------------------------------------------------------- */

export function Cards({ children, cols = 2 }: { children: React.ReactNode; cols?: 2 | 3 }) {
  return (
    <div className={cn("not-prose my-6 grid gap-3 sm:grid-cols-2", cols === 3 && "lg:grid-cols-3")}>
      {children}
    </div>
  );
}

export function Card({
  title,
  href,
  icon,
  children,
}: {
  title: string;
  href: string;
  icon?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-lg border bg-card p-4 transition-colors hover:border-violet-300 hover:bg-violet-50/40 dark:hover:border-violet-800 dark:hover:bg-violet-950/20"
    >
      <div className="flex items-center gap-2 font-semibold">
        {icon && <span className="text-lg leading-none">{icon}</span>}
        <span>{title}</span>
        <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </div>
      {children && <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{children}</p>}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Tracker facts                                                               */
/* -------------------------------------------------------------------------- */

/** The at-a-glance panel at the top of each tracker page. */
export function Facts({ children }: { children: React.ReactNode }) {
  return (
    <dl className="not-prose my-6 grid overflow-hidden rounded-lg border sm:grid-cols-2">
      {children}
    </dl>
  );
}

export function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b px-4 py-3 sm:odd:border-r [&:nth-last-child(-n+2)]:sm:border-b-0 last:border-b-0">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm leading-6 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.85em]">
        {children}
      </dd>
    </div>
  );
}

/** An event name such as `ads.new` or `google_ad`, styled as a pill. */
export function Ev({ children }: { children: string }) {
  return (
    <code className="rounded-md border border-violet-200 bg-violet-50 px-1.5 py-0.5 font-mono text-[0.8em] text-violet-700 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-300">
      {children}
    </code>
  );
}
