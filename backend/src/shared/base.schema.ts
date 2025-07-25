import {Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'datetime' })
  @UpdateDateColumn()
  updated_at: Date;
}