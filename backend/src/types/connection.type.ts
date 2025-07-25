export interface BaseConnectionType {
  type: string;
  host: string;
  port: number;
  password: string;
  database: string;
  ssl: boolean | { rejectUnauthorized: boolean }
}

export interface TypeOrmDbConnectType extends BaseConnectionType {
  username: string;
  autoLoadEntities: boolean;
  migrations: string[],
  entities: any[],
  migrationsTableName: string
}

export interface PGConnectionType extends BaseConnectionType {
  user: string
}