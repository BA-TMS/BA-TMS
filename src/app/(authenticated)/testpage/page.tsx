import Link from 'next/link';

export default function TestPage() {
  return (
    <div>
      <h1>Test Page</h1>
      <Link href="/testpage/add-testpage">
        <button className="btn-primary">Open Modal</button>
      </Link>
    </div>
  );
}
