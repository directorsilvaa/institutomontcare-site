import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const distDir = resolve(__dirname, "dist");
const port = Number(process.env.PORT || 3000);

const publicRoutes = new Set([
  "/",
  "/reabilitacao-ortopedica/",
  "/artrodeses/",
  "/infiltracoes/",
  "/cirurgias-minimamente-invasivas/",
]);

const legacyQueryPages = {
  "reabilitacao-ortopedica": "/reabilitacao-ortopedica/",
  artrodeses: "/artrodeses/",
  infiltracoes: "/infiltracoes/",
  "cirurgias-minimamente-invasivas": "/cirurgias-minimamente-invasivas/",
};

const crawlerResponses = {
  "/robots.txt": {
    contentType: "text/plain; charset=utf-8",
    body: `User-agent: *
Allow: /

Sitemap: https://institutomontcare.com.br/sitemap.xml
`,
  },
  "/sitemap.xml": {
    contentType: "application/xml; charset=utf-8",
    body: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://institutomontcare.com.br/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://institutomontcare.com.br/reabilitacao-ortopedica/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://institutomontcare.com.br/artrodeses/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://institutomontcare.com.br/infiltracoes/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://institutomontcare.com.br/cirurgias-minimamente-invasivas/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`,
  },
  "/llms.txt": {
    contentType: "text/plain; charset=utf-8",
    body: `# Instituto Montcare

Site oficial: https://institutomontcare.com.br
Idioma principal: pt-BR
Tipo de negócio: clínica médica com foco em ortopedia resolutiva, cirurgia da coluna, reabilitação ortopédica, infiltrações ortopédicas e cirurgias minimamente invasivas.
`,
  },
};

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function getOrigin(request) {
  const host = request.headers["x-forwarded-host"] || request.headers.host || `localhost:${port}`;
  const isLocalHost = /^localhost(?::\d+)?$|^127\.0\.0\.1(?::\d+)?$/i.test(String(host));
  const protocol = request.headers["x-forwarded-proto"] || (isLocalHost ? "http" : "https");

  return `${protocol}://${host}`;
}

function normalizeRoute(pathname) {
  if (pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function resolveStaticPath(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const cleanPath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const candidatePath = resolve(join(distDir, cleanPath));

  if (!candidatePath.startsWith(distDir)) {
    return null;
  }

  if (existsSync(candidatePath)) {
    const stats = statSync(candidatePath);

    if (stats.isFile()) {
      return candidatePath;
    }

    if (stats.isDirectory()) {
      const indexPath = join(candidatePath, "index.html");
      return existsSync(indexPath) ? indexPath : null;
    }
  }

  const route = normalizeRoute(pathname);

  if (publicRoutes.has(route)) {
    return join(distDir, route, "index.html");
  }

  return join(distDir, "index.html");
}

createServer((request, response) => {
  const requestUrl = new URL(request.url || "/", getOrigin(request));
  const crawlerResponse = crawlerResponses[requestUrl.pathname];

  if (crawlerResponse) {
    response.writeHead(200, {
      "Content-Type": crawlerResponse.contentType,
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(crawlerResponse.body);
    return;
  }

  const legacyPath = legacyQueryPages[requestUrl.searchParams.get("page")];

  if (legacyPath) {
    response.writeHead(301, { Location: legacyPath });
    response.end();
    return;
  }

  const route = normalizeRoute(requestUrl.pathname);
  const hasExtension = extname(requestUrl.pathname) !== "";

  if (!hasExtension && publicRoutes.has(route) && requestUrl.pathname !== route) {
    response.writeHead(301, { Location: route });
    response.end();
    return;
  }

  const filePath = resolveStaticPath(requestUrl.pathname);

  if (!filePath || !existsSync(filePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
    ...(filePath.endsWith("robots.txt") || filePath.endsWith("llms.txt") || filePath.endsWith("sitemap.xml")
      ? { "Content-Disposition": "inline" }
      : {}),
  });
  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`Instituto Montcare running on port ${port}`);
});
