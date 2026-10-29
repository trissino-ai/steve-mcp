import Image from "next/image";
import Link from "next/link";
import { ArrowRight, KeyRound, Plug, Rocket, Wrench } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { localize, type Locale } from "@/lib/nav";

const copy = {
  en: {
    kicker: "Steve MCP documentation",
    title: "Your competitors, inside the AI assistant you already use.",
    lead: "Connect Claude, ChatGPT, Cursor or VS Code to Steve. Ask about competitor news, ads, posts and website changes in plain words. Every answer comes with a source and a date.",
    start: "Start in 5 minutes",
    connect: "Connect your assistant",
    how: "How it works",
    chatLabel: "Example conversation",
    chatUser: "What is new with my competitors this week?",
    chatBot: "Here is what Steve has collected. Every item has a source and a date.",
    chatRows: ["News: headline from the source", "LinkedIn post: what the competitor shared", "Meta ad: a new ad that started running"],
    chatSource: "source link · date",
    flow: [
      { t: "Add Steve to your assistant", d: "Paste one address into your assistant. No API key to create or keep." },
      { t: "Sign in to Steve", d: "A Steve page opens. You pick your organization and approve the connection." },
      { t: "Ask in plain words", d: "Ask about your competitors. Your assistant uses Steve's 47 tools for you." },
      { t: "Get sourced answers", d: "Steve answers from collected data, never from memory. Each item shows where it came from." },
    ],
    pathsTitle: "Pick your path",
    paths: [
      { icon: Rocket, t: "Quickstart", d: "Connect, sign in and ask your first question.", href: "/docs/getting-started/quickstart" },
      { icon: Plug, t: "Connect your assistant", d: "Step by step for Claude, Claude Code, ChatGPT, Cursor and VS Code.", href: "/docs/connect/claude" },
      { icon: Wrench, t: "All 47 tools", d: "What each tool does, with things you can ask.", href: "/docs/tools" },
      { icon: KeyRound, t: "Sign-in and permissions", d: "What you approve, token lifetimes and how to revoke.", href: "/docs/account/sign-in" },
    ],
    endpointTitle: "One address to connect",
    endpointLead: "Steve is a remote MCP server. Your assistant needs only this address. It signs you in with OAuth.",
    endpointLabel: "Endpoint",
    endpoint: "https://app.hiresteve.ai/api/agent/mcp",
    endpointNote: "A Steve account is required. Organizations of the Signals type cannot use it.",
    endpointLink: "See the connection guides",
  },
  ja: {
    kicker: "Steve MCP ドキュメント",
    title: "いつものAIアシスタントで、競合を調べる。",
    lead: "Claude、ChatGPT、Cursor、VS Code を Steve につなぎます。競合のニュース、広告、投稿、Web サイトの変更を、ふつうの言葉で質問できます。どの回答にも出典と日付が付きます。",
    start: "5 分で始める",
    connect: "アシスタントを接続",
    how: "仕組み",
    chatLabel: "会話の例",
    chatUser: "今週、競合に新しい動きはありましたか？",
    chatBot: "Steve が集めた内容です。すべての項目に出典と日付があります。",
    chatRows: ["ニュース：出典の見出し", "LinkedIn 投稿：競合が共有した内容", "Meta 広告：配信が始まった新しい広告"],
    chatSource: "出典リンク · 日付",
    flow: [
      { t: "アシスタントに Steve を追加", d: "アドレスを 1 つ貼り付けるだけ。API キーの作成や管理は不要です。" },
      { t: "Steve にサインイン", d: "Steve のページが開きます。組織を選んで、接続を承認します。" },
      { t: "ふつうの言葉で質問", d: "競合について質問すると、アシスタントが Steve の 47 個のツールを使います。" },
      { t: "出典付きの回答", d: "Steve は収集したデータから答え、記憶では答えません。各項目に出典があります。" },
    ],
    pathsTitle: "目的から選ぶ",
    paths: [
      { icon: Rocket, t: "クイックスタート", d: "接続、サインイン、最初の質問まで。", href: "/docs/getting-started/quickstart" },
      { icon: Plug, t: "アシスタントを接続", d: "Claude、Claude Code、ChatGPT、Cursor、VS Code の手順。", href: "/docs/connect/claude" },
      { icon: Wrench, t: "47 個のツール", d: "各ツールの役割と、聞ける質問の例。", href: "/docs/tools" },
      { icon: KeyRound, t: "サインインと権限", d: "承認する内容、トークンの有効期間、取り消し方。", href: "/docs/account/sign-in" },
    ],
    endpointTitle: "接続に必要なのは 1 つのアドレス",
    endpointLead: "Steve はリモート MCP サーバーです。アシスタントに必要なのはこのアドレスだけで、サインインは OAuth で行います。",
    endpointLabel: "エンドポイント",
    endpoint: "https://app.hiresteve.ai/api/agent/mcp",
    endpointNote: "Steve アカウントが必要です。Signals タイプの組織では使えません。",
    endpointLink: "接続ガイドを見る",
  },
};

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const l = (href: string) => localize(href, locale);

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.14),transparent_60%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                {t.kicker}
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t.title}</h1>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{t.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={l("/docs/getting-started/quickstart")}
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90"
                >
                  {t.start} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={l("/docs/connect/claude")}
                  className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm font-medium hover:bg-accent"
                >
                  <Plug className="h-4 w-4" /> {t.connect}
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border bg-card shadow-xl shadow-violet-500/5">
              <div className="border-b bg-muted/60 px-4 py-2 text-[11px] font-medium text-muted-foreground">{t.chatLabel}</div>
              <div className="space-y-4 p-5">
                <div className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-tr-sm bg-foreground px-4 py-2.5 text-sm text-background">{t.chatUser}</p>
                </div>
                <div className="max-w-[92%] rounded-2xl rounded-tl-sm border bg-muted/50 px-4 py-3 text-sm">
                  <p>{t.chatBot}</p>
                  <ul className="mt-3 space-y-2">
                    {t.chatRows.map((r) => (
                      <li key={r} className="rounded-lg border bg-background px-3 py-2">
                        <div className="font-medium">{r}</div>
                        <div className="mt-0.5 font-mono text-[11px] text-violet-700 dark:text-violet-300">{t.chatSource}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight">{t.how}</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {t.flow.map((s, i) => (
              <li key={s.t} className="rounded-xl border bg-card p-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 font-mono text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Paths */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-bold tracking-tight">{t.pathsTitle}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.paths.map((p) => (
                <Link
                  key={p.href}
                  href={l(p.href)}
                  className="group rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md dark:hover:border-violet-800"
                >
                  <p.icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  <h3 className="mt-3 flex items-center gap-1 font-semibold">
                    {p.t}
                    <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{p.d}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Endpoint */}
        <section className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight">{t.endpointTitle}</h2>
          <p className="mt-4 leading-7 text-muted-foreground">{t.endpointLead}</p>
          <div className="mt-6 rounded-xl border bg-card px-4 py-3 text-left">
            <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{t.endpointLabel}</div>
            <div className="mt-1 break-all font-mono text-sm">{t.endpoint}</div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{t.endpointNote}</p>
          <Link
            href={l("/docs/connect/claude")}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
          >
            {t.endpointLink} <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <footer className="border-t py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Steve" width={24} height={24} className="rounded" />
              <span className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Steve. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://hiresteve.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                hiresteve.ai
              </a>
              <Link
                href={locale === "ja" ? "/" : "/ja"}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {locale === "ja" ? "English" : "日本語"}
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
