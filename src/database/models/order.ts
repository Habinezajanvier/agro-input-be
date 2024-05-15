import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseColumnSchema } from "./base";
import { UserEntity } from "./user";
import { OrderStatus } from "../../config/constant";
import { OrderProductsEntity } from "./orderProduct";

export interface LandLocation {
  district: string;
  sector: string;
  village: string;
}

@Entity({ name: "orders" })
export class OrderEntity extends BaseColumnSchema {
  @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "createdBy" })
  user: UserEntity;

  @OneToMany(() => OrderProductsEntity, (rel) => rel.order)
  productOder: OrderProductsEntity;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ type: "json" })
  location: LandLocation;

  @Column()
  landSize: number;
}
