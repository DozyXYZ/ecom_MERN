import { sampleProducts, sampleUsers } from "@/data";
import { ProductModel } from "@/models/productModel";
import { UserModel } from "@/models/userModel";
import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";

const seedRouter = Router();

seedRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts);

    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);

    res.send({ createdProducts, createdUsers });
  })
);

export default seedRouter;
