import { existsSync } from "node:fs";

const requiredFiles = ["dist/index.html"];
const missingFiles = requiredFiles.filter((file) => !existsSync(file));

if (missingFiles.length > 0) {
  console.error(`Missing prebuilt files: ${missingFiles.join(", ")}`);
  console.error("Run npm run build:vite locally and commit the dist folder.");
  process.exit(1);
}

console.log("Using prebuilt dist folder.");
