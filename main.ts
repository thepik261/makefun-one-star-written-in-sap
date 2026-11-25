// One Star, Written in Sap — make.fun entry.
// Writes a single one-line 1-star review, in the voice of a houseplant
// reviewing its human owner, to /output/entry.txt.
// Pure Node stdlib, deterministic: the same line every run.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "One star. He repotted me mid-bloom into a mug that says WORLD'S BEST PLANT DAD, " +
  "forgot the drainage hole, and now blames my roots for the smell.";

// The gate requires 1 to 279 characters of non-whitespace UTF-8 text.
const chars = [...REVIEW].length;
if (chars < 1 || chars > 279 || REVIEW.trim().length === 0) {
  throw new Error(`Review is ${chars} characters; must be 1-279.`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, REVIEW + "\n", "utf8");
chmodSync(outFile, 0o644);

console.log(`Wrote ${REVIEW.length} characters to ${outFile}`);
