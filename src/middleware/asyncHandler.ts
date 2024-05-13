import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../config/constant";
import jsonResponse from "../helpers/response";
import { Controller } from "../types";
import { Logger } from "../utils/logger";

/**
 * Handles all server error
 * @param func callback function
 * @returns
 */
const asyncHandler =
  (func: Controller) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await func(req, next);
      return data
        ? jsonResponse(res, {
            status: data.status,
            message: data.message,
            error: data.error,
            data: data.data,
          })
        : next();
    } catch (error: any) {
      const logger = new Logger();
      logger.error(error);
      jsonResponse(res, {
        status: HTTP_STATUS.SERVER_ERROR,
        error: true,
        message: error.detail
          ? error.detail
          : error.message || "Internal Server error",
      });
    }
  };

export default asyncHandler;
