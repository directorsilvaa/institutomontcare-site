import { readFileSync, writeFileSync } from "node:fs";

const distIndexPath = "dist/index.html";
const devIndexPath = "index.html";

let html = readFileSync(distIndexPath, "utf8");

html = html
  .replace(/\s*<script\s+type="module"\s+crossorigin\s+src="\/assets\/[^"]+"><\/script>/i, "")
  .replace(/\s*<link\s+rel="stylesheet"\s+href="\/assets\/[^"]+">\s*/i, "\n")
  .replace(/\s*<style\s+id="montcare-inline-styles">[\s\S]*?<\/style>/i, "")
  .replace(/\s*<script\s+type="module"\s+src="\/src\/main\.jsx[^"]*"><\/script>/i, "")
  .replace("</body>", '    <script type="module" src="/src/main.jsx"></script>\n  </body>');

writeFileSync(devIndexPath, html);

console.log(`Synced ${devIndexPath} from ${distIndexPath} for SEO source preview.`);
