import { Therapy } from '@/types';

export const dynamic = 'force-dynamic';

async function getTherapies(): Promise<Therapy[]> {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  const res = await fetch(`${url}/therapies`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch therapies');
  return res.json();
}

export default async function TherapiesPage() {
  const therapies = await getTherapies();

  return (
    <section>
      <h2>Therapies Catalog</h2>
      {therapies.length === 0 ? (
        <p>No therapies available.</p>
      ) : (
        <div className="grid">
          {therapies.map((therapy) => (
            <article key={therapy.id}>
              <header><strong>{therapy.name}</strong></header>
              <p>{therapy.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
