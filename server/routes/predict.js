const express = require('express');
const router = express.Router();
var request = require('request');
const tf = require("@tensorflow/tfjs");
const tf_node = require("@tensorflow/tfjs-node");

async function imageToUint8Array(image, context) {
  return new Promise((resolve, reject) => {
    context.width = image.width;
    context.height = image.height;
    context.drawImage(image, 0, 0);
    context.canvas.toBlob(blob => blob.arrayBuffer()
      .then(buffer => resolve(new Uint8Array(buffer))).catch(reject)
    )
  });
}

router.post("/", async (req, res) => {
    try {
        const handler = tf_node.io.fileSystem("static/model.json")
        const model = await tf.loadLayersModel(handler)
        const url = req.query.url;
        const labels = ["orchids", "poppies", "roses", "sunflowers", "tulips", "bottles", "bowls", "cans", "cups", "plates", "apples", "mushrooms", "oranges", "pears", "sweet peppers", "clock", "computer keyboard", "lamp", "telephone", "television", "bed", "chair", "couch", "table", "wardrobe", "bicycle", "lawn-mower"];

        request({ url, encoding: null }, (err, resp, buffer) => {
            // Use the buffer
            // buffer contains the image data
            // typeof buffer === 'object'
            const tensor = tf_node.node.decodeImage(buffer).resizeBilinear([32,32]).reshape([1,32,32,3])
            const prediction = model.predict(tensor).argMax(-1);
            console.log(prediction);
            const values = prediction.dataSync();
            const arr = Array.from(values);
            const idx = arr[0]
            const label = labels[idx];
            res.send(label);
        });
    } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})

module.exports = router;
