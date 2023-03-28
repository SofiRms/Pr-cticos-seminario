const express = require('express');
const math = require('mathjs');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post('/multiply-matrices', (req, res) => {
  const matrix1Rows = parseInt(req.body.matrix1Rows);
  const matrix1Cols = parseInt(req.body.matrix1Cols);
  const matrix1Data = req.body.matrix1Data.split('\n').map(row => row.split(' ').map(Number));

  const matrix2Rows = parseInt(req.body.matrix2Rows);
  const matrix2Cols = parseInt(req.body.matrix2Cols);
  const matrix2Data = req.body.matrix2Data.split('\n').map(row => row.split(' ').map(Number));

  const matrix1 = math.matrix(matrix1Data);
  const matrix2 = math.matrix(matrix2Data);

  const result = math.multiply(matrix1, matrix2);

  res.send(`<p>El resultado de la multiplicación de matrices es:</p><pre>${math.format(result)}</pre>`);
});

app.listen(4000, () => {
  console.log('Servidor corriendo en el puerto 4000');
});