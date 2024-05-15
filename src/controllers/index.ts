import services from "../services";
import AuthController from "./auth";
import ProductController from "./products";
import OrderController from "./order";

export default {
  authController: new AuthController(services.userService),
  productController: new ProductController(services.productService),
  ordercontroller: new OrderController(
    services.orderService,
    services.productService,
    services.productOrderService,
    services.userService
  ),
};
