import Link from 'next/link';

export default function NotFound() {
  return (
    <article className="secondary" style={{ textAlign: 'center', padding: '2rem' }}>
      <header>
        <h2>404 - Page Not Found</h2>
      </header>
      <p>The page you are looking for does not exist or has been moved.</p>
      <footer>
        <Link href="/" role="button">Return Home</Link>
      </footer>
    </article>
  );
}
