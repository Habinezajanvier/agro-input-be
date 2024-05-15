import { Request } from "express";
import { OrderEntity } from "../database/models";
import { OrderDTO, ProductDTO, ResponseData, ReturnData } from "../types";
import { HTTP_STATUS } from "../config/constant";
import OrderService from "../services/order";
import ProductService from "../services/product";
import ProductOrderService from "../services/orderProduct";
import UserService from "../services/user";

export default class OrderController {
  constructor(
    private order: OrderService,
    private product: ProductService,
    private productOrder: ProductOrderService,
    private user: UserService
  ) {}

  /**
   * Create Order
   * @param req
   * @returns
   */
  create = async (req: Request): Promise<ResponseData<OrderEntity>> => {
    const { body } = req;

    const products = await Promise.all(
      body.products.map(async (product: any) => {
        const checkProduct = await this.product.getOne(product.id);
        console.log({ checkProduct });
        const productQuantity: number =
          product.quantity < checkProduct!.available
            ? product.quantity
            : checkProduct!.available;
        await this.product.update(checkProduct!.id, {
          available: checkProduct!.available - productQuantity,
        } as ProductDTO);

        const amount: number = productQuantity * checkProduct!.price;

        return { productQuantity, amount, product: checkProduct };
      })
    );

    const user = await this.user.getOne(Number(req.user.id));

    const newOrder: OrderDTO = {
      user: user!,
      location: {
        district: body.district,
        sector: body.sector,
        village: body.village,
      },
      landSize: body.landSize,
    };

    const data = await this.order.create(newOrder);

    await Promise.all(
      products.map((product) =>
        this.productOrder.create({
          order: data,
          product: product.product,
          quantity: product.productQuantity,
          amount: product.amount,
        })
      )
    );

    return {
      status: HTTP_STATUS.CREATED,
      error: false,
      message: "Product created successfully",
      data,
    };
  };

  /**
   * Get all orders
   * @param req
   * @returns
   */
  getAll = async (
    req: Request
  ): Promise<ResponseData<ReturnData<OrderEntity>>> => {
    const page = req.query.page!;
    const pageSize = req.query.pageSize!;

    const { content, pages, count } = await this.order.getAll({
      page: page ? +page : 1,
      pageSize: pageSize ? +pageSize : 12,
    });

    return content.length
      ? {
          status: HTTP_STATUS.SUCCESS,
          error: false,
          message: "Success",
          data: { content, pages, count },
        }
      : {
          status: HTTP_STATUS.NOT_FOUND,
          error: true,
          message: "No data found",
        };
  };

  getOne = async (req: Request): Promise<ResponseData<OrderEntity>> => {
    const id = +req.params.id;
    const body: OrderDTO = req.body;
    const data = await this.order.getOne(id);

    return data
      ? {
          status: HTTP_STATUS.SUCCESS,
          error: false,
          message: "Product updated successfully",
          data,
        }
      : {
          status: HTTP_STATUS.NOT_FOUND,
          error: true,
          message: "No data found",
        };
  };

  /**
   * Update order by providing order id and fields to be updated
   * @param req
   * @returns
   */
  update = async (req: Request): Promise<ResponseData<OrderEntity>> => {
    const id = +req.params.id;
    const body: OrderDTO = req.body;
    const data = await this.order.update(id, { ...body });

    return data
      ? {
          status: HTTP_STATUS.SUCCESS,
          error: false,
          message: "Product updated successfully",
          data,
        }
      : {
          status: HTTP_STATUS.NOT_FOUND,
          error: true,
          message: "No data found",
        };
  };

  /**
   * Delete a order by id
   * @param req
   * @returns
   */
  delete = async (
    req: Request
  ): Promise<ResponseData<Record<"data", null>>> => {
    const id = +req.params.id;

    const data = await this.order.delete(id);

    return data
      ? {
          status: HTTP_STATUS.SUCCESS,
          error: false,
          message: "Product deleted successfully",
        }
      : {
          status: HTTP_STATUS.NOT_FOUND,
          error: true,
          message: "No product found",
        };
  };
}
