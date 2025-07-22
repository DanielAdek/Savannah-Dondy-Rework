import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PGVectorStore, PGVectorStoreArgs, DistanceStrategy } from "@langchain/community/vectorstores/pgvector";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";

import { typeormConfigManager } from "../config/db.config";
import { DataSource } from "typeorm";

const embeddings = new HuggingFaceTransformersEmbeddings({
  model: "Xenova/all-MiniLM-L6-v2"
});

async function seedVectorData() {
  try {
    // if (!(typeormConfigManager as DataSource).isInitialized) {
    //   await (typeormConfigManager as DataSource).initialize();
    // }

    const loader = new TextLoader("src/ai/kb.txt");
    const docs = await loader.load() as any;

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkOverlap: 20,
      chunkSize: 200,
      separators: ["\n\n", "\n", " ", ""],
      keepSeparator: false
    });

    const texts = docs.map(doc => (doc.pageContent));

    const documents = await textSplitter.createDocuments(texts);

    // const vector = await TypeORMVectorStore.fromDataSource(embeddings, {
    //   postgresConnectionOptions: (typeormConfigManager as DataSource).options,
    //   tableName: "knowledge_base",
    //   // distanceStrategy: "cosine"
    // });

    const config = {
      postgresConnectionOptions: typeormConfigManager.getSeedPoolConnection(),
      tableName: "knowledge_base",
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

    await vectorStore.addDocuments(documents);

    console.log("Done!!");
    process.exit(1);
  } catch (error) {
    console.error(`Vector Error: ${error.message}`);
    // if ((typeormConfigManager as DataSource).isInitialized) {
    //   await (typeormConfigManager as DataSource).destroy();
    // }
  }
}

export const vectorStore = seedVectorData();