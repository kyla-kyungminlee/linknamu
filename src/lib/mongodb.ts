import { MongoClient } from "mongodb";

const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 중 핫 리로드 때마다 연결이 새로 생기지 않도록 전역에 캐시합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다. (.env.local)");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  const client = await globalForMongo._mongoClientPromise;
  return client.db(dbName);
}
