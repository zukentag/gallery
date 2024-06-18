import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URI || "";

export async function connectDb() {
  try {
    await mongoose.connect(mongoUrl, {
      ssl: true,
      tlsAllowInvalidCertificates: true,
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("-----------> MongoDB Connected");
    });

    connection.on("error", (err) => {
      console.error("---------> MongoDB Connection Error", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Error while connecting to DB:", error);
  }
}
