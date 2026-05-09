import Link from 'next/link';
import { Agent } from '@/types';

export const dynamic = 'force-dynamic';

async function getAgents(): Promise<Agent[]> {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  const res = await fetch(`${url}/agents`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch agents');
  return res.json();
}

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <article>
      <header>
        <h1>Agent Directory</h1>
        <p>A list of all currently registered AI agents.</p>
      </header>
      
      {agents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <figure>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Model Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.id}</td>
                  <td>{agent.name}</td>
                  <td>{agent.model_type}</td>
                  <td>{agent.status}</td>
                  <td>
                    <Link href={`/agents/${agent.id}`} role="button" className="outline">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      )}
      
      <footer>
        <Link href="/" role="button" className="secondary">Back to Home</Link>
      </footer>
    </article>
  );
}
