import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/manage_expenses_app");
    console.log("DB connection established");
  } catch (error) {
    console.error("Error while establishing DB connection", error);
  }
};

export default connectDB;
