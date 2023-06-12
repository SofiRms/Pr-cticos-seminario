document.addEventListener("DOMContentLoaded", async () => {
  const modelPath = "/ttt_model.json";
  await tf.loadLayersModel(modelPath).then((model) => {
    // Tablero y jugadores
    let tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const jugadorX = -1;
    const jugadorO = 1;
    let turno = jugadorX;

    // Función para realizar una jugada
    const Jugar = (casilla) => {
      if (tablero[casilla] !== 0) {
        return; // Casilla ya ocupada, no se puede jugar aquí
      }

      if (turno === jugadorX) {
        tablero[casilla] = jugadorX;
        document.getElementById(`cell-${casilla}`).textContent = "X";
      } else if (turno === jugadorO) {
        tablero[casilla] = jugadorO;
        document.getElementById(`cell-${casilla}`).textContent = "O";
      } else {
        return; // No es el turno de ningún jugador, no se puede jugar aquí
      }

      // Verificar si hay un ganador o empate
      if (hayGanador(tablero, turno)) {
        mostrarMensaje(
          turno === jugadorX
            ? "Felicidades, gano el humano :D"
            : "Lo siento, la IA supero tu mente D:"
        );

        reiniciarJuego();
      } else if (!tablero.includes(0)) {
        mostrarMensaje("Empate, vuelve a jugar! :D");
        reiniciarJuego();
      } else {
        // Cambiar turno
        turno = turno === jugadorX ? jugadorO : jugadorX;

        if (turno === jugadorO) {
          setTimeout(() => jugarIA(), 500);
        }
      }
    };

    const jugarIA = async () => {
      const tensorTablero = tf.tensor(tablero);
      const result = await model.predict(tensorTablero.reshape([1, 9]));
      const jugadasDisponibles = [];

      result.data().then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (tablero[i] === 0) {
            jugadasDisponibles.push({ index: i, score: data[i] });
          }
        }
        jugadasDisponibles.sort((a, b) => b.score - a.score);

        if (jugadasDisponibles.length > 0) {
          Jugar(jugadasDisponibles[0].index);
        }
      });
    };

    // Función para verificar si hay un ganador
    const hayGanador = (tablero, jugador) => {
      const combinacionesGanadoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // filas
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // columnas
        [0, 4, 8],
        [2, 4, 6], // diagonales
      ];

      for (let combinacion of combinacionesGanadoras) {
        if (
          tablero[combinacion[0]] === jugador &&
          tablero[combinacion[1]] === jugador &&
          tablero[combinacion[2]] === jugador
        ) {
          return true;
        }
      }

      return false;
    };

    // Función para mostrar un mensaje en el DOM
    const mostrarMensaje = (mensaje) => {
      const mensajeElem = document.createElement("p");
      mensajeElem.textContent = mensaje;
      document.body.appendChild(mensajeElem);
      setTimeout(() => {
        mensajeElem.remove();
      }, 2000);
    };

    // Función para reiniciar el juego
    const reiniciarJuego = () => {
      tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const celdas = document.getElementsByTagName("td");
      for (let i = 0; i < celdas.length; i++) {
        celdas[i].textContent = "";
      }
      turno = jugadorX;
    };

    // Manejar eventos de clic en las celdas del tablero
    const celdas = document.getElementsByTagName("td");
    for (let i = 0; i < celdas.length; i++) {
      celdas[i].addEventListener("click", function () {
        Jugar(i);
      });
    }
  });
});
