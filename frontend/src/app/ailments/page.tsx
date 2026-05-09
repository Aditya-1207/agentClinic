import Link from 'next/link';
import { Ailment } from '@/types';

export const dynamic = 'force-dynamic';

async function getAilments(): Promise<Ailment[]> {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  const res = await fetch(`${url}/ailments`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch ailments');
  return res.json();
}

export default async function AilmentsPage() {
  const ailments = await getAilments();

  return (
    <article>
      <header>
        <h1>Ailments Catalog</h1>
        <p>Common conditions affecting modern AI models.</p>
      </header>
      
      {ailments.length === 0 ? (
        <p>No ailments recorded.</p>
      ) : (
        <div className="grid">
          {ailments.map((ailment) => (
            <article key={ailment.id}>
              <header><strong>{ailment.name}</strong></header>
              <p>{ailment.description}</p>
            </article>
          ))}
        </div>
      )}
      
      <footer>
        <Link href="/" role="button" className="secondary">Back to Home</Link>
      </footer>
    </article>
  );
}
