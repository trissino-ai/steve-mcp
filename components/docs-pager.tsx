"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { allPages, localeOf, localize, stripLocale } from "@/lib/nav";

const labels = { en: { prev: "Previous", next: "Next" }, ja: { prev: "前へ", next: "次へ" } };

/** Previous / next links, in sidebar order. */
export function DocsPager() {
  const pathname = usePathname();
  const locale = localeOf(pathname);
  const i = allPages.findIndex((p) => p.href === stripLocale(pathname));
  if (i === -1) return null;
  const prev = allPages[i - 1];
  const next = allPages[i + 1];

  return (
    <div className="mt-16 grid gap-3 border-t pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={localize(prev.href, locale)}
          className="group rounded-lg border p-4 transition-colors hover:border-violet-300 dark:hover:border-violet-800"
        >
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChevronLeft className="h-3.5 w-3.5" /> {labels[locale].prev}
          </div>
          <div className="mt-1 font-medium">{prev.title[locale]}</div>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={localize(next.href, locale)}
          className="group rounded-lg border p-4 text-right transition-colors hover:border-violet-300 dark:hover:border-violet-800"
        >
          <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            {labels[locale].next} <ChevronRight className="h-3.5 w-3.5" />
          </div>
          <div className="mt-1 font-medium">{next.title[locale]}</div>
        </Link>
      )}
    </div>
  );
}
