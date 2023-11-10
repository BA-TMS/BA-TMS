const fs = require('fs');
const mysql = require('mysql2/promise');

type ToDo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean
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

function buildQueryString(items: ToDo[]) {
  const baseString = 'INSERT INTO todos (userid, title) VALUES';
  const valuesValues: string[] = [];
  for (const item of items) {
    valuesValues.push(`(${item.userId}, '${item.title}')`);
  }
  return [baseString, valuesValues.join()].join(' ');
}

function dbSeed() {
  const queryString: string = buildQueryString(readSeedData());

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'a2ztms'
  });

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

  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'a2ztms'
  });

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