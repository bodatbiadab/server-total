const multer = require("multer");

module.exports = function (app) {
  const product = require("../controller/product.c");
  const r = require("express").Router();
  const multer = require("multer");
  const path = require("path");
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Menentukan direktori tempat menyimpan file yang diunggah
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Menentukan nama file yang diunggah
    },
  });

  const upload = multer({ storage: storage });
  r.get("/search/:value", product.find);
  r.get("/", product.findAll);
  r.get("/:id", product.show);
  r.post("/", product.create);
  r.put("/:id", product.update);
  r.delete("/:id", product.delete);

  app.use("/product", upload.single("link_photo"), r);
};
