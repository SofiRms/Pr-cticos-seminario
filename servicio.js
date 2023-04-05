const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post('/sumar_matrices', (req, res) => {
  let matrix1 = req.body.matrix1
  let matrix2 = req.body.matrix2

  const rows = matrix1.length;
  const cols = matrix1[0].length;
  let resultMatrix = new Array(rows);

  for (let i = 0; i < rows; i++) {
    resultMatrix[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      resultMatrix[i][j] = parseInt(matrix1[i][j])+ parseInt(matrix2[i][j]);
    }
  }
  resultado= resultMatrix
  res.json(resultado);
})




app.listen(5500, () => {
  console.log('Servidor escuchando en el puerto 5500');
});
