import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URI || "";

export async function connectDb() {
  try {
    console.log("-------------->", "connecting");
    mongoose.connect(mongoUrl);
    const connection = mongoose.connection;
    console.log("-------------->", connection);
    connection.on("connected", () => {
      console.log("Mongo Db Connected");
    });

    connection.on("error", (err) => {
      console.log("Mongo Db Connection Error", err);
      process.exit();
    });
  } catch (error) {
    console.log("Error while connection to DB :  ", error);
  }
}
