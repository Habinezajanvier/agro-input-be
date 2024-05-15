import UserService from "./user";
import ProductService from "./product";
import OrderService from "./order";
import ProductOrderService from "./orderProduct";

export default {
  userService: new UserService(),
  productService: new ProductService(),
  orderService: new OrderService(),
  productOrderService: new ProductOrderService(),
};
