import Form from './components/form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center">
        <h1 className="text-6xl text-primary-800 dark:text-primary-300">
          A2ZPort
        </h1>
      </div>
      <Form></Form>
    </main>
  );
}
