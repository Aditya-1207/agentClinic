'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <article className="secondary">
      <header>
        <h2>Something went wrong!</h2>
      </header>
      <p>We encountered an error while trying to fetch data.</p>
      <p><code>{error.message}</code></p>
      <footer>
        <button onClick={() => reset()}>Try again</button>
      </footer>
    </article>
  );
}
