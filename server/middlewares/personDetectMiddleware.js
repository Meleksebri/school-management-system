const tf = require("@tensorflow/tfjs-node");
const coco_ssd = require("@tensorflow-models/coco-ssd");
const fs = require("fs");

exports.makePredictions = async (req, res, next) => {
  if (req?.file?.filename) {
    const imagePath = `./uploads/${req.file.filename}`;
    try {
      const loadModel = async (img) => {
        // laod model
        console.log("Loading.......");
        const model = await coco_ssd.load({
          base: "mobilenet_v1",
        });

        const predictions = await model.detect(img, 3, 0.25);
        if (predictions[0]?.class === "person") {
          next();
        } else {
          return res
            .status(404)
            .json({ msg: "Please upload a person's image" });
        }
      };

      const image = fs.readFileSync(imagePath);
      let tensor = tf.node.decodeImage(image, 3);
      await loadModel(tensor);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Expected image (BMP , JPEG , PNG or GIF)!" });
    }
  } else {
    next();
  }
};
