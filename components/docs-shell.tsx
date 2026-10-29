import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsPager } from "@/components/docs-pager";
import { SiteHeader } from "@/components/site-header";
import { Toc } from "@/components/toc";

/** Header + sidebar + article + "On this page", used by every docs page (EN and JA). */
export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-[1440px]">
        <DocsSidebar />
        <main className="min-w-0 flex-1 px-4 py-10 md:px-10">
          <div className="mx-auto max-w-3xl">
            <article className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-bold prose-h2:mt-12 prose-h2:border-b prose-h2:pb-2 prose-h2:text-2xl prose-h3:text-lg prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-violet-400 prose-code:before:content-none prose-code:after:content-none">
              {children}
            </article>
            <DocsPager />
          </div>
        </main>
        <Toc />
      </div>
    </>
  );
}
