import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const distDir = resolve(__dirname, "dist");
const port = Number(process.env.PORT || 3000);
const configuredSiteUrl = process.env.SITE_URL?.replace(/\/+$/, "");

const clinic = {
  name: "Instituto Montcare",
  phone: "+55 11 94593-0212",
  email: "institutomontcare@gmail.com",
  address: "Av Moaci, 395, 14 andar - Sala 146",
  city: "São Paulo",
  region: "SP",
  country: "BR",
  shareImage: "/logo-small.webp",
};

const pages = {
  "/": {
    title: "Instituto Montcare | Ortopedia Resolutiva em São Paulo",
    description:
      "Instituto Montcare oferece ortopedia resolutiva com atendimento humanizado, procedimentos especializados e foco em mobilidade, qualidade de vida e recuperação funcional.",
    faq: [
      {
        question: "O que é a medicina resolutiva oferecida pela Montcare?",
        answer:
          "É um atendimento focado na resolução dos problemas ortopédicos, com ênfase em tratamentos conservadores e cirúrgicos minimamente invasivos.",
      },
      {
        question: "Como agendar minha consulta?",
        answer:
          "O agendamento pode ser iniciado pelos botões da página para falar com a equipe e escolher o melhor horário disponível.",
      },
    ],
  },
  "/reabilitacao-ortopedica": {
    title: "Reabilitação Ortopédica | Instituto Montcare",
    description:
      "Avaliação e reabilitação ortopédica com foco em recuperação de movimento, autonomia, controle da dor e retorno seguro às atividades.",
  },
  "/artrodeses": {
    title: "Artrodese da Coluna | Instituto Montcare",
    description:
      "Artrodese da coluna com avaliação especializada, planejamento cirúrgico preciso e foco em estabilidade, alinhamento e recuperação funcional.",
  },
  "/infiltracoes": {
    title: "Infiltrações Ortopédicas | Instituto Montcare",
    description:
      "Infiltrações ortopédicas para controle da dor e da inflamação, com indicação individualizada e acompanhamento especializado.",
  },
  "/cirurgias-minimamente-invasivas": {
    title: "Cirurgias Minimamente Invasivas | Instituto Montcare",
    description:
      "Cirurgias minimamente invasivas com foco em precisão, menor agressão tecidual e recuperação funcional orientada por avaliação especializada.",
  },
};

const legacyQueryPages = {
  "reabilitacao-ortopedica": "/reabilitacao-ortopedica",
  artrodeses: "/artrodeses",
  infiltracoes: "/infiltracoes",
  "cirurgias-minimamente-invasivas": "/cirurgias-minimamente-invasivas",
};

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function getStaticPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0]);
  const cleanPath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const candidatePath = resolve(join(distDir, cleanPath));

  if (!candidatePath.startsWith(distDir)) {
    return null;
  }

  if (existsSync(candidatePath) && statSync(candidatePath).isFile()) {
    return candidatePath;
  }

  return join(distDir, "index.html");
}

function getOrigin(request) {
  if (configuredSiteUrl) {
    return configuredSiteUrl;
  }

  const host = request.headers["x-forwarded-host"] || request.headers.host || `localhost:${port}`;
  const isLocalHost = /^localhost(?::\d+)?$|^127\.0\.0\.1(?::\d+)?$/i.test(String(host));
  const protocol = request.headers["x-forwarded-proto"] || (isLocalHost ? "http" : "https");

  return `${protocol}://${host}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getPage(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  return pages[normalizedPath] ? { path: normalizedPath, ...pages[normalizedPath] } : { path: "/", ...pages["/"] };
}

function buildStructuredData(page, origin) {
  const pageUrl = `${origin}${page.path}`;
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: clinic.name,
    url: pageUrl,
    image: `${origin}${clinic.shareImage}`,
    telephone: clinic.phone,
    email: clinic.email,
    medicalSpecialty: "Orthopedic",
    areaServed: clinic.city,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address,
      addressLocality: clinic.city,
      addressRegion: clinic.region,
      addressCountry: clinic.country,
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: pageUrl,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: clinic.name,
      url: origin,
    },
  };

  const faqSchema = page.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return [clinicSchema, webPageSchema, faqSchema].filter(Boolean);
}

function replaceMeta(html, selector, value) {
  const escapedValue = escapeHtml(value);
  const pattern =
    selector.type === "property"
      ? new RegExp(`<meta\\s+property="${selector.name}"\\s+content="[^"]*"\\s*/?>`, "i")
      : new RegExp(`<meta\\s+name="${selector.name}"\\s+content="[^"]*"\\s*/?>`, "i");
  const replacement =
    selector.type === "property"
      ? `<meta property="${selector.name}" content="${escapedValue}" />`
      : `<meta name="${selector.name}" content="${escapedValue}" />`;

  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace("</head>", `    ${replacement}\n  </head>`);
}

function renderIndexHtml(request, pathname) {
  const origin = getOrigin(request);
  const page = getPage(pathname);
  const canonicalUrl = `${origin}${page.path}`;
  const shareImageUrl = `${origin}${clinic.shareImage}`;
  const structuredData = JSON.stringify(buildStructuredData(page, origin));
  let html = readFileSync(join(distDir, "index.html"), "utf8");

  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  html = replaceMeta(html, { type: "name", name: "description" }, page.description);
  html = replaceMeta(html, { type: "property", name: "og:title" }, page.title);
  html = replaceMeta(html, { type: "property", name: "og:description" }, page.description);
  html = replaceMeta(html, { type: "property", name: "og:image" }, shareImageUrl);
  html = replaceMeta(html, { type: "name", name: "twitter:title" }, page.title);
  html = replaceMeta(html, { type: "name", name: "twitter:description" }, page.description);
  html = replaceMeta(html, { type: "name", name: "twitter:image" }, shareImageUrl);

  html = html.replace(
    "</head>",
    `    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />\n` +
      `    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />\n` +
      `    <script id="structured-data" type="application/ld+json">${structuredData}</script>\n` +
      "  </head>",
  );

  return html;
}

function renderSitemap(origin) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = Object.keys(pages)
    .map(
      (path) => `  <url>
    <loc>${origin}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function renderRobots(origin) {
  return `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
}

createServer((request, response) => {
  const requestUrl = new URL(request.url || "/", getOrigin(request));
  const legacyPath = legacyQueryPages[requestUrl.searchParams.get("page")];

  if (legacyPath) {
    response.writeHead(301, { Location: legacyPath });
    response.end();
    return;
  }

  if (requestUrl.pathname === "/robots.txt") {
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(renderRobots(getOrigin(request)));
    return;
  }

  if (requestUrl.pathname === "/sitemap.xml") {
    response.writeHead(200, { "Content-Type": "application/xml; charset=utf-8" });
    response.end(renderSitemap(getOrigin(request)));
    return;
  }

  const filePath = getStaticPath(requestUrl.pathname);

  if (!filePath || !existsSync(filePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const isHtml = extname(filePath) === ".html";

  response.writeHead(200, {
    "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
  });

  if (isHtml) {
    response.end(renderIndexHtml(request, requestUrl.pathname));
    return;
  }

  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`Instituto Montcare running on port ${port}`);
});
