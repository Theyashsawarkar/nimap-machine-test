import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Replace with your MySQL user
  password: 'your_password',         // Replace with your MySQL password
  database: 'machine_test',  // Replace with your DB name
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database.');
});

export default db;
