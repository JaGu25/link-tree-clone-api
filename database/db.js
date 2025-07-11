import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'linktree_db',
}).promise(); 

connection.query('SELECT 1')
  .then(() => console.log("MySQL database connection successful"))
  .catch(err => console.error("MySQL connection failed:", err));

export default connection;

