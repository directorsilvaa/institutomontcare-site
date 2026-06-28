import { readFileSync, writeFileSync } from "node:fs";

const devIndexPath = "index.html";

let html = readFileSync(devIndexPath, "utf8");

html = html
  .replace(/\s*<script\s+id="structured-data"\s+type="application\/ld\+json">[\s\S]*?<\/script>/i, "")
  .replace(/\s*<script\s+id="llms-txt"\s+type="text\/plain">[\s\S]*?<\/script>/i, "")
  .replace(
    /<div id="root"[^>]*>[\s\S]*<\/div>\s*(?=<script\s+type="module"\s+src="\/src\/main\.jsx"><\/script>\s*<\/body>)/i,
    '<div id="root"></div>\n    ',
  );

writeFileSync(devIndexPath, html);

console.log(`Prepared ${devIndexPath} as a clean Vite build template.`);
