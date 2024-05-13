import { Router, Request, Response } from "express";
import auth from "./auth";

const routes = Router();

routes.use("/auth", auth);

routes.get("/", (_req: Request, res: Response) => {
  return res
    .status(200)
    .json({ error: false, message: "Welcome to agro-put apis" });
});

export default routes;
