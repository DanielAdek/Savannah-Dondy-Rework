import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { KbEntity } from './kb.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AiService {
  /**
   * @constructor AiService
   * @param {object} Repository
   */
  constructor(
    @InjectRepository(KbEntity)
    private readonly kbRepository: Repository<KbEntity>
  ) {}

  public async addDocuments(content: string, vector: number[]): Promise<void> {
    
  }
}
