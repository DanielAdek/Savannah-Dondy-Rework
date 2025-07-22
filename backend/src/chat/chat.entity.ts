import { Entity, Column } from 'typeorm';
import {BaseEntity} from "../shared/base.schema";

@Entity()
export class ChatEntity extends BaseEntity {
  @Column()
  session_id: string;

  @Column({ enum: ["user", "assistant"] })
  from: string;

  @Column()
  text: string;
}