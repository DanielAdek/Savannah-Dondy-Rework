import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { TypeORMVectorStore } from "@langchain/community/vectorstores/typeorm";
import { PoolConfig } from "pg";
import { typeormConfigManager } from "src/config/db.config";

const embeddings = new HuggingFaceTransformersEmbeddings({
  model: "Xenova/all-MiniLM-L6-v2"
});

async function initVectorConnection() {
  try {
    return await TypeORMVectorStore.fromDataSource(embeddings, {
      postgresConnectionOptions: typeormConfigManager as PoolConfig,
      tableName: "kb_model",
    });
  } catch (error) {
    console.error(`Vector Error: ${error.message}`);
  }
}

export const vectorStore = initVectorConnection();