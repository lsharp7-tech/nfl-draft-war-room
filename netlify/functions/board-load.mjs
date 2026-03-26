import { getStore } from "@netlify/blobs";

export default async (req) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });

  try {
    const store = getStore("boards");
    const data = await store.get(id);
    if (!data) return new Response("Board not found", { status: 404 });
    return new Response(data, { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
};

export const config = { path: "/api/board-load" };
