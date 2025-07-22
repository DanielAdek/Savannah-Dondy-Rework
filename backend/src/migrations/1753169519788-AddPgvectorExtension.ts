import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPgvectorExtension1753169519788 implements MigrationInterface {
	public readonly name?: string = 'AddPgvectorExtension1753169519788'

	public async up(queryRunner: QueryRunner): Promise<void> {
		// Install pgvector extension
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector`);

		// Install uuid extension if not already installed
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP EXTENSION IF EXISTS vector`);
		// Note: Don't drop uuid-ossp as other tables might use it
	}
}
