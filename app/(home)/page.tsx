import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">BookReplay</h1>
      <p className="mb-4">A self-hosted app for your Kindle highlights.</p>
      <p>
        <Link href="/docs/quick-start" className="font-medium underline">
          Quick Start
        </Link>{' '}
        ·{' '}
        <Link href="/docs" className="font-medium underline">
          Documentation
        </Link>
      </p>
    </div>
  );
}
