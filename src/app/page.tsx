import Table from './components/jmtable'
import AddForm from './components/jmform';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <h1 className="text-2xl">Add Item</h1>
        <AddForm />
      </section>
      <section>
        <h1 className="text-2xl">Table Data</h1>
        <Table />
      </section>
    </main>
  );
}
