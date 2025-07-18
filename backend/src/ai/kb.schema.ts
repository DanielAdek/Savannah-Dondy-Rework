import { Entity, Column } from 'typeorm';
import {BaseModel} from "../shared/base.schema";

@Entity()
export class ChatModel extends BaseModel {
  @Column()
  vector: number[];

  @Column()
  text: string;
}