export async function POST(request: Request) {
  const apiKey = process.env.REMOVEBG_API_KEY;
  if (!apiKey) {
    return new Response("Missing REMOVEBG_API_KEY", { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("image_file");

  if (!file || !(file instanceof Blob)) {
    return new Response("image_file is required", { status: 400 });
  }

  const upstream = new FormData();
  upstream.append("image_file", file);
  upstream.append("size", "auto");

  const res = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey
    },
    body: upstream
  });

  if (!res.ok) {
    const errText = await res.text();
    return new Response(errText || "remove.bg error", { status: res.status });
  }

  const arrayBuffer = await res.arrayBuffer();
  return new Response(arrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store"
    }
  });
}
