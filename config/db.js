import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to mongodb Database ${connect.connection.host}`.bgBlue.white
    );
  } catch (error) {
    console.log(`Erron in mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
