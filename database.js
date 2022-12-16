import mysql from 'mysql2/promise';

const database = {};

database.con = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'meudeus',
  port: '3306'
})


database.getPlaca = async function (placa) {
  let [rows, fields] = await database.con.execute('SELECT * FROM carros WHERE placa = ? ORDER BY data asc', [placa]);

  return rows;
}




export default database;