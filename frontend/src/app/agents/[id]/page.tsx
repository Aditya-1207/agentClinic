import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getAgent(id: string) {
  const res = await fetch(`http://localhost:3001/api/agents/${id}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch agent');
  return res.json();
}

type Props = {
  params: { id: string };
};

export default async function AgentDetailPage({ params }: Props) {
  // Await the params object itself if it's a promise in Next 15+
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  
  const agent = await getAgent(id);

  if (!agent) {
    notFound();
  }

  return (
    <article>
      <header>
        <h1>{agent.name}</h1>
        <p>Model Type: {agent.model_type}</p>
      </header>
      
      <section>
        <h3>Status: <mark>{agent.status}</mark></h3>
        <p><strong>Presenting Complaints:</strong> {agent.presenting_complaints || 'None'}</p>
      </section>

      <section>
        <h3>Diagnosed Ailments</h3>
        {agent.ailments && agent.ailments.length > 0 ? (
          <ul>
            {agent.ailments.map((ailment: any) => (
              <li key={ailment.id}>
                <strong>{ailment.name}</strong> - {ailment.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No ailments diagnosed.</p>
        )}
      </section>

      <footer>
        <Link href="/agents" role="button" className="secondary">Back to Directory</Link>
      </footer>
    </article>
  );
}
