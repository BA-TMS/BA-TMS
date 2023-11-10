import mysql from 'mysql2/promise';

export async function GET() {
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const data = await res.json()
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'a2ztms'
  });

  const [rows] = await conn.execute('select * from todos limit 10');
  console.log(rows);
  const data = JSON.stringify(rows);
 
  return Response.json({ data });
}