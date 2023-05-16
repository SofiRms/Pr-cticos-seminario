// Create a simple model.
const model = tf.sequential();



async function Execute() {

    // Obtener los valores ingresados por el usuario

    const epocas = document.getElementById("epocas").value;
    console.log('Executing')

    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    // Generate some synthetic data for training.Function que debe predecir (y = 2x - 1)
    //la 2da dimension se interpreta: 6 posiciones  en 1 dimension

    const tensorX = tf.tensor2d([-2, -1, 0, 1, 2, 3, 4], [7, 1]);
    const tensorY = tf.tensor2d([-4, -1, 2, 5, 8, 11, 14], [7, 1])


    // Train the model using the data.
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

    alert("termino de entrenar");


}

function predecir() {
    const ejex = parseInt(document.getElementById("ejex").value);

    console.log('ingresa a predecir')
    document.getElementById('micro-out-div').innerText =
        model.predict(tf.tensor2d([ejex], [1, 1])).dataSync();
    console.log('terminó de predecir')

}