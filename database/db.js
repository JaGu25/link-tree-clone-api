import mysql from 'mysql2';

const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'mysql',
database: 'linktree_db'
});

connection.connect(err => {
if (err) throw err;
console.log('Conexión a la base de datos MySQL exitosa');
});

export default connection;
