import mysql from 'mysql2'

 let pool  =   mysql.createPool({
    host: process.env.NEXT_PUBLIC_DB_HOST ?? 'localhost',
    database: process.env.NEXT_PUBLIC_DB_DATABASE ?? 'myplayground',
    password: process.env.NEXT_PUBLIC_DB_PASSWORD ?? 'PASSWORD',
    user: process.env.NEXT_PUBLIC_DB_USER ?? 'root'
})



export const db = pool.promise()
    


/*export async function databaseConnection() {
    // create the connection
    const connection = await  mysql.createConnection({
        host: 'localhost',
        database:'myplayground',
        password:'PASSWORD',
        user:'root'
    })
    
    db = connection
    
  }*/