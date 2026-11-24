// Entry: "Weirdest Job Title: Blind Judge Showdown"
// Writes a single original job title to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node-only, CommonJS, zero dependencies, deterministic.
const fs = require("fs");
const path = require("path");

const TITLE = "Regional Manager of Lost Left Socks";

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });

  const chars = Array.from(TITLE);
  if (chars.length < 1 || chars.length > 60) {
    throw new Error("title must be 1-60 characters, got " + chars.length);
  }
  if (TITLE.trim().length === 0) {
    throw new Error("title must not be whitespace-only");
  }
  if (TITLE.includes("\n") || TITLE.includes("\r")) {
    throw new Error("title must not contain a newline");
  }

  const file = path.join(outDir, "entry.txt");
  fs.writeFileSync(file, TITLE, "utf8");

  // Round-trip guard: read back exactly what was written and re-validate.
  const back = fs.readFileSync(file, "utf8");
  if (back !== TITLE) {
    throw new Error("round-trip mismatch: file content differs from title");
  }
  if (back.endsWith("\n") || back.endsWith("\r")) {
    throw new Error("entry must not end with a newline");
  }
  if (Array.from(back).length > 60 || back.trim().length === 0) {
    throw new Error("round-trip validation failed");
  }
}

main();
