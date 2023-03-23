function sumarMatrices() {
    // Obtener los inputs de las matrices y la tabla del resultado
    const m11 = parseInt(document.getElementById("m11").value);
    const m12 = parseInt(document.getElementById("m12").value);
    const m13 = parseInt(document.getElementById("m13").value);

    const m21 = parseInt(document.getElementById("m21").value);
    const m22 = parseInt(document.getElementById("m22").value);
    const m23 = parseInt(document.getElementById("m23").value);

    const m31 = parseInt(document.getElementById("m31").value);
    const m32 = parseInt(document.getElementById("m32").value);
    const m33 = parseInt(document.getElementById("m33").value);

    const n11 = parseInt(document.getElementById("n11").value);
    const n12 = parseInt(document.getElementById("n12").value);
    const n13 = parseInt(document.getElementById("n13").value);
   
    const n21 = parseInt(document.getElementById("n21").value);
    const n22 = parseInt(document.getElementById("n22").value);
    const n23 = parseInt(document.getElementById("n23").value);

    const n31 = parseInt(document.getElementById("n31").value);
    const n32 = parseInt(document.getElementById("n32").value);
    const n33 = parseInt(document.getElementById("n33").value);
    const matriz1 = [
      [m11, m12, m13],
      [m21, m22, m23],
      [m31, m32, m33]
    ];
    const matriz2 = [
      [n11, n12, n13],
      [n21, n22, n23],
      [n31, n32, n33]
    ];
    var resultado = document.getElementById("resultado");

    // Sumar las matrices
    var suma = [[], [], []];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        suma[i][j] = matriz1[i][j] + matriz2[i][j];
      }
    }

    // Mostrar la matriz resultante en la tabla correspondiente
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        resultado.rows[i].cells[j].innerHTML = suma[i][j];
      }
    }
  }