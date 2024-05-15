import { Column, Entity } from "typeorm";
import { BaseColumnSchema } from "./base";
import { ProductType } from "../../config/constant";

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
  available: number;

  @Column()
  picture: string;

  @Column()
  avatars: string[];
}
