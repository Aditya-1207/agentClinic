import { DashboardSummary } from '@/types';

export const dynamic = 'force-dynamic';

async function getDashboardSummary(): Promise<DashboardSummary> {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  const res = await fetch(`${url}/dashboard/summary`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch dashboard summary');
  return res.json();
}

export default async function DashboardPage() {
  const summary = await getDashboardSummary();

  return (
    <section>
      <h2>Staff Dashboard</h2>
      <div className="grid">
        <article style={{ textAlign: 'center' }}>
          <header><strong>Agents Enrolled</strong></header>
          <h1>{summary.agents}</h1>
        </article>
        <article style={{ textAlign: 'center' }}>
          <header><strong>Ailments Tracked</strong></header>
          <h1>{summary.ailments}</h1>
        </article>
        <article style={{ textAlign: 'center' }}>
          <header><strong>Active Appointments</strong></header>
          <h1>{summary.appointments}</h1>
        </article>
      </div>
    </section>
  );
}
