const express = require('express')
const app = express()
const port = 3000

const db_config = {
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'bd_test'
}

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
  res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
  next();
});
  
// Lista todos os clientes 
app.get('/cliente', (req, res) => {

  var mysql = require('mysql');
  var connection = mysql.createConnection(db_config);
  connection.connect();

  connection.query('SELECT * FROM client', function(err, rows, fields) {
    if (err) throw err  
    res.json(rows);
  });

  connection.end();
})

// Obtém um cliente específico 
app.get('/cliente/:id', (req, res) => {

  var mysql = require('mysql');
  var connection = mysql.createConnection(db_config);

  connection.connect();

  connection.query('SELECT * FROM client WHERE id ='+ req.params.id +";", function(err, rows, fields) {
    if (err) throw err
      res.json(rows);
    });

  connection.end();
})

// Insere um novo cliente
app.post('/cliente', (req, res) => {
  
  const data = req.body;
  const query = `INSERT INTO client (name,phone,birthday,address,zip_code,address_ref,email) VALUES ('${data.name}','${data.phone}','${data.birthday}','${data.address}','${data.zip_code}','${data.address_ref}','${data.email}');`
  
  var mysql = require('mysql');
  var connection = mysql.createConnection(db_config);
  connection.connect();

  connection.query(query, function(err, rows, fields) {
    if (err) throw err
      res.json(rows);
    });

  connection.end();
})

// Deleta um cliente já existente
app.delete('/cliente/', (req, res) => {
  const data = req.body;
  const query = `DELETE FROM client WHERE id = ${data.id};`
  
  var mysql = require('mysql');
  var connection = mysql.createConnection(db_config);
  connection.connect();

  connection.query(query, function(err, rows, fields) {
    if (err) throw err
      res.json(rows);
    });

  connection.end();
})

// Atualiza os dados selecionados de um cliente
app.put('/cliente/:id', (req, res) => {
  const data = req.body;
  const query = `UPDATE client SET name = '${data.name}', phone = '${data.phone}', birthday = '${data.birthday}', address = '${data.address}', zip_code = '${data.zip_code}', address_ref = '${data.address_ref}', email = '${data.email}' WHERE id = '${req.params.id}';`  

  var mysql = require('mysql');
  var connection = mysql.createConnection(db_config);

  connection.connect();

  connection.query(query, function(err, rows, fields) {
    if (err) throw err
      res.json(rows);
    });

  connection.end();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})