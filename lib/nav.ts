/**
 * The whole docs tree, once. Every href is the English path; the Japanese
 * page lives at the same path under `/ja`. Sidebar, prev/next links and the
 * home page cards all read from here, so a new page is added in one place.
 */
export type Locale = "en" | "ja";

export interface NavItem {
  title: { en: string; ja: string };
  href: string;
  /** Small mono label shown next to the title (an event family, a source slug). */
  badge?: string;
}

export interface NavSection {
  title: { en: string; ja: string };
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: { en: "Getting started", ja: "はじめに" },
    items: [
      { title: { en: "What is Steve MCP", ja: "Steve MCP とは" }, href: "/docs/getting-started/overview" },
      { title: { en: "Quickstart", ja: "クイックスタート" }, href: "/docs/getting-started/quickstart" },
      { title: { en: "How Steve answers", ja: "Steve の答え方" }, href: "/docs/getting-started/how-it-works" },
    ],
  },
  {
    title: { en: "Connect your assistant", ja: "アシスタントを接続" },
    items: [
      { title: { en: "Claude (desktop and web)", ja: "Claude（デスクトップと Web）" }, href: "/docs/connect/claude" },
      { title: { en: "Claude Code", ja: "Claude Code" }, href: "/docs/connect/claude-code" },
      { title: { en: "ChatGPT", ja: "ChatGPT" }, href: "/docs/connect/chatgpt" },
      { title: { en: "Cursor", ja: "Cursor" }, href: "/docs/connect/cursor" },
      { title: { en: "VS Code", ja: "VS Code" }, href: "/docs/connect/vs-code" },
    ],
  },
  {
    title: { en: "Tools", ja: "ツール" },
    items: [
      { title: { en: "All 47 tools", ja: "47 個のツール一覧" }, href: "/docs/tools" },
      { title: { en: "Projects", ja: "プロジェクト" }, href: "/docs/tools/projects" },
      { title: { en: "Competitors", ja: "競合" }, href: "/docs/tools/competitors" },
      { title: { en: "Find new competitors", ja: "新しい競合を探す" }, href: "/docs/tools/discovery" },
      { title: { en: "News, reviews and posts", ja: "ニュース・レビュー・投稿" }, href: "/docs/tools/intelligence" },
      { title: { en: "Ads", ja: "広告" }, href: "/docs/tools/ads" },
      { title: { en: "Website tracking", ja: "Web サイトの追跡" }, href: "/docs/tools/website-tracking" },
      { title: { en: "Battle cards", ja: "バトルカード" }, href: "/docs/tools/battle-cards" },
      { title: { en: "Reports", ja: "レポート" }, href: "/docs/tools/reports" },
      { title: { en: "Canvases", ja: "キャンバス" }, href: "/docs/tools/canvases" },
    ],
  },
  {
    title: { en: "Account and security", ja: "アカウントとセキュリティ" },
    items: [
      { title: { en: "Sign-in and permissions", ja: "サインインと権限" }, href: "/docs/account/sign-in" },
      { title: { en: "Plans and limits", ja: "プランと上限" }, href: "/docs/account/plans-and-limits" },
      { title: { en: "Sharing and privacy", ja: "共有とプライバシー" }, href: "/docs/account/sharing-and-privacy" },
      { title: { en: "Troubleshooting", ja: "トラブルシューティング" }, href: "/docs/account/troubleshooting" },
      { title: { en: "FAQ", ja: "よくある質問" }, href: "/docs/faq" },
    ],
  },
];

export const allPages: NavItem[] = navigation.flatMap((s) => s.items);

export function localeOf(pathname: string): Locale {
  return pathname === "/ja" || pathname.startsWith("/ja/") ? "ja" : "en";
}

export function stripLocale(pathname: string): string {
  if (pathname === "/ja") return "/";
  return pathname.startsWith("/ja/") ? pathname.slice(3) : pathname;
}

export function localize(href: string, locale: Locale): string {
  if (locale === "en") return href;
  return href === "/" ? "/ja" : `/ja${href}`;
}
