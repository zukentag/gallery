import { error, log } from "console";
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URI || "";

export async function connectDb() {
  try {
    mongoose.connect(mongoUrl);
    const connction = mongoose.connection;

    connction.on("connected", () => {
      console.log("Mongo Db Connected");
    });

    connction.on("error", (err) => {
      console.log("Mongo Db Connection Error", err);
      process.exit();
    });
  } catch (error) {
    console.log("Error while connection to DB :  ", error);
  }
}
