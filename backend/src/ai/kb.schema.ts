import { Entity, Column } from 'typeorm';
import { BaseModel } from '../shared/base.schema';

@Entity()
export class KbModel extends BaseModel {
  @Column({
    type: 'vector' as any,
    nullable: false,
    length: 384,
    // transformer: {
    //   to: (value: number[]) => value.join(','),
    //   from: (value: string) => value.split(',').map(Number),
    // },
  })
  // @Column("float", { array: true })
  vector: number[];

  @Column()
  content: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;
}
