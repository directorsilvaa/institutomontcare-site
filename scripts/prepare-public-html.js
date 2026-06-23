import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createServer } from "vite";

const distDir = "dist";
const indexPath = join(distDir, "index.html");
const siteUrl = (process.env.SITE_URL || "https://institutomontcare.com.br").replace(/\/+$/, "");
const shareImage = `${siteUrl}/logo-small.webp`;

if (!existsSync(indexPath)) {
  console.error("Missing dist/index.html. Run npm run build:vite first.");
  process.exit(1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function absoluteUrl(path) {
  return `${siteUrl}${path}`;
}

function replaceOrInsert(html, pattern, replacement) {
  return pattern.test(html)
    ? html.replace(pattern, () => replacement)
    : html.replace("</head>", () => `    ${replacement}\n  </head>`);
}

function replaceMeta(html, selector, value) {
  const escapedValue = escapeHtml(value);
  const pattern =
    selector.type === "property"
      ? new RegExp(`<meta\\s+[^>]*property="${selector.name}"[^>]*>`, "i")
      : new RegExp(`<meta\\s+[^>]*name="${selector.name}"[^>]*>`, "i");
  const replacement =
    selector.type === "property"
      ? `<meta property="${selector.name}" content="${escapedValue}" />`
      : `<meta name="${selector.name}" content="${escapedValue}" />`;

  return replaceOrInsert(html, pattern, replacement);
}

function removeMeta(html, selector) {
  const pattern =
    selector.type === "property"
      ? new RegExp(`\\s*<meta\\s+[^>]*property="${selector.name}"[^>]*>`, "i")
      : new RegExp(`\\s*<meta\\s+[^>]*name="${selector.name}"[^>]*>`, "i");

  return html.replace(pattern, "");
}

function replaceLink(html, rel, href) {
  const pattern = new RegExp(`<link\\s+[^>]*rel="${rel}"[^>]*>`, "i");
  return replaceOrInsert(html, pattern, `<link rel="${rel}" href="${escapeHtml(href)}" />`);
}

function renderHead(html, page, structuredData) {
  const pageUrl = absoluteUrl(page.path);
  let next = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);

  next = replaceMeta(next, { type: "name", name: "description" }, page.description);
  next = replaceMeta(next, { type: "name", name: "robots" }, "index, follow, max-image-preview:large");
  next = replaceMeta(next, { type: "name", name: "googlebot" }, "index, follow, max-image-preview:large");
  next = removeMeta(next, { type: "name", name: "keywords" });
  next = replaceMeta(next, { type: "name", name: "geo.region" }, "BR-SP");
  next = replaceMeta(next, { type: "name", name: "geo.placename" }, "São Paulo, SP");
  next = replaceMeta(next, { type: "name", name: "author" }, "Instituto Montcare");
  next = replaceMeta(next, { type: "name", name: "language" }, "pt-BR");
  next = replaceMeta(next, { type: "property", name: "og:type" }, "website");
  next = replaceMeta(next, { type: "property", name: "og:locale" }, "pt_BR");
  next = replaceMeta(next, { type: "property", name: "og:site_name" }, "Instituto Montcare");
  next = replaceMeta(next, { type: "property", name: "og:title" }, page.title);
  next = replaceMeta(next, { type: "property", name: "og:description" }, page.description);
  next = replaceMeta(next, { type: "property", name: "og:url" }, pageUrl);
  next = replaceMeta(next, { type: "property", name: "og:image" }, shareImage);
  next = replaceMeta(next, { type: "name", name: "twitter:card" }, "summary_large_image");
  next = replaceMeta(next, { type: "name", name: "twitter:title" }, page.title);
  next = replaceMeta(next, { type: "name", name: "twitter:description" }, page.description);
  next = replaceMeta(next, { type: "name", name: "twitter:image" }, shareImage);
  next = replaceLink(next, "canonical", pageUrl);

  const schemaTag = `<script id="structured-data" type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>`;
  return replaceOrInsert(
    next,
    /<script\s+id="structured-data"\s+type="application\/ld\+json">.*?<\/script>/is,
    schemaTag,
  );
}

function writePage(routePath, html) {
  const outputPath = routePath === "/" ? "" : routePath.replace(/^\/|\/$/g, "");
  const pageDir = join(distDir, outputPath);

  mkdirSync(pageDir, { recursive: true });
  writeFileSync(join(pageDir, "index.html"), html);

  if (outputPath) {
    writeFileSync(join(distDir, `${outputPath}.html`), html);
  }
}

function replaceRootHtml(html, bodyHtml) {
  return html.replace(/<div id="root"[^>]*>[\s\S]*<\/div>\s*(?=<\/body>)/i, `<div id="root">${bodyHtml}</div>\n  `);
}

const vite = await createServer({
  logLevel: "error",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const template = readFileSync(indexPath, "utf8");
  const { buildStructuredData, pageMeta, render, staticRoutes } = await vite.ssrLoadModule("/src/entry-server.jsx");

  for (const route of staticRoutes) {
    const page = pageMeta[route.key] || pageMeta.home;
    const bodyHtml = render(route.key);
    const structuredData = buildStructuredData(page, siteUrl);
    const html = renderHead(
      replaceRootHtml(template, bodyHtml),
      page,
      structuredData,
    );

    writePage(route.path, html);
  }

  const lastmod = new Date().toISOString().slice(0, 10);
  const sitemapUrls = staticRoutes
    .map((route) => {
      const page = pageMeta[route.key] || pageMeta.home;
      return `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.key === "home" ? "weekly" : "monthly"}</changefreq>
    <priority>${route.key === "home" ? "1.0" : "0.8"}</priority>
  </url>`;
    })
    .join("\n");

  writeFileSync(
    join(distDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`,
  );

  writeFileSync(
    join(distDir, "robots.txt"),
    `User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
`,
  );

  writeFileSync(
    join(distDir, "llms.txt"),
    `# Instituto Montcare

Site oficial: ${siteUrl}
Idioma principal: pt-BR
Tipo de negócio: clínica médica com foco em ortopedia resolutiva, cirurgia da coluna, reabilitação ortopédica, infiltrações ortopédicas, cirurgias minimamente invasivas, mastologia, reconstrução mamária, nutrição esportiva e cuidado infectológico.
Localização: Av Moaci, 395, 14 andar - Sala 145, São Paulo - SP, Brasil.
Telefone/WhatsApp: +55 11 3384-2525
E-mail: institutomontcare@gmail.com

## Páginas principais
${staticRoutes
  .map((route) => {
    const page = pageMeta[route.key] || pageMeta.home;
    return `- ${page.serviceName}: ${absoluteUrl(page.path)} - ${page.description}`;
  })
  .join("\n")}

## Respostas diretas
- O Instituto Montcare é uma clínica em São Paulo focada em atendimento ortopédico resolutivo e humanizado.
- A reabilitação ortopédica auxilia recuperação de movimento, autonomia, controle da dor e retorno seguro às atividades.
- A artrodese da coluna é uma cirurgia para estabilizar segmentos específicos da coluna em casos selecionados.
- A infiltração ortopédica pode ajudar no controle de dor e inflamação após avaliação médica.
- Cirurgias minimamente invasivas buscam tratar quadros ortopédicos com menor agressão tecidual quando bem indicadas.
`,
  );

  writeFileSync(join(distDir, "CNAME"), "institutomontcare.com.br\n");

  writeFileSync(
    join(distDir, ".htaccess"),
    `DirectoryIndex index.html
Options -MultiViews

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteCond %{THE_REQUEST} \\s/+(.+)\\.html[\\s?] [NC]
  RewriteRule ^ %1 [R=301,L]

  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.+?)/?$ $1.html [L]

  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  RewriteRule ^ index.html [L]
</IfModule>
`,
  );

  console.log(`Prepared full static HTML routes: ${staticRoutes.map((route) => route.path).join(", ")}`);
} finally {
  await vite.close();
}
