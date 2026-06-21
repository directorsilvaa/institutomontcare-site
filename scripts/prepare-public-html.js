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
  locality: "São Paulo",
  region: "SP",
  country: "BR",
  shareImage: "/logo-small.webp",
  priceRange: "$$",
  areaServed: ["São Paulo", "Moema", "Indianópolis", "Zona Sul de São Paulo"],
  knowsAbout: [
    "Ortopedia resolutiva",
    "Cirurgia da coluna",
    "Reabilitação ortopédica",
    "Artrodese da coluna",
    "Infiltrações ortopédicas",
    "Cirurgias minimamente invasivas",
  ],
};

const pages = {
  home: {
    outputPath: "",
    path: "/",
    title: "Instituto Montcare | Ortopedia Resolutiva em São Paulo",
    description:
      "Instituto Montcare oferece ortopedia resolutiva com atendimento humanizado, procedimentos especializados e foco em mobilidade, qualidade de vida e recuperação funcional.",
    keywords:
      "Instituto Montcare, ortopedia em São Paulo, clínica ortopédica em Moema, ortopedia resolutiva, cirurgia de coluna, reabilitação ortopédica",
    serviceName: "Ortopedia resolutiva em São Paulo",
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
    keywords:
      "reabilitação ortopédica em São Paulo, fisioterapia ortopédica, recuperação de movimento, clínica ortopédica em Moema",
    serviceName: "Reabilitação ortopédica",
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
    keywords:
      "artrodese da coluna em São Paulo, cirurgia de coluna, estabilidade da coluna, ortopedista de coluna em Moema",
    serviceName: "Artrodese da coluna",
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
    keywords:
      "infiltrações ortopédicas em São Paulo, infiltração na coluna, controle da dor ortopédica, ortopedia em Moema",
    serviceName: "Infiltrações ortopédicas",
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
    keywords:
      "cirurgias minimamente invasivas em São Paulo, cirurgia ortopédica, cirurgia de coluna minimamente invasiva, Instituto Montcare",
    serviceName: "Cirurgias minimamente invasivas",
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

function replaceLink(html, rel, href) {
  const pattern = new RegExp(`<link\\s+[^>]*rel="${rel}"[^>]*>`, "i");
  const replacement = `<link rel="${rel}" href="${escapeHtml(href)}" />`;

  return replaceOrInsert(html, pattern, replacement);
}

function buildStructuredData(page) {
  const url = absoluteUrl(page.path);
  const clinicId = `${configuredSiteUrl}/#medicalclinic`;
  const websiteId = `${configuredSiteUrl}/#website`;
  const webpageId = `${url}#webpage`;
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": clinicId,
    name: clinic.name,
    url: configuredSiteUrl,
    image: absoluteUrl(clinic.shareImage),
    logo: absoluteUrl(clinic.shareImage),
    telephone: clinic.phone,
    email: clinic.email,
    priceRange: clinic.priceRange,
    medicalSpecialty: ["Orthopedic", "Physiotherapy"],
    areaServed: clinic.areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    knowsAbout: clinic.knowsAbout,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address,
      addressLocality: clinic.locality,
      addressRegion: clinic.region,
      addressCountry: clinic.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: clinic.phone,
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
    availableService: Object.values(pages).map((item) => ({
      "@type": "MedicalProcedure",
      name: item.serviceName,
      url: absoluteUrl(item.path),
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: clinic.name,
    url: configuredSiteUrl,
    inLanguage: "pt-BR",
    publisher: {
      "@id": clinicId,
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId,
    name: page.title,
    description: page.description,
    url,
    inLanguage: "pt-BR",
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": clinicId,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(clinic.shareImage),
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".rehab-hero-content p", ".faq-item", ".rehab-faq-item"],
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": page.path === "/" ? "MedicalBusiness" : "MedicalProcedure",
    name: page.serviceName,
    description: page.description,
    url,
    provider: {
      "@id": clinicId,
    },
    areaServed: clinic.areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Instituto Montcare",
        item: absoluteUrl("/"),
      },
      ...(page.path === "/"
        ? []
        : [
            {
              "@type": "ListItem",
              position: 2,
              name: page.serviceName,
              item: url,
            },
          ]),
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${configuredSiteUrl}/#organization`,
    name: clinic.name,
    url: configuredSiteUrl,
    logo: absoluteUrl(clinic.shareImage),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: clinic.phone,
      contactType: "customer service",
      availableLanguage: "Portuguese",
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

  return [organizationSchema, clinicSchema, websiteSchema, webPageSchema, serviceSchema, breadcrumbSchema, faqSchema].filter(Boolean);
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
  html = replaceMeta(html, { type: "name", name: "keywords" }, page.keywords);
  html = replaceMeta(html, { type: "name", name: "geo.region" }, "BR-SP");
  html = replaceMeta(html, { type: "name", name: "geo.placename" }, `${clinic.locality}, ${clinic.region}`);
  html = replaceMeta(html, { type: "name", name: "author" }, clinic.name);
  html = replaceMeta(html, { type: "name", name: "language" }, "pt-BR");
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
  join(distDir, "llms.txt"),
  `# Instituto Montcare

Site oficial: ${configuredSiteUrl}
Idioma principal: pt-BR
Tipo de negócio: clínica médica com foco em ortopedia resolutiva, cirurgia da coluna, reabilitação ortopédica, infiltrações ortopédicas e cirurgias minimamente invasivas.
Localização: ${clinic.address}, ${clinic.locality} - ${clinic.region}, Brasil.
Telefone/WhatsApp: ${clinic.phone}
E-mail: ${clinic.email}

## Páginas principais
${Object.values(pages)
  .map((page) => `- ${page.serviceName}: ${absoluteUrl(page.path)} - ${page.description}`)
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
