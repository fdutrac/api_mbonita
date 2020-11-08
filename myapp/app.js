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
  
// Lista todos os clientes 
app.get('/cliente', (req, res) => {

  var mysql = require('mysql');
  var connection = mysql.createConnection(db_config);
  connection.connect();

  connection.query('select * from client', function(err, rows, fields) {
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

  connection.query('select * from client where id ='+ req.params.id +";", function(err, rows, fields) {
    if (err) throw err
      res.json(rows);
    });

  connection.end();
})

// Insere um novo cliente
app.post('/cliente', (req, res) => {
  
  const data = req.body
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


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})