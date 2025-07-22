import { Entity, Column } from 'typeorm';
import {BaseEntity} from "../shared/base.schema";

@Entity()
export class ProductEntity extends BaseEntity {
  @Column({ length: 100 })
  product_name: string;

  @Column({ length: 100 })
  product_type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  product_price: number;

  @Column()
  product_tag: string;
}