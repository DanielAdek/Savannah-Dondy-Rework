import { Entity, Column } from 'typeorm';
import {BaseModel} from "../shared/base.schema";

@Entity()
export class ProductModel extends BaseModel {
  @Column({ length: 100 })
  product_name: string;

  @Column({ length: 100 })
  product_type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  product_price: number;

  @Column()
  product_tag: string;
}