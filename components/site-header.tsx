"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DocsSidebarNav } from "@/components/docs-sidebar";
import { localeOf, localize, stripLocale } from "@/lib/nav";
import { cn } from "@/lib/utils";

const labels = {
  en: { start: "Get started", connect: "Connect", tools: "Tools", account: "Account", menu: "Open menu" },
  ja: { start: "はじめに", connect: "接続", tools: "ツール", account: "アカウント", menu: "メニューを開く" },
};

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeOf(pathname);
  const base = stripLocale(pathname);
  const t = labels[locale];
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { href: "/docs/getting-started/overview", label: t.start, match: "/docs/getting-started" },
    { href: "/docs/connect/claude", label: t.connect, match: "/docs/connect" },
    { href: "/docs/tools", label: t.tools, match: "/docs/tools" },
    { href: "/docs/account/sign-in", label: t.account, match: "/docs/account" },
  ];
  const active = [...links].reverse().find((l) => base.startsWith(l.match))?.href;

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-6 px-4 md:px-6">
        <button
          type="button"
          className="-ml-1 rounded-md p-1.5 hover:bg-accent lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={t.menu}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <Link href={localize("/", locale)} className="flex items-center gap-2">
          <Image src="/logo.png" alt="Steve" width={28} height={28} className="rounded-md" />
          <span className="font-semibold tracking-tight">Steve MCP</span>
          <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            Docs
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={localize(l.href, locale)}
              className={cn(
                "rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground",
                active === l.href && "bg-accent text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center rounded-md border p-0.5 text-xs">
            <Link
              href={base}
              className={cn("rounded px-2 py-1", locale === "en" ? "bg-accent font-medium" : "text-muted-foreground")}
            >
              EN
            </Link>
            <Link
              href={localize(base, "ja")}
              className={cn("rounded px-2 py-1", locale === "ja" ? "bg-accent font-medium" : "text-muted-foreground")}
            >
              日本語
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
      {open && (
        <div className="max-h-[calc(100vh-3.5rem)] overflow-y-auto border-t bg-background px-4 py-4 lg:hidden">
          <DocsSidebarNav />
        </div>
      )}
    </header>
  );
}

