import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PoolConfig } from 'pg';
import { EnvManager } from './env.config';
import { DataSource } from 'typeorm';
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { DistanceStrategy, PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { TypeORMVectorStore } from "@langchain/community/vectorstores/typeorm";
import { KbEntity } from '../ai/kb.entity';
import { ChatEntity } from '../chat/chat.entity';
import { BaseConnectionType } from '../types/connection.type';

const embeddings = new HuggingFaceTransformersEmbeddings({
  model: "Xenova/all-MiniLM-L6-v2"
});

/**
 * @class DatabbaseConfigManager
 */
class DatabaseConfigManager extends EnvManager {
  public readonly kbTableName: string = "knowledge_base";

  constructor() { super(process.env) }

  private getConnection(type: string): BaseConnectionType {
    return {
      type,
      host: this.getEnvValue('DATABASE_HOST'),
      port: parseInt(this.getEnvValue('DATABASE_PORT')),
      password: this.getEnvValue('DATABASE_PASSWORD'),
      database: this.getEnvValue('DATABASE_NAME'),
      ssl: this.isProduction(),
    }
  }

  public async getPgInitVector(): Promise<PGVectorStore> {
    const config = {
      postgresConnectionOptions: this.getSeedPoolConnection(),
      tableName: this.kbTableName,
      columns: {
        idColumnName: "id",
        vectorColumnName: "vector",
        contentColumnName: "content",
        metadataColumnName: "metadata",
      },
      // supported distance strategies: cosine (default), innerProduct, or euclidean
      distanceStrategy: "cosine" as DistanceStrategy,
    }

    const vectorStore = await PGVectorStore.initialize(embeddings, config);

    await vectorStore.ensureTableInDatabase();

    return vectorStore;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions | any {
    return {
      ...this.getConnection("postgres"),
      username: this.getEnvValue('DATABASE_USERNAME'),
      synchronize: this.getEnvValue('TYPEORM_DATABASE_SYNC') === 'false',
      logging: false,
      entities: ['dist/**/*.entity.{ts,js}'],
      autoLoadEntities: true,
      // migrations: ['src/migrations/*.ts', 'dist/migrations/*.js'],
      // migrationsTableName: 'typeorm_migrations'
    };
  }

  public getSeedPoolConnection(): PoolConfig {
    return {
      ...this.getConnection("postgres"),
      user: this.getEnvValue('DATABASE_USERNAME'),
    }
  }

  public async getAppDataSource(): Promise<DataSource> {
    const dataSource =  new DataSource({...this.getSeedPoolConnection() });
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    return dataSource;
  }

  public async getTypeormInitVector(): Promise<TypeORMVectorStore> {
    const vectorStore = await TypeORMVectorStore.fromDataSource(embeddings, {
      postgresConnectionOptions: await this.getAppDataSource() as any,
      tableName: this.kbTableName
    });
    return vectorStore;
  }
}

export const databaseConfigManager = new DatabaseConfigManager();