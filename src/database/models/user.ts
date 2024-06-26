import { Column, Entity } from "typeorm";
import { BaseColumnSchema } from "./base";
import { UserStatus } from "../../config/constant";

@Entity({ name: "users" })
export class UserEntity extends BaseColumnSchema {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column()
  password: string;
}
