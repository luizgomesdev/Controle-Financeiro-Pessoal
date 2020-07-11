import mongoose from "mongoose";

const connectMongoDB = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conectado ao banco de dados");
  } catch (erro) {
    console.log(erro);
  }
};

export default connectMongoDB;
