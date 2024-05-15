import services from "../services";
import AuthController from "./auth";
import ProductController from "./products";

export default {
  authController: new AuthController(services.userService),
  productController: new ProductController(services.productService),
};
