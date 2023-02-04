import mysql from 'mysql2/promise';

// create the connection to database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mk0giongtk',
  database: 'nodejsbasic'
});


export default pool;