import React from "react";
import { renderToString } from "react-dom/server";
import App, { buildStructuredData, pageMeta, staticRoutes } from "./App";

export { buildStructuredData, pageMeta, staticRoutes };

export function render(pageKey) {
  return renderToString(<App initialPage={pageKey} />);
}
