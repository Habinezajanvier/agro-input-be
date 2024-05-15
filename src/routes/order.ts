import { Router } from "express";
import controller from "../controllers";
import asyncHandler from "../middleware/asyncHandler";
import authorization from "../middleware/checkAuth";

const { ordercontroller } = controller;

const route = Router();

route.post("/", authorization.checkAuth, asyncHandler(ordercontroller.create));
route.get("/", asyncHandler(ordercontroller.getAll));
route.get("/:id", asyncHandler(ordercontroller.getOne));
route.put("/:id", asyncHandler(ordercontroller.update));
route.delete("/:id", asyncHandler(ordercontroller.delete));

export default route;
