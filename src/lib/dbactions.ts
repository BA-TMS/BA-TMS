import mysql from 'mysql2/promise';

export async function getAllTodos() {  
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'a2ztms'
  });
  
  const [rows] = await conn.execute('select * from todos');
  return rows;
}

export async function updateTodo(id:number, newDesc:string) {
  
}