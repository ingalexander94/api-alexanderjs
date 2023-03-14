const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const dbConnection = require("./database/db.connection");
require("dotenv").config();

const app = express();
dbConnection();

const { PORT } = process.env;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "images/uploads"),
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}${path.extname(file.originalname)}`);
  },
});

app.use(multer({ storage }).single("photo"));

//Rutas
app.use("/api/auth", require("./routes/auth.router"));
app.use("/api/services", require("./routes/services.router"));
app.use("/api/portfolio", require("./routes/apps.router"));
app.use("/api/skills", require("./routes/skills.router"));
app.use("/api/goals", require("./routes/goals.router"));
app.use("/api/testimonials", require("./routes/testimonials.router"));

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
