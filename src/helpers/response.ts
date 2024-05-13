import { Response } from "express";
import { ResponseData } from "../types";

const jsonResponse = <T>(res: Response, data: ResponseData<T>) => {
  return res.status(data.status).json({
    error: data.error,
    message: data.message,
    data: data.data,
  });
};

export default jsonResponse;
