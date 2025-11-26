import mongoose from "mongoose";

import { mongodbUri, dbPassword, dbUsername } from "./config.ts";

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUri, {
      auth: {
        username: dbUsername,
        password: dbPassword,
      },
      authSource: "admin",
    });
    console.log("connected to mongodb");
  } catch (err) {
    console.log("error connecting mongodb", err);
  }
}

export default connectDB;
