import express, { Request, Response } from "express";
import { sampleProducts } from "./data";

const app = express();

app.get("/api/products", (req: Request, res: Response) => {
  res.json(sampleProducts);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
