// Crear modelo
const model = tf.sequential();



async function Execute() {

    // Obtener los valores ingresados por el usuario

    const epocas = document.getElementById("epocas").value;
    console.log('Executing')

    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    //Function que debe predecir (y = 2x +8 )
    //6 posiciones  en 1 dimension

    const tensorX = tf.tensor2d([-3,-2, -1, 0, 1, 2, 3], [7, 1]);
    const tensorY = tf.tensor2d([2, 4, 6, 8, 10, 12,14], [7, 1])


    //Carga del modelo
    await model.fit(tensorX, tensorY, { epochs: epocas });

    const history = await model.fit(tensorX, tensorY, {
        epochs: epocas,
        callbacks: tfvis.show.fitCallbacks(
            { name: 'Training Performance' },
            ['loss', 'mse'],
            { height: 200, callbacks: ['onEpochEnd'] }
        )

    });

    // Imprimir la pérdida final
    console.log(`Final Loss: ${history.history.loss[epocas - 1].toFixed(4)}`);

    alert("termino de entrenar. Oprima predecir");


}

function predecir() {
    const ejex = parseInt(document.getElementById("ejex").value);

    console.log('ingresa a predecir')
    document.getElementById('micro-out-div').innerText =
        model.predict(tf.tensor2d([ejex], [1, 1])).dataSync();
    console.log('terminó de predecir')

}