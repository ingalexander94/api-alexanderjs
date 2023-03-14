const moongose = require("mongoose");

const dbConnection = async () => {
  try {
    await moongose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB Online");
  } catch (error) {
    console.error("No se pudo realizar la conexión a mongo");
    console.error(error);
  }
};

module.exports = dbConnection;
