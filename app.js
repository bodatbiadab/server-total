const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./app/models");

const corsConfig = {
  origin: "*",
};

app.use(express.json());
app.use(cors(corsConfig));

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

db.mongoose
  .connect(db.url, mongooseConfig)
  .then(() => console.log("Berhasil konek!"))
  .catch((err) => {
    console.log("Gagal karena:", err.message);
    process.exit();
  });
app.use("/uploads", express.static("uploads"));
require("./app/routes/routes")(app);
const port = process.env.port || 6969;

app.listen(port, () => {
  console.log(`Server berjalan di http:${port}/product`);
});
