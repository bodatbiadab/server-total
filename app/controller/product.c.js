const db = require("../models");
const fs = require("fs");
const products = db.product;

exports.create = (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}/`;
  req.body.link_photo = baseUrl + "uploads/" + req.file.filename;
  products
    .create(req.body)
    .then(() => res.send({ message: `Data berhasil disimpan adick2` }))
    .catch((err) => {
      res.status(500).send({ message: err });
      console.log("error:", err);
    });
};

exports.find = (req, res) => {
  products
    .find({ nama_produk: { $regex: new RegExp(req.params.value, "i") } })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send("error"));
};
exports.findAll = (req, res) => {
  products
    .find()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send("error"));
};
exports.show = (req, res) => {
  const id = req.params.id;

  products
    .findById(id)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500), res.send("Kesalahan pada :", err);
    });
};
exports.update = (req, res) => {
  const id = req.params.id;

  products
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) =>
      data
        ? res.send({ message: "Berhasil!" })
        : res.status(404).send({ message: "Data tidak ada" })
    )
    .catch((err) => {
      res.status(404), res.send(err);
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  // Mengambil produk sebelum dihapus untuk mendapatkan nama file foto
  products
    .findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).send({ message: "Data tidak ditemukan" });
      }

      const fileName = product.link_photo.split("uploads/")[1];

      // Menghapus file foto terkait
      fs.unlink(`uploads/${fileName}`, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).send({ message: "Gagal menghapus file foto" });
        }

        // Jika penghapusan file berhasil, lanjutkan untuk menghapus produk dari database
        products
          .deleteOne({ _id: id })
          .then((data) => {
            if (!data) {
              return res.status(404).send({ message: "Gagal menghapus data" });
            }

            res.send({ message: "Data berhasil dihapus" });
          })
          .catch((err) => {
            console.error("Error deleting data:", err);
            res.status(500).send({ message: "Gagal menghapus data" });
          });
      });
    })
    .catch((err) => {
      console.error("Error finding product:", err);
      res.status(500).send({ message: "Gagal mencari data produk" });
    });
};
