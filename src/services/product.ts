import { ProductEntity } from "../database/models";
import db from "../database";
import { DeleteResult, Repository } from "typeorm";
import {
  ProductDTO,
  ProductPagination,
  ReturnData,
  paginationDTO,
} from "../types";

export default class ProductService {
  private productRepository: Repository<ProductEntity>;
  constructor() {
    this.productRepository = db.getRepository(ProductEntity);
  }

  /**
   * Create new user
   * @returns
   */
  create = async (product: ProductDTO): Promise<ProductEntity> => {
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  };

  /**
   * Get all
   * @returns
   */
  getAll = async (
    pagination: ProductPagination
  ): Promise<ReturnData<ProductEntity>> => {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;
    const [content, count] = await Promise.all([
      this.productRepository.find({
        where: { type: pagination.category },
        order: {
          name: "ASC",
        },
        take: pageSize,
        skip,
      }),
      this.productRepository.count({ where: { type: pagination.category } }),
    ]);

    const pages = page ? Math.ceil(count / pageSize) : undefined;
    return { content, count, pages };
  };

  /**
   *Get one user
   * @param id
   * @returns
   */
  getOne = async (id: number): Promise<ProductEntity | null> => {
    return await this.productRepository.findOne({ where: { id } });
  };

  /**
   * Update user
   * @param id
   * @param data
   * @returns
   */
  update = async (
    id: number,
    data: ProductDTO
  ): Promise<ProductEntity | null> => {
    const user = (await this.productRepository.findOneBy({
      id,
    })) as ProductEntity;
    this.productRepository.merge(user, data);
    return await this.productRepository.save(user);
  };

  /**
   * Delete a user
   * @param id
   * @returns
   */
  delete = async (id: number): Promise<DeleteResult | null> => {
    const result = await this.productRepository.delete(id);
    return result.affected ? result : null;
  };
}
