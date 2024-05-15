import { Router, Request, Response } from "express";
import auth from "./auth";
import products from "./product";
import orders from "./order";
import asyncHandler from "../middleware/asyncHandler";

const routes = Router();

routes.use("/auth", auth);
routes.use("/products", products);
routes.use("/orders", orders);

routes.get("/", (_req: Request, res: Response) => {
  return res
    .status(200)
    .json({ error: false, message: "Welcome to agro-put apis" });
});

export default routes;
