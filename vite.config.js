import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const devStaticRoutes = new Map([
  ["/reabilitacao-ortopedica/", "reabilitacao-ortopedica"],
  ["/artrodeses/", "artrodeses"],
  ["/infiltracoes/", "infiltracoes"],
  ["/cirurgias-minimamente-invasivas/", "cirurgias-minimamente-invasivas"],
]);

function toDevHtml(html) {
  return html
    .replace(/\s*<script\s+type="module"\s+crossorigin\s+src="\/assets\/[^"]+"><\/script>/i, "")
    .replace(/\s*<link\s+rel="stylesheet"\s+href="\/assets\/[^"]+">\s*/i, "\n")
    .replace(/\s*<style\s+id="montcare-inline-styles">[\s\S]*?<\/style>/i, "")
    .replace(/\s*<script\s+type="module"\s+src="\/src\/main\.jsx[^"]*"><\/script>/i, "")
    .replace("</body>", '    <script type="module" src="/src/main.jsx"></script>\n  </body>');
}

function seoStaticDevRoutes() {
  return {
    name: "seo-static-dev-routes",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (!request.url || !request.headers.accept?.includes("text/html")) {
          next();
          return;
        }

        const requestUrl = new URL(request.url, "http://localhost");
        const pathname = requestUrl.pathname.endsWith("/") ? requestUrl.pathname : `${requestUrl.pathname}/`;
        const routeDir = devStaticRoutes.get(pathname);

        if (!routeDir) {
          next();
          return;
        }

        const staticHtmlPath = join(process.cwd(), "dist", routeDir, "index.html");

        if (!existsSync(staticHtmlPath)) {
          next();
          return;
        }

        const html = await server.transformIndexHtml(request.url, toDevHtml(readFileSync(staticHtmlPath, "utf8")));

        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end(html);
      });
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [react(), seoStaticDevRoutes()],
  base: "/",
  build: {
    cssMinify: false,
    minify: false,
    reportCompressedSize: false,
  },
}));
