import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const indexPath = join(distDir, "index.html");

const routes = [
  "reabilitacao-ortopedica",
  "artrodeses",
  "infiltracoes",
  "cirurgias-minimamente-invasivas",
];

if (!existsSync(indexPath)) {
  console.error("Missing dist/index.html. Run npm run build:vite first.");
  process.exit(1);
}

for (const route of routes) {
  const routeDir = join(distDir, route);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(indexPath, join(routeDir, "index.html"));
}

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

console.log(`Prepared public_html static routes: ${routes.join(", ")}`);
