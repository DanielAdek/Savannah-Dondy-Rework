import { PoolConfig } from "pg";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { TypeORMVectorStore } from "@langchain/community/vectorstores/typeorm";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";

import { typeormConfigManager } from "src/config/db.config";

const embeddings = new HuggingFaceTransformersEmbeddings({
  model: "Xenova/all-MiniLM-L6-v2"
});

async function seedVectorData() {
  try {
    const loader = new TextLoader("src/ai/kb.txt");
    const text = await loader.load() as any;

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkOverlap: 20,
      chunkSize: 200,
      separators: ["\n\n", "\n", " ", ""],
      keepSeparator: false
    });

    const document = await textSplitter.createDocuments(text)

    // return await TypeORMVectorStore.fromDataSource(embeddings, {
    //   postgresConnectionOptions: typeormConfigManager as PoolConfig,
    //   tableName: "knowledge_base",
    // });

    console.log(document);
  } catch (error) {
    console.error(`Vector Error: ${error.message}`);
  }
}

export const vectorStore = seedVectorData();