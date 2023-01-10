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

database.getPlaca1 = async function (placa) {
  let [rows, fields] = await database.con.execute('SELECT * FROM carros WHERE placa = ? ORDER BY data desc', [placa]);

  return rows;
}

database.getAll = async function () {
  let [rows, fields] = await database.con.execute('SELECT DISTINCT * FROM carros GROUP BY placa ORDER BY placa asc');

  return rows;
}
database.getAll1 = async function () {
  let [rows, fields] = await database.con.execute('SELECT * FROM carros');

  return rows;
}
database.getAllh = async function () {
  let [rows, fields] = await database.con.execute("SELECT * FROM carros where data = DATE_FORMAT((NOW()), '%Y-%m-%d')");

  return rows;
}

database.getAllv = async function () {
  let [rows, fields] = await database.con.execute("SELECT * FROM carros WHERE NOT aviso = 1 AND DATE_FORMAT((data), '%Y-%m-%d') <= DATE_FORMAT(DATE_ADD(NOW( ), INTERVAL -1 YEAR), '%Y-%m-%d') ORDER BY placa asc");

  return rows;
}

database.getaviso = async function (id) {
  let [rows, fields] = await database.con.execute("SELECT DISTINCT * FROM carros WHERE id = ? GROUP BY placa ORDER BY placa asc", [id]);

  return rows;
}

database.alterarviso = async function (id) {
  let [rows, fields] = await database.con.execute('UPDATE carros SET aviso = 1 where placa = ?', [id]);

  return rows;
}

database.postCarro = async function (placa, veiculo, itens, km, cliente, telefone) {
  let [rows, fields] = await database.con.execute('INSERT INTO carros (placa, modelo, itens, data, km, cliente, telefone) VALUES (?, ?, ?, NOW(), ?, ?, ?)', [placa, veiculo, itens, km, cliente, telefone]);

  return rows;
}
database.pesqcarro = async function (placa) {
  let [rows, fields] = await database.con.execute('SELECT DISTINCT * FROM carros WHERE placa LIKE CONCAT("%", ?,  "%") OR modelo LIKE CONCAT("%", ?,  "%") GROUP BY placa ORDER BY placa asc ', [placa, placa]);

  return rows;
}



export default database;