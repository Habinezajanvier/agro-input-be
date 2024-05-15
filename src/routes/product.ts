import { Router } from "express";
import controller from "../controllers";
import asyncHandler from "../middleware/asyncHandler";

const { productController } = controller;

const route = Router();

route.post("/", asyncHandler(productController.create));
route.get("/", asyncHandler(productController.getAll));
route.put("/:id", asyncHandler(productController.update));
route.delete("/:id", asyncHandler(productController.delete));

export default route;
