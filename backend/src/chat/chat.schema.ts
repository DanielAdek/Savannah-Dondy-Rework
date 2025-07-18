import { Entity, Column } from 'typeorm';
import {BaseModel} from "../shared/base.schema";

@Entity()
export class ChatModel extends BaseModel {
  @Column()
  session_id: string;

  @Column({ enum: ["user", "assistant"] })
  from: string;

  @Column()
  text: string;
}