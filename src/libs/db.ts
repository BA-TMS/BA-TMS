import mysql from 'serverless-mysql';

export const dbconnection = mysql({
    config: {
        host: 'localhost',
        user: 'root',
        password: 'playgroundpassword',
        port: 3306,
        database: 'playground',
    }
})