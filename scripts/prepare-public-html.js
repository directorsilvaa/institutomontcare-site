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
    staticContent: {
      eyebrow: "Instituto Montcare",
      heading: "Ortopedia resolutiva para mais mobilidade e qualidade de vida.",
      paragraphs: [
        "O Instituto Montcare oferece atendimento ortopédico resolutivo em São Paulo, com avaliação cuidadosa, indicação responsável e foco em recuperar movimento, autonomia e qualidade de vida.",
        "A clínica reúne ortopedia, cirurgia da coluna, reabilitação, infiltrações, cirurgias minimamente invasivas e especialidades integradas para cuidar do paciente em todas as etapas do tratamento.",
      ],
      sections: [
        {
          heading: "Quem somos",
          text: "Diretores com autoridade técnica em ortopedia e cirurgia da coluna conduzem o cuidado com diagnóstico preciso, clareza e continuidade terapêutica.",
        },
        {
          heading: "Soluções na saúde",
          text: "Atuação em saúde da coluna, reabilitação e performance, ortopedia de especialidade, metabolismo, nutrição, saúde da mulher e cuidado infectológico.",
        },
        {
          heading: "Onde atende",
          text: "O Instituto Montcare atende em São Paulo, na região de Moema e Indianópolis, com foco em pacientes que buscam cuidado ortopédico resolutivo.",
        },
        {
          heading: "Quando procurar atendimento ortopédico",
          text: "Procure avaliação ortopédica quando houver dor persistente na coluna, articulações, joelho, ombro, quadril, mão, pé ou tornozelo, perda de mobilidade ou limitação para atividades diárias.",
        },
        {
          heading: "Diferenciais da clínica",
          text: "A medicina resolutiva combina diagnóstico preciso, indicação terapêutica responsável, tratamentos conservadores, reabilitação funcional e procedimentos minimamente invasivos quando bem indicados.",
        },
      ],
    },
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
    staticContent: {
      eyebrow: "Reabilitação ortopédica",
      heading: "Reabilitação ortopédica com foco em recuperação de movimento e autonomia",
      paragraphs: [
        "A reabilitação ortopédica do Instituto Montcare é indicada para pacientes com dores persistentes, limitações funcionais, lesões ortopédicas ou recuperação pós-cirúrgica.",
        "O plano terapêutico é individualizado e acompanha metas funcionais claras, controle da dor, ganho de mobilidade, fortalecimento e retorno seguro às atividades.",
      ],
      sections: [
        {
          heading: "Como funciona",
          text: "O processo passa por agendamento, avaliação médica personalizada, elaboração do plano terapêutico e acompanhamento contínuo.",
        },
        {
          heading: "Benefícios esperados",
          text: "Recuperação da função articular e muscular, redução de dor e rigidez, melhora de equilíbrio e prevenção de recidivas.",
        },
      ],
    },
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
    staticContent: {
      eyebrow: "Artrodese da coluna",
      heading: "Artrodese da coluna com planejamento especializado e recuperação funcional",
      paragraphs: [
        "A artrodese da coluna é uma cirurgia indicada em casos selecionados de instabilidade, deformidade, degeneração avançada ou compressões que exigem estabilização estrutural.",
        "No Instituto Montcare, a indicação é feita com avaliação clínica cuidadosa, análise de exames e planejamento para reduzir dor, proteger estruturas nervosas e favorecer recuperação segura.",
      ],
      sections: [
        {
          heading: "Como funciona",
          text: "O cuidado inclui agendamento, avaliação personalizada, realização da artrodese quando indicada e acompanhamento pós-operatório.",
        },
        {
          heading: "Benefícios esperados",
          text: "Estabilização da coluna, melhora do alinhamento, redução de dor associada à instabilidade e retorno funcional progressivo.",
        },
      ],
    },
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
    staticContent: {
      eyebrow: "Infiltrações ortopédicas",
      heading: "Infiltrações ortopédicas para controle da dor com indicação individualizada",
      paragraphs: [
        "As infiltrações ortopédicas podem auxiliar no controle da dor e da inflamação em articulações, tendões ou coluna, sempre após avaliação médica.",
        "A decisão considera origem da dor, intensidade dos sintomas, região acometida e objetivos terapêuticos do paciente, com foco em funcionalidade e segurança.",
      ],
      sections: [
        {
          heading: "Como funciona",
          text: "O processo inclui avaliação especializada, definição diagnóstica, realização do procedimento quando indicado e acompanhamento da resposta clínica.",
        },
        {
          heading: "Benefícios esperados",
          text: "Redução local da dor e inflamação, melhora da mobilidade e orientação para retorno às atividades.",
        },
      ],
    },
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
    staticContent: {
      eyebrow: "Cirurgias minimamente invasivas",
      heading: "Cirurgias minimamente invasivas com foco em precisão e recuperação funcional",
      paragraphs: [
        "As cirurgias minimamente invasivas utilizam abordagens modernas para tratar quadros ortopédicos com menor agressão tecidual, pequenas incisões e planejamento técnico individualizado.",
        "No Instituto Montcare, cada procedimento é indicado conforme diagnóstico, biomecânica da lesão, limitações funcionais e expectativas do paciente.",
      ],
      sections: [
        {
          heading: "Como funciona",
          text: "O cuidado envolve avaliação médica, análise de exames, planejamento cirúrgico, procedimento e acompanhamento pós-operatório.",
        },
        {
          heading: "Benefícios esperados",
          text: "Menor trauma local em casos bem indicados, recuperação funcional orientada, precisão técnica e retorno progressivo à rotina.",
        },
      ],
    },
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
  const clinicId = `${configuredSiteUrl}/#clinic`;
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

function renderStaticContent(page) {
  const content = page.staticContent;

  if (!content) {
    return "";
  }

  const paragraphs = content.paragraphs
    .map((paragraph) => `        <p>${escapeHtml(paragraph)}</p>`)
    .join("\n");
  const sections = content.sections
    .map(
      (section) => `        <section>
          <h2>${escapeHtml(section.heading)}</h2>
          <p>${escapeHtml(section.text)}</p>
        </section>`,
    )
    .join("\n");
  const faq = page.faq?.length
    ? `        <section>
          <h2>Perguntas frequentes</h2>
          ${page.faq
            .map(
              (item) => `<article>
            <h3>${escapeHtml(item.question)}</h3>
            <p>${escapeHtml(item.answer)}</p>
          </article>`,
            )
            .join("\n          ")}
        </section>`
    : "";

  return `<main class="seo-static-content" data-static-seo-content>
        <p>${escapeHtml(content.eyebrow)}</p>
        <h1>${escapeHtml(content.heading)}</h1>
${paragraphs}
${sections}
${faq}
      </main>`;
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

  const structuredData = JSON.stringify(buildStructuredData(page)).replace(/</g, "\\u003c");
  const schemaTag = `<script id="structured-data" type="application/ld+json">${structuredData}</script>`;
  html = replaceOrInsert(
    html,
    /<script\s+id="structured-data"\s+type="application\/ld\+json">.*?<\/script>/is,
    schemaTag,
  );
  html = html.replace(/<div id="root">.*?<\/div>/is, `<div id="root">\n      ${renderStaticContent(page)}\n    </div>`);

  return html;
}

const baseHtml = readFileSync(indexPath, "utf8");

for (const page of Object.values(pages)) {
  const html = renderPage(baseHtml, page);
  const pageDir = join(distDir, page.outputPath);
  mkdirSync(pageDir, { recursive: true });
  writeFileSync(join(pageDir, "index.html"), html);

  if (page.outputPath) {
    writeFileSync(join(distDir, `${page.outputPath}.html`), html);
  }
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

const routes = Object.values(pages)
  .map((page) => page.path)
  .join(", ");

console.log(`Prepared public_html static routes with SEO metadata: ${routes}`);
