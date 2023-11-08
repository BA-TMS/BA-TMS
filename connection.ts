// mySQL database connection

import mysql from 'mysql2/promise';

interface Params {
  query: string;
  values?: any[];
}

// how to connect to a mySQL database (hopefully)
export async function query({ query, values = [] }: Params): Promise<any> {
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const results = await dbconnection.execute(query, values);
    console.log('Query Results, ', results);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error('Error occurred in query');
  }
}
