import { Column, Entity, ManyToMany } from "typeorm";
import { BaseColumnSchema } from "./base";
import { ProductType } from "../../config/constant";
import { OrderEntity } from "./order";

@Entity({ name: "products" })
export class ProductEntity extends BaseColumnSchema {
  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: ProductType,
  })
  type: ProductType;

  @Column()
  price: number;

  @Column()
  available: number;

  @Column({ nullable: true })
  picture: string;

  @Column("text", {
    array: true,
    nullable: true,
  })
  avatars: string[];

  @ManyToMany(() => OrderEntity)
  orders: OrderEntity[];
}
