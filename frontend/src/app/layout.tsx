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
          <nav>
            <ul>
              <li><strong>AgentClinic</strong></li>
            </ul>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/agents">Agents</a></li>
              <li><a href="/ailments">Ailments</a></li>
              <li><a href="/therapies">Therapies</a></li>
            </ul>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
