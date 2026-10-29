"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeOf, localize, navigation, stripLocale } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** The section list, shared by the desktop sidebar and the mobile menu. */
export function DocsSidebarNav() {
  const pathname = usePathname();
  const locale = localeOf(pathname);
  const current = stripLocale(pathname);

  return (
    <nav className="space-y-5 text-sm">
      {navigation.map((section) => (
        <div key={section.title.en}>
          {/* Main topic: a heading. Its pages sit indented under it, on a guide line. */}
          <h4 className="mb-1 px-2 py-1 text-[0.8125rem] font-semibold text-foreground">
            {section.title[locale]}
          </h4>
          <ul className="ml-3 space-y-0.5 border-l border-border pl-2">
            {section.items.map((item) => {
              const active = current === item.href;
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={localize(item.href, locale)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
                      "before:absolute before:-left-[9px] before:top-1/2 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-full",
                      active
                        ? "bg-violet-50 font-medium text-violet-700 before:bg-violet-600 dark:bg-violet-950/40 dark:text-violet-300 dark:before:bg-violet-400"
                        : "text-foreground/70 before:bg-transparent hover:bg-accent hover:text-foreground",
                    )}
                  >
                    <span className="truncate">{item.title[locale]}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar() {
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r px-3 py-6 lg:block">
      <DocsSidebarNav />
    </aside>
  );
}
