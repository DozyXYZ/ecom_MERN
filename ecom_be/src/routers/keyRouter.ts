import { Router, Request, Response } from "express";

const keyRouter = Router();

// GET /api/keys/paypal
keyRouter.get("/paypal", (req: Request, res: Response) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID || "sb" });
});

export default keyRouter;
