import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseColumnSchema } from "./base";
import { OrderEntity } from "./order";
import { ProductEntity } from "./product";

@Entity({ name: "order_product" })
export class OrderProductsEntity extends BaseColumnSchema {
  @ManyToOne(() => OrderEntity, { onDelete: "CASCADE" })
  @JoinColumn()
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, { onDelete: "CASCADE" })
  @JoinColumn()
  product: ProductEntity;

  @Column()
  quantity: number;

  @Column()
  amount: number;
}
