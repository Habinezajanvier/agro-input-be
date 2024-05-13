import { Router } from "express";
import controller from "../controllers";
import asyncHandler from "../middleware/asyncHandler";
// import { loginValidator, registerValidator } from "../middlewares/validators";

const { authController } = controller;

const route = Router();

route.post("/login", asyncHandler(authController.login));
route.post("/signup", asyncHandler(authController.signup));

export default route;
