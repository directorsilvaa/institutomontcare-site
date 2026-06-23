export async function onRequest(context) {
  const response = await context.next();
  const url = new URL(context.request.url);
  const headers = new Headers(response.headers);

  if (url.pathname === "/robots.txt" || url.pathname === "/llms.txt") {
    headers.set("Content-Type", "text/plain; charset=utf-8");
    headers.set("Content-Disposition", "inline");
    headers.set("Cache-Control", "public, max-age=300");
  }

  if (url.pathname === "/sitemap.xml") {
    headers.set("Content-Type", "application/xml; charset=utf-8");
    headers.set("Content-Disposition", "inline");
    headers.set("Cache-Control", "public, max-age=300");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
