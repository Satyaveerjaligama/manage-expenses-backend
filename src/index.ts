import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "../config/db";
import { appRouter } from "../routes/appRouter";
const cors = require("cors");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 9000;
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

connectDB();

app.use(express.json());

app.use("/", appRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
