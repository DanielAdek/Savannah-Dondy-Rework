import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { KbEntity } from './kb.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { databaseConfigManager } from 'src/config/db.config';

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

  public async addDocuments(content: string, vector: number[]): Promise<void> {}

  /**
   * @desc Similarity search using query
   * @param queryVector 
   * @param limit 
   * @returns Entity
   */
  public async findSimilarDocumentsQuery(queryVector: number[], limit: number = 10): Promise<KbEntity[]> {
    return await this.kbRepository.query(`
      SELECT *, (vector <=> $1::vector) as distance
      FROM kb_model
      ORDER BY vector <=> $1::vector
      LIMIT $2
    `, [`[${queryVector.join(',')}]`, limit]);
  }

  public async getSimilarDocuments(queryVector: string, limit: number = 10): Promise<any> {
    try {
      const vectorStore = await databaseConfigManager.getPgInitVector();
      const retriever = await vectorStore.asRetriever({ k: 1 });
      const resultAsRetriever = await retriever.invoke(queryVector);
      console.log(resultAsRetriever);
      return resultAsRetriever;
    } catch (error) {
      console.log(error)
    }
  }
}
