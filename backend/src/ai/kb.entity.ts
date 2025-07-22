import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../shared/base.schema';

@Entity("knowlege_base")
export class KbEntity extends BaseEntity {
  @Column({
    type: 'vector' as any,
    nullable: false,
    length: 384,
    transformer: {
      to: (value: number[]) => `[${value.join(',')}]`,
      from: (value: string) => {
        if (!value) return null;

        if (typeof value === "string") {
          return JSON.parse(value);
        }

        return value;
      }
    }
  })
  vector: number[];

  @Column()
  content: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;
}
