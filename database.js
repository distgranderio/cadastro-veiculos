import mysql from 'mysql2/promise';

const database = {};

database.con = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vaida',
  port: '3306'
})


database.getPlaca = async function (placa) {
  let [rows, fields] = await database.con.execute('SELECT * FROM carros WHERE placa = ? ORDER BY data asc', [placa]);

  return rows;
}

database.getAll = async function () {
  let [rows, fields] = await database.con.execute('SELECT DISTINCT * FROM carros GROUP BY placa ORDER BY placa asc');

  return rows;
}

database.postCarro = async function (placa, veiculo, itens, km, cliente, telefone) {
  let [rows, fields] = await database.con.execute('INSERT INTO carros (placa, modelo, itens, data, km, cliente, telefone) VALUES (?, ?, ?, NOW(), ?, ?, ?)', [placa, veiculo, itens, km, cliente, telefone]);

  return rows;
}


export default database;