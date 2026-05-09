import type { Metadata } from "next";
import "@picocss/pico";

export const metadata: Metadata = {
  title: "AgentClinic",
  description: "A wellness clinic for AI agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
