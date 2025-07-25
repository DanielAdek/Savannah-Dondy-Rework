import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { databaseConfigManager } from "../config/db.config";

async function seedVectorData() {
  try {
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

    const vectorStore = await databaseConfigManager.getPgInitVector();

    await vectorStore.addDocuments(documents);

    console.log("Done!!");
    process.exit(1);
  } catch (error) {
    console.error(`Vector Error: ${error.message}`);
    // if ((databaseConfigManager as DataSource).isInitialized) {
    //   await (databaseConfigManager as DataSource).destroy();
    // }
  }
}

export const vectorStore = seedVectorData();