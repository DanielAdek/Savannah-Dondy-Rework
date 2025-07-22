import { MigrationInterface, QueryRunner } from "typeorm";

export class Kbvector1753169577958 implements MigrationInterface {
	public readonly name?: string = "Kbvector1753169577958";

	public async up(queryRunner: QueryRunner): Promise<void> {
		// Install required extensions
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector`);

		// Create the knowledge_base table with proper vector column
		await queryRunner.query(`
			CREATE TABLE "knowledge_base" (
				"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
				"vector" vector(384) NOT NULL,
				"content" text NOT NULL,
				"metadata" jsonb,
				"created_at" TIMESTAMP NOT NULL DEFAULT now(),
				"updated_at" TIMESTAMP NOT NULL DEFAULT now(),
				CONSTRAINT "PK_knowledge_base" PRIMARY KEY ("id")
			)
		`);

		// Create vector similarity search index for better performance
		await queryRunner.query(`
			CREATE INDEX "IDX_knowledge_base_vector_cosine" ON "knowledge_base"
			USING ivfflat ("vector" vector_cosine_ops)
			WITH (lists = 100)
		`)

		// Optional: Create additional indexes for other query patterns
		await queryRunner.query(`
			CREATE INDEX "IDX_knowledge_base_content" ON "knowledge_base"
			USING gin(to_tsvector('english', "content"))
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// Drop indexes firstt
		await queryRunner.query(`DROP INDEX IF EXISTS "IDX_knowledge_base_content"`);
		await queryRunner.query(`DROP INDEX IF EXISTS "IDX_knowledge_base_vector_cosine"`);

		// Drop the tables
		await queryRunner.query(`DROP TABLE "knowledge_base"`);
	}

}


// CREATE TABLE "knowledge_base" (
// 	"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
// 	"vector" vector(384) NOT NULL,
// 	"content" text NOT NULL,
// 	"metadata" jsonb,
// 	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
// 	"updated_at" TIMESTAMP NOT NULL DEFAULT now(),
// 	CONSTRAINT "PK_knowledge_base" PRIMARY KEY ("id")
// )