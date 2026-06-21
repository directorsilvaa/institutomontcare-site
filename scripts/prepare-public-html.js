import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const indexPath = join(distDir, "index.html");
const configuredSiteUrl = (process.env.SITE_URL || "https://institutomontcare.com.br").replace(/\/+$/, "");

const clinic = {
  name: "Instituto Montcare",
  phone: "+55 11 94593-0212",
  email: "institutomontcare@gmail.com",
  address: "Av Moaci, 395, 14 andar - Sala 146",
  region: "SP",
  country: "BR",
  shareImage: "/logo-small.webp",
};

const pages = {
  home: {
    outputPath: "",
    path: "/",
    title: "Instituto Montcare | Ortopedia Resolutiva em São Paulo",
    description:
      "Instituto Montcare oferece ortopedia resolutiva com atendimento humanizado, procedimentos especializados e foco em mobilidade, qualidade de vida e recuperação funcional.",
    faq: [
      {
        question: "O que é a medicina resolutiva oferecida pela Montcare?",
        answer:
          "É um atendimento focado na rápida resolução dos problemas ortopédicos, com ênfase em tratamentos conservadores e cirúrgicos minimamente invasivos.",
      },
      {
        question: "Preciso de plano de saúde para ser atendido?",
        answer:
          "Não necessariamente. A equipe orienta cada caso individualmente e informa as possibilidades de atendimento disponíveis para a consulta.",
      },
      {
        question: "Como agendar minha consulta?",
        answer:
          "Você pode iniciar seu agendamento diretamente pelos botões da página e falar com a equipe para escolher o melhor horário disponível.",
      },
    ],
  },
  "reabilitacao-ortopedica": {
    outputPath: "reabilitacao-ortopedica",
    path: "/reabilitacao-ortopedica",
    title: "Reabilitação Ortopédica | Instituto Montcare",
    description:
      "Avaliação e reabilitação ortopédica com foco em recuperação de movimento, autonomia, controle da dor e retorno seguro às atividades.",
    faq: [
      {
        question: "A reabilitação funciona para mim?",
        answer:
          "O programa pode ser indicado para quadros pós-cirúrgicos, lesões ortopédicas, dores persistentes, perda de mobilidade e limitações funcionais.",
      },
      {
        question: "Quanto tempo dura o processo de reabilitação?",
        answer:
          "O tempo varia conforme o diagnóstico, a gravidade do quadro e a resposta clínica de cada paciente.",
      },
    ],
  },
  artrodeses: {
    outputPath: "artrodeses",
    path: "/artrodeses",
    title: "Artrodese da Coluna | Instituto Montcare",
    description:
      "Artrodese da coluna com avaliação especializada, planejamento cirúrgico preciso e foco em estabilidade, alinhamento e recuperação funcional.",
    faq: [
      {
        question: "O que é artrodese da coluna?",
        answer:
          "A artrodese é uma cirurgia indicada para estabilizar segmentos específicos da coluna em casos selecionados de instabilidade, deformidade ou degeneração avançada.",
      },
      {
        question: "A artrodese limita os movimentos?",
        answer:
          "A cirurgia estabiliza segmentos específicos da coluna. O objetivo é reduzir dor e instabilidade preservando ao máximo a funcionalidade global.",
      },
    ],
  },
  infiltracoes: {
    outputPath: "infiltracoes",
    path: "/infiltracoes",
    title: "Infiltrações Ortopédicas | Instituto Montcare",
    description:
      "Infiltrações ortopédicas para controle da dor e da inflamação, com indicação individualizada e acompanhamento especializado.",
    faq: [
      {
        question: "O que é infiltração ortopédica?",
        answer:
          "A infiltração ortopédica é um procedimento usado para reduzir dor e inflamação em articulações, tendões ou coluna, após avaliação médica.",
      },
      {
        question: "Quando a infiltração é indicada?",
        answer:
          "A indicação depende da avaliação clínica, origem da dor, intensidade dos sintomas e objetivos terapêuticos do paciente.",
      },
    ],
  },
  "cirurgias-minimamente-invasivas": {
    outputPath: "cirurgias-minimamente-invasivas",
    path: "/cirurgias-minimamente-invasivas",
    title: "Cirurgias Minimamente Invasivas | Instituto Montcare",
    description:
      "Cirurgias minimamente invasivas com foco em precisão, menor agressão tecidual e recuperação funcional orientada por avaliação especializada.",
    faq: [
      {
        question: "O que são cirurgias minimamente invasivas?",
        answer:
          "São procedimentos realizados com menor agressão tecidual, pequenas incisões e planejamento técnico para favorecer recuperação funcional em casos bem indicados.",
      },
      {
        question: "Todo caso pode ser tratado com técnica minimamente invasiva?",
        answer:
          "Não. A indicação depende do diagnóstico, exames, limitações funcionais e avaliação médica individualizada.",
      },
    ],
  },
};

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
  return configuredSiteUrl ? `${configuredSiteUrl}${path}` : path;
}

function replaceOrInsert(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace("</head>", `    ${replacement}\n  </head>`);
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

function replaceLink(html, rel, href) {
  const pattern = new RegExp(`<link\\s+[^>]*rel="${rel}"[^>]*>`, "i");
  const replacement = `<link rel="${rel}" href="${escapeHtml(href)}" />`;

  return replaceOrInsert(html, pattern, replacement);
}

function buildStructuredData(page) {
  const url = absoluteUrl(page.path);
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: clinic.name,
    url,
    image: absoluteUrl(clinic.shareImage),
    telephone: clinic.phone,
    email: clinic.email,
    medicalSpecialty: "Orthopedic",
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address,
      addressRegion: clinic.region,
      addressCountry: clinic.country,
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: clinic.name,
      url: configuredSiteUrl || "/",
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

function renderPage(baseHtml, page) {
  const pageUrl = absoluteUrl(page.path);
  const shareImageUrl = absoluteUrl(clinic.shareImage);
  let html = baseHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);

  html = replaceMeta(html, { type: "name", name: "description" }, page.description);
  html = replaceMeta(html, { type: "property", name: "og:title" }, page.title);
  html = replaceMeta(html, { type: "property", name: "og:description" }, page.description);
  html = replaceMeta(html, { type: "property", name: "og:url" }, pageUrl);
  html = replaceMeta(html, { type: "property", name: "og:image" }, shareImageUrl);
  html = replaceMeta(html, { type: "name", name: "twitter:title" }, page.title);
  html = replaceMeta(html, { type: "name", name: "twitter:description" }, page.description);
  html = replaceMeta(html, { type: "name", name: "twitter:image" }, shareImageUrl);
  html = replaceLink(html, "canonical", pageUrl);

  const structuredData = JSON.stringify(buildStructuredData(page));
  const schemaTag = `<script id="structured-data" type="application/ld+json">${structuredData}</script>`;
  html = replaceOrInsert(
    html,
    /<script\s+id="structured-data"\s+type="application\/ld\+json">.*?<\/script>/is,
    schemaTag,
  );

  return html;
}

const baseHtml = readFileSync(indexPath, "utf8");

for (const page of Object.values(pages)) {
  const pageDir = join(distDir, page.outputPath);
  mkdirSync(pageDir, { recursive: true });
  writeFileSync(join(pageDir, "index.html"), renderPage(baseHtml, page));
}

const lastmod = new Date().toISOString().slice(0, 10);
const sitemapUrls = Object.values(pages)
  .map(
    (page) => `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${page.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
  )
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
  join(distDir, ".htaccess"),
  `DirectoryIndex index.html
Options -MultiViews

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  RewriteRule ^ index.html [L]
</IfModule>
`,
);

const routes = Object.values(pages)
  .map((page) => page.path)
  .join(", ");

console.log(`Prepared public_html static routes with SEO metadata: ${routes}`);
