import { ProductEntity } from "../database/models";
import db from "../database";
import { DeleteResult, Repository } from "typeorm";
import { ProductDTO, ReturnData, paginationDTO } from "../types";

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
    pagination: paginationDTO
  ): Promise<ReturnData<ProductEntity>> => {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;
    const content = await this.productRepository.find({
      order: {
        createdAt: "DESC",
      },
      take: pageSize,
      skip,
    });
    const count = await this.productRepository.count();
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
