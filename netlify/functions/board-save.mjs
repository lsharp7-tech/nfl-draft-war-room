import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  try {
    const body = await req.text();
    const store = getStore("boards");
    const id = Math.random().toString(36).slice(2, 10);
    await store.set(id, body);
    return Response.json({ id });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
};

export const config = { path: "/api/board-save" };
