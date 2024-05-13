import services from "../services";
import AuthController from "./auth";

export default {
  authController: new AuthController(services.userService),
};
