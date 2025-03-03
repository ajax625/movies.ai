import OpenAI from "openai";
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' });
//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
const openai = new OpenAI(
  {
    apiKey: process.env.OPENAI_API_KEY
  }
);

export default async function getEmbeddings(searchQuery) {
  const result = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: searchQuery,
    encoding_format: "float",
  });

  console.log(result.data[0].embedding);

    return result.data[0].embedding;
}