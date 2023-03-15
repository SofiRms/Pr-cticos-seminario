const express = require('express');
const app = express();
const bodyParser=require("body-parser")
app.use(express.static('public'));

app.get("/suma",(req,res)=>{
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.send("Por favor, ingrese números válidos.");
  } else {
    const resultado = num1 + num2;
    res.send("La suma de " + num1 + " y " + num2 + " es: " + resultado);
  }
});

app.listen('3000', function() {
  console.log('Servidor web escuchando en el puerto 3000');
});

