import Form from '../components/form';

// localhost:3000

export default function Home() {
  return (
    <main className="flex min-h-screen max-h-screen flex-col items-center justify-evenly p-24">
      <div className="relative flex place-items-center">
        <h1 className="text-6xl text-primary-800 dark:text-primary-300">
          A2ZPort
        </h1>
      </div>
      <Form></Form>
    </main>
  );
}
