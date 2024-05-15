import { ProductEntity } from "../database/models";
import db from "../database";
import { DeleteResult, Repository } from "typeorm";
import { ProductDTO, ReturnData, paginationDTO } from "../types";

export default class UserService {
  private userRepository: Repository<ProductEntity>;
  constructor() {
    this.userRepository = db.getRepository(ProductEntity);
  }

  /**
   * Create new user
   * @returns
   */
  create = async (product: ProductDTO): Promise<ProductEntity> => {
    const newUser = this.userRepository.create(product);
    return await this.userRepository.save(newUser);
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
    const content = await this.userRepository.find({
      order: {
        createdAt: "DESC",
      },
      take: pageSize,
      skip,
    });
    const count = await this.userRepository.count();
    const pages = page ? Math.ceil(count / pageSize) : undefined;
    return { content, count, pages };
  };

  /**
   *Get one user
   * @param id
   * @returns
   */
  getOne = async (id: number): Promise<ProductEntity | null> => {
    return await this.userRepository.findOne({ where: { id } });
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
    const user = (await this.userRepository.findOneBy({ id })) as ProductEntity;
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  };

  /**
   * Delete a user
   * @param id
   * @returns
   */
  delete = async (id: number): Promise<DeleteResult | null> => {
    const result = await this.userRepository.delete(id);
    return result.affected ? result : null;
  };
}
