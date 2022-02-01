const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Online data base");
  } catch (error) {
    console.log(error);
    throw new Error("Ocurrio un error al conectarse a la DB");
  }
};

module.exports = {
  connectionDB,
};
