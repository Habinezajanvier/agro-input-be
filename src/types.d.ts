// import { CardStatus } from "./config/constant";
import { NextFunction, request } from "express";
import { HTTP_STATUS } from "./config/constant";
import { UserEntity } from "./database/models";

declare type DbType = "mysql" | "postgres" | "mssql";

declare type envData = {
  username?: string;
  password?: string;
  host?: string;
  port?: string;
  name?: string;
  type: DbType;
};

interface ReturnData<T> {
  content: T[];
  count: number;
  pages?: number;
}

interface ResponseData<T> {
  status: HTTP_STATUS;
  error: boolean;
  message: string;
  data?: T | ResponseData<T>;
}

declare type Controller = (
  body: typeof request.body,
  next?: NextFunction
) => Promise<ResponseData<Record<string, any>>>;

interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

interface AuthData extends UserEntity {
  token: string;
}
