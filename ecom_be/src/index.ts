import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter";
import seedRouter from "./routers/seedRouter";
import userRouter from "./routers/userRouter";
import orderRouter from "./routers/orderRouter";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/t94shop";
mongoose.set("strictQuery", true);
mongoose.connect(MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
});

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use("/api/seed", seedRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
