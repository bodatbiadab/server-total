module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      nama_produk: String,
      deskripsi: String,
      kategori_produk: String,
      section_produk: String,
      harga: {
        type: Number,
      },
      link_photo: String,
      merk_product: String,
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("products", schema);
};
