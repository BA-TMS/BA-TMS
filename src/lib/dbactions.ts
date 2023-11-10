import exp from 'constants';
import 'dotenv/config';
import mysql from 'mysql2/promise';

async function getConn() {
  const props = {
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  };

  const connection = await mysql.createConnection(props);
  return connection;
}

export async function createTodo(user: number, desc: string) {
  const conn = await getConn();
  const query = `INSERT INTO todos (userid, title) VALUES (${user}, '${desc}')`;

  const [rows] = await conn.execute(query);
  return rows;
}

export async function getAllTodos() {
  const conn = await getConn();
  
  const [rows] = await conn.execute('SELECT * FROM todos');
  return rows;
}

export async function updateTodoDesc(id: number, newDesc: string) {
  const conn = await getConn();
  const query = `UPDATE todos SET  title = '${newDesc}' WHERE id = ${id}`;
  
  const [rows] = await conn.execute(query);
  return rows;
}

export async function updateTodoStatus(id: number, status: boolean) {
  const conn = await getConn();
  const query = `UPDATE todos SET  completed = ${status} WHERE id = ${id}`;

  const [rows] = await conn.execute(query);
  return rows;
}

export async function deleteTodo(id: number) {
  const conn = await getConn();
  const query = `DELETE FROM todos WHERE id = ${id}`;

  const [rows] = await conn.execute(query);
  return rows;
}