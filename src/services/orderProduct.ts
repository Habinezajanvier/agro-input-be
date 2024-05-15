import { OrderProductsEntity } from "../database/models";
import db from "../database";
import { DeleteResult, Repository } from "typeorm";
import { ProductOrderDTO } from "../types";

export default class ProductOrderService {
  private productOrderRepository: Repository<OrderProductsEntity>;
  constructor() {
    this.productOrderRepository = db.getRepository(OrderProductsEntity);
  }

  /**
   * Create new user
   * @returns
   */
  create = async (order: ProductOrderDTO): Promise<OrderProductsEntity> => {
    const newProdOrder = this.productOrderRepository.create(order);
    return await this.productOrderRepository.save(newProdOrder);
  };

  /**
   * Get all
   * @returns
   */
  getAll = async (): Promise<OrderProductsEntity[]> => {
    return await this.productOrderRepository.find();
  };

  /**
   *Get one user
   * @param id
   * @returns
   */
  getOne = async (id: number): Promise<OrderProductsEntity | null> => {
    return await this.productOrderRepository.findOne({ where: { id } });
  };

  /**
   * Update user
   * @param id
   * @param data
   * @returns
   */
  update = async (
    id: number,
    data: ProductOrderDTO
  ): Promise<OrderProductsEntity | null> => {
    const user = (await this.productOrderRepository.findOneBy({
      id,
    })) as OrderProductsEntity;
    this.productOrderRepository.merge(user, data);
    return await this.productOrderRepository.save(user);
  };

  /**
   * Delete a user
   * @param id
   * @returns
   */
  delete = async (id: number): Promise<DeleteResult | null> => {
    const result = await this.productOrderRepository.delete(id);
    return result.affected ? result : null;
  };
}
