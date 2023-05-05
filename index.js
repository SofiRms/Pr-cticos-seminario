// Create a simple model.
const model = tf.sequential();

async function Execute() {

    // Obtener los valores ingresados por el usuario
    const ejex = parseInt(document.getElementById("ejex").value);
    const epocas = document.getElementById("epocas").value;
    console.log('Executing')

    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    // Generate some synthetic data for training.Function que debe predecir (y = 2x - 1)
    //la 2da dimension se interpreta: 6 posiciones  en 1 dimension
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);

    // Train the model using the data.
    await model.fit(xs, ys, { epochs: epocas });

    // Use the model to do inference on a data point the model hasn't seen.
    // Should print approximately 39.
    predecir(ejex)
}
    

function predecir(ejex){
console.log(ejex)
document.getElementById('micro-out-div').innerText =
        model.predict(tf.tensor2d([ejex], [1, 1])).dataSync();
    }
