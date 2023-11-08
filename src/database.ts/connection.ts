import mysql from 'mysql2'

 let pool  =   mysql.createPool({
    host: 'localhost',
    database:'myplayground',
    password:'PASSWORD',
    user:'root'
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