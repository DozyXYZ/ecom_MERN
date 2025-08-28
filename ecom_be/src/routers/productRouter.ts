import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ProductModel } from "@/models/productModel";

export const productRouter = Router();

// /api/products
productRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const products = await ProductModel.find();
    res.json(products);
  })
);

// /api/slug/tshirt
productRouter.get(
  "/slug/:slug",
  asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.find({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);
