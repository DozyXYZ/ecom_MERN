import { sampleProducts } from "@/data";
import { ProductModel } from "@/models/productModel";
import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";

const seedRouter = Router();

seedRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts);
    res.send({ createdProducts });
  })
);

export default seedRouter;
