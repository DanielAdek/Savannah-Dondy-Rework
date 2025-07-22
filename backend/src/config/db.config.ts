import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PoolConfig } from 'pg';
import { EnvManager } from './env.config';
import { KbEntity } from '../ai/kb.entity';
import { ChatEntity } from '../chat/chat.entity';

class TypeormConfigManager extends EnvManager {
  constructor() { super(process.env) }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getEnvValue('DATABASE_HOST'),
      port: parseInt(this.getEnvValue('DATABASE_PORT')),
      username: this.getEnvValue('DATABASE_USERNAME'),
      password: this.getEnvValue('DATABASE_PASSWORD'),
      database: this.getEnvValue('DATABASE_NAME'),
      synchronize: this.getEnvValue('TYPEORM_DATABASE_SYNC') === 'false',
      logging: false,
      entities: [
        // 'dist/**/*.entity.{ts,js}'
        KbEntity,
        ChatEntity
      ],
      autoLoadEntities: true,
      migrations: [
        'src/migrations/*.ts',
        'dist/migrations/*.js'
      ],
      migrationsTableName: 'typeorm_migrations',
      ssl: this.isProduction(),
    };
  }

  // public getAppDataSource(): DataSource {
  //   return new DataSource({})
  // }

  public getSeedPoolConnection(): PoolConfig {
    return {
      type: 'postgres',
      host: this.getEnvValue('DATABASE_HOST'),
      port: parseInt(this.getEnvValue('DATABASE_PORT')),
      user: this.getEnvValue('DATABASE_USERNAME'),
      password: this.getEnvValue('DATABASE_PASSWORD'),
      database: this.getEnvValue('DATABASE_NAME'),
    }
  }
}

export const typeormConfigManager = new TypeormConfigManager();