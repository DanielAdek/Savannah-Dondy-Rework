import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EnvManager } from './env.config';

class TypeormConfigManager extends EnvManager {
  constructor() { super(process.env) }

  public getTypeOrmConfig(): Record<null, TypeOrmModuleOptions> {
    return new DataSource({
      type: 'postgres',
      host: this.getEnvValue('DATABASE_HOST'),
      port: parseInt(this.getEnvValue('DATABASE_PORT')),
      username: this.getEnvValue('DATABASE_USERNAME'),
      password: this.getEnvValue('DATABASE_PASSWORD'),
      database: this.getEnvValue('DATABASE_NAME'),
      synchronize: this.getEnvValue('TYPEORM_DATABASE_SYNC') === 'false',
      logging: false,
      entities: ['dist/**/*.entity.{ts,js}'],
      // autoLoadEntities: true,
      migrations: [
        'src/migrations/*.ts',
        'dist/migrations/*.js'
      ],
      migrationsTableName: 'typeorm_migrations',
      ssl: this.isProduction(),
    });
  }

}

export const typeormConfigManager = new TypeormConfigManager().getTypeOrmConfig();