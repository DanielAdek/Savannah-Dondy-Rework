import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChat1753169872819 implements MigrationInterface {
	public readonly name?: string = "CreateChat1753169872819";

	public async up(queryRunner: QueryRunner): Promise<void> {
		// Install required extensions
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

		// Create: chat_model table
		await queryRunner.query(`
			CREATE TABLE "chat_model" (
				"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
				"session_id" uuid NOT NULL,
				"from" VARCHAR(10) NOT NULL,
				"text" TEXT NOT NULL,
				"created_at" TIMESTAMP NOT NULL DEFAULT now(),
				"updated_at" TIMESTAMP NOT NULL DEFAULT now(),
				CONSTRAINT "PK_chat_model" PRIMARY KEY ("id")
			)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// DROP: The chat_model table
		await queryRunner.query(`DROP TABLE "chat_model"`);
	}

}
