import { OrderEntity } from "../database/models";
import db from "../database";
import { DeleteResult, Repository } from "typeorm";
import { OrderDTO, ReturnData, paginationDTO } from "../types";

export default class OrderService {
  private orderRepository: Repository<OrderEntity>;
  constructor() {
    this.orderRepository = db.getRepository(OrderEntity);
  }

  /**
   * Create new user
   * @returns
   */
  create = async (order: OrderDTO): Promise<OrderEntity> => {
    const newUser = this.orderRepository.create(order);
    return await this.orderRepository.save(newUser);
  };

  /**
   * Get all
   * @returns
   */
  getAll = async (
    pagination: paginationDTO
  ): Promise<ReturnData<OrderEntity>> => {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;
    const content = await this.orderRepository.find({
      order: {
        createdAt: "DESC",
      },
      take: pageSize,
      skip,
      relations: {
        user: true,
      },
      select: {
        id: true,
        location: {
          district: true,
          sector: true,
          village: true,
        },
        landSize: true,
        productOder: {
          id: true,
          amount: true,
          quantity: true,
        },
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    });
    const count = await this.orderRepository.count();
    const pages = page ? Math.ceil(count / pageSize) : undefined;
    return { content, count, pages };
  };

  /**
   *Get one user
   * @param id
   * @returns
   */
  getOne = async (id: number): Promise<OrderEntity | null> => {
    return await this.orderRepository.findOne({
      where: { id },
      relations: {
        user: true,
        productOder: {
          product: true,
        },
      },
      select: {
        id: true,
        location: {
          district: true,
          sector: true,
          village: true,
        },
        landSize: true,
        productOder: {
          id: true,
          amount: true,
          quantity: true,
          product: {
            name: true,
            picture: true,
            price: true,
          },
        },
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    });
  };

  /**
   * Update user
   * @param id
   * @param data
   * @returns
   */
  update = async (id: number, data: OrderDTO): Promise<OrderEntity | null> => {
    const user = (await this.orderRepository.findOneBy({ id })) as OrderEntity;
    this.orderRepository.merge(user, data);
    return await this.orderRepository.save(user);
  };

  /**
   * Delete a user
   * @param id
   * @returns
   */
  delete = async (id: number): Promise<DeleteResult | null> => {
    const result = await this.orderRepository.delete(id);
    return result.affected ? result : null;
  };
}
