import { connection } from "next/server";
import { links } from "@/data/profile";
import { getDb, isMongoConfigured } from "@/lib/mongodb";

type ClickDoc = { _id: string; count: number };

const validIds = new Set(links.map((link) => link.id));

// 링크별 클릭 수 조회: GET /api/clicks → { github: 3, blog: 1, ... }
export async function GET() {
  await connection(); // 항상 요청 시점에 실행 (빌드 시 미리 렌더링하지 않음)

  if (!isMongoConfigured()) {
    return Response.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  const db = await getDb();
  const docs = await db.collection<ClickDoc>("clicks").find().toArray();
  const counts = Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
  return Response.json(counts);
}

// 클릭 1회 기록: POST /api/clicks  body: { "id": "github" }
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const id = body?.id;

  if (typeof id !== "string" || !validIds.has(id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }
  if (!isMongoConfigured()) {
    return Response.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  const db = await getDb();
  await db
    .collection<ClickDoc>("clicks")
    .updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });

  return new Response(null, { status: 204 });
}
