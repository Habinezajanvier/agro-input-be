import { Request, Response } from "express";
import { decode } from "../helpers/jwtToken";
import jsonResponse from "../helpers/response";
import { HTTP_STATUS } from "../config/constant";
import services from "../services";

class Authorization {
  constructor() {}

  /**
   * Check authentication and authorise
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public checkAuth = (req: Request, res: Response, next: Function) => {
    try {
      const { authorization: auth_token } = req.headers;
      const token = auth_token?.split(" ")[1];
      if (!token)
        return jsonResponse(res, {
          status: HTTP_STATUS.UNAUTHORIZED,
          error: true,
          message: "Unauthenticated user",
        });

      const decodedToken = decode(token);
      if (!decodedToken)
        return jsonResponse(res, {
          status: HTTP_STATUS.UNAUTHORIZED,
          error: true,
          message: "Unable to authenticate",
        });
      req.user = decodedToken;
      return next();
    } catch (error: any) {
      return jsonResponse(res, {
        status: HTTP_STATUS.UNAUTHORIZED,
        error: true,
        message: error.message || "Unable to authenticate",
      });
    }
  };
}

export default new Authorization();
