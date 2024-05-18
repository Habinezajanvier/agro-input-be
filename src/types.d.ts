// import { CardStatus } from "./config/constant";
import { NextFunction, request } from "express";
import { HTTP_STATUS, OrderStatus, ProductType } from "./config/constant";
import {
  LandLocation,
  OrderEntity,
  ProductEntity,
  UserEntity,
} from "./database/models";

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
  phoneNumber: string;
  password?: string;
}
interface ProductDTO {
  name: string;
  available: number;
  type: ProductType;
  picture?: string;
  avatars?: string[];
  createdBy?: number;
}

interface AuthData extends UserEntity {
  token: string;
}

interface OrderDTO {
  user: UserEntity;
  status?: OrderStatus;
  location: LandLocation;
  landSize: number;
}

interface ProductOrderDTO {
  product: ProductEntity;
  order: OrderEntity;
  quantity: number;
  amount: number;
}

interface paginationDTO {
  page: number;
  pageSize: number;
}

interface ProductPagination extends paginationDTO {
  category?: ProductType;
}

declare module "express" {
  export interface Request {
    user?: any;
  }
}
