const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').confi();

type ToDo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

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

function readSeedData() {
  let parsedTodos;
  try {
    const dataString = fs.readFileSync('./todos.json');
    parsedTodos = JSON.parse(dataString);
  } catch(err) {
    console.error(err);
  }
  return parsedTodos;
}

function buildCreateString(items: ToDo[]) {
  const baseString = 'INSERT INTO todos (userid, title) VALUES';
  const valuesValues: string[] = [];
  for (const item of items) {
    valuesValues.push(`(${item.userId}, '${item.title}')`);
  }
  return [baseString, valuesValues.join()].join(' ');
}

async function dbSeed() {
  const queryString: string = buildCreateString(readSeedData());

  const conn = await getConn();

  conn.connect(function(err: object) {
    if (err) throw err;
    conn.query(queryString, function(err: object, result: object, fields: object) {
      if (err) throw err;
      console.log(result);
      conn.close();
    });
  });
}

async function dbTest() {
  let response: string;

  const conn = await getConn();

  const [rows] = await conn.execute('select * from todos');
  // console.log(rows);
  // console.log(typeof rows);
  // console.log(typeof fields);
  conn.close();

  response = JSON.stringify(rows);
  console.log(rows[0]);
  console.log(typeof rows);
  console.log(Array.isArray(rows));
}

// dbSeed();
dbTest();