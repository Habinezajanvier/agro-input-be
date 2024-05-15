import { Request, Response } from "express";
import UserService from "../services/user";
import { comparePassword, encode, hashPassword } from "../helpers";
import { AuthData, ResponseData, UserDTO } from "../types";
import { HTTP_STATUS } from "../config/constant";

/**
 * Auth controller
 */
export default class AuthController {
  constructor(private user: UserService) {}

  /**
   * Signup
   * @param req
   * @param res
   * @returns
   */
  public signup = async (req: Request): Promise<ResponseData<AuthData>> => {
    const { firstName, lastName, email, password } = req.body;

    const userExist = await this.user.checkUser(email);

    if (userExist)
      return {
        status: HTTP_STATUS.CONFLICT,
        error: true,
        message: "Email exist, try login",
      };

    const hashedPassword = await hashPassword(password);

    const data: UserDTO = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    const newUser = await this.user.create(data);
    const token = encode({ email, id: newUser.id });

    return {
      status: HTTP_STATUS.CREATED,
      error: false,
      message: "Account created successfully",
      data: {
        token,
        ...newUser,
      },
    };
  };

  /**
   * Login
   * @param req
   * @param res
   * @returns
   */
  public login = async (req: Request): Promise<ResponseData<AuthData>> => {
    const { email, password } = req.body;
    const userExist = await this.user.checkUser(email);

    const validPass = await comparePassword(password, userExist!.password);
    if (!userExist || !validPass)
      return {
        status: HTTP_STATUS.FORBIDDEN,
        error: true,
        message: "Email or password exist",
      };

    const token = encode({ email, id: userExist.id });
    return {
      status: HTTP_STATUS.SUCCESS,
      error: false,
      message: "User logged successfully",
      data: {
        ...userExist,
        token,
      },
    };
  };
}
