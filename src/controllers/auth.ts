import { Request, Response } from "express";
import UserService from "../services/user";
import { comparePassword, encode, hashPassword } from "../helpers";
import { AuthData, ResponseData, UserDTO } from "../types";
import { HTTP_STATUS } from "../config/constant";
import { UserEntity } from "../database/models";

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
  public signup = async (
    req: Request
  ): Promise<ResponseData<Record<"token", string>>> => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

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
      phoneNumber,
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
      },
    };
  };

  /**
   * Login
   * @param req
   * @param res
   * @returns
   */
  public login = async (
    req: Request
  ): Promise<ResponseData<Record<"token", string>>> => {
    const { email, password } = req.body;
    const userExist = await this.user.checkUser(email);

    if (!userExist)
      return {
        status: HTTP_STATUS.FORBIDDEN,
        error: true,
        message: "Email or password doesn't exist",
      };

    const validPass = await comparePassword(password, userExist.password);
    if (!validPass)
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
        token,
      },
    };
  };

  /**
   * Get profile of the logged in user
   * @param req
   * @returns
   */
  public profile = async (req: Request): Promise<ResponseData<UserEntity>> => {
    const data = await this.user.getOne(+req.user.id);

    return data
      ? {
          status: HTTP_STATUS.SUCCESS,
          error: false,
          message: "Success",
          data,
        }
      : {
          status: HTTP_STATUS.NOT_FOUND,
          error: true,
          message: "No user fuund",
        };
  };
}
