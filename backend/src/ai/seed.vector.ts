import { PoolConfig } from "pg";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TypeORMVectorStore } from "@langchain/community/vectorstores/typeorm";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";

import { typeormConfigManager } from "src/config/db.config";

const embeddings = new HuggingFaceTransformersEmbeddings({
  model: "Xenova/all-MiniLM-L6-v2"
});

const text = fetch("./kb.txt");

async function initVectorConnection() {
  try {
    return await TypeORMVectorStore.fromDataSource(embeddings, {
      postgresConnectionOptions: typeormConfigManager as PoolConfig,
      tableName: "knowledge_base",
    });
  } catch (error) {
    console.error(`Vector Error: ${error.message}`);
  }
}

export const vectorStore = initVectorConnection();