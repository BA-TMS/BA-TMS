import mysql from 'mysql2/promise';
import Table from './components/jmtable'
import AddForm from './components/jmform';

const TODOCOLS = ['id', 'userid', 'title', 'completed'];

async function getTodos() {

  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'a2ztms'
  });
  
  const [rows] = await conn.execute('select * from todos');
  // return JSON.parse(JSON.stringify(rows));
  return rows;
}

export default async function Home() {
  const tableData = await getTodos();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Add Item</h1>
      <AddForm />
      <h1>Table Data</h1>
      <section>
        <Table columns={TODOCOLS} tableData={tableData} />
      </section>
    </main>
  );
}
