import { UserEntity } from "../database/models";
import db from "../database";
import { DeleteResult, Repository } from "typeorm";
import { UserDTO } from "../types";

export default class UserService {
  private userRepository: Repository<UserEntity>;
  constructor() {
    this.userRepository = db.getRepository(UserEntity);
  }

  /**
   * Create new user
   * @returns
   */
  create = async (user: UserDTO): Promise<UserEntity> => {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  };

  /**
   * Get all
   * @returns
   */
  getAll = async (): Promise<UserEntity[]> => {
    return await this.userRepository.find();
  };

  /**
   *Get one user
   * @param id
   * @returns
   */
  getOne = async (id: number): Promise<UserEntity | null> => {
    return await this.userRepository.findOne({ where: { id } });
  };

  /**
   *
   * @param phoneNumber
   * @returns
   */
  checkUser = async (email: string): Promise<UserEntity | null> => {
    return await this.userRepository.findOne({
      where: { email },
    });
  };

  /**
   * Update user
   * @param id
   * @param data
   * @returns
   */
  update = async (id: number, data: UserDTO): Promise<UserEntity | null> => {
    const user = (await this.userRepository.findOneBy({ id })) as UserEntity;
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
