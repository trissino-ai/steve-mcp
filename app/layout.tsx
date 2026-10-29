import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Steve MCP Docs",
    template: "%s · Steve MCP Docs",
  },
  description:
    "Connect Claude, ChatGPT, Cursor or VS Code to Steve. Ask about competitor news, ads, posts and website changes, with a source and date on every answer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
