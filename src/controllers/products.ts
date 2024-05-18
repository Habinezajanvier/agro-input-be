import { Request } from "express";
import { ProductEntity } from "../database/models";
import ProductService from "../services/product";
import { ProductDTO, ResponseData, ReturnData } from "../types";
import { HTTP_STATUS, ProductType } from "../config/constant";

export default class ProductController {
  constructor(private product: ProductService) {}

  /**
   * Create Product
   * @param req
   * @returns
   */
  create = async (req: Request): Promise<ResponseData<ProductEntity>> => {
    const body: ProductDTO = req.body;

    const data = await this.product.create({ ...body });

    return {
      status: HTTP_STATUS.CREATED,
      error: false,
      message: "Product created successfully",
      data,
    };
  };

  /**
   * Get all Registered products
   * @param req
   * @returns
   */
  getAll = async (
    req: Request
  ): Promise<ResponseData<ReturnData<ProductEntity>>> => {
    const page = req.query.page!;
    const pageSize = req.query.pageSize!;
    const category = req.query.category!;

    // const productType: ProductType = category ? (category as unknown as ProductType) :

    const { content, pages, count } = await this.product.getAll({
      page: page ? +page : 1,
      pageSize: pageSize ? +pageSize : 12,
      category: Number(category)
        ? (category as unknown as ProductType)
        : undefined,
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

  /**
   * Update product by providing product id and fields to be updated
   * @param req
   * @returns
   */
  update = async (req: Request): Promise<ResponseData<ProductEntity>> => {
    const id = +req.params.id;
    const body: ProductDTO = req.body;
    const data = await this.product.update(id, { ...body });

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
   * Delete a product by id
   * @param req
   * @returns
   */
  delete = async (
    req: Request
  ): Promise<ResponseData<Record<"data", null>>> => {
    const id = +req.params.id;

    const data = await this.product.delete(id);

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
