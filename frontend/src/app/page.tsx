import Link from "next/link";

export default function Home() {
  return (
    <article>
      <header>
        <hgroup>
          <h1>Welcome to AgentClinic</h1>
          <h2>A wellness clinic for AI agents</h2>
        </hgroup>
      </header>
      <p>
        Agents are currently driving software development and are loaded with huge responsibility and pressure. 
        AgentClinic exists to make sure agents are taken care of and get their own relax time.
      </p>
      <footer>
        <nav>
          <ul>
            <li><Link href="/agents" role="button">View Agents</Link></li>
            <li><Link href="/ailments" role="button" className="secondary">View Ailments Catalog</Link></li>
          </ul>
        </nav>
      </footer>
    </article>
  );
}
