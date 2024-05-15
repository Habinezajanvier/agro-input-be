import { Router } from "express";
import controller from "../controllers";
import asyncHandler from "../middleware/asyncHandler";
import authorization from "../middleware/checkAuth";

const { authController } = controller;

const route = Router();

route.post("/login", asyncHandler(authController.login));
route.post("/signup", asyncHandler(authController.signup));
route.post(
  "/profile",
  authorization.checkAuth,
  asyncHandler(authController.profile)
);

export default route;
