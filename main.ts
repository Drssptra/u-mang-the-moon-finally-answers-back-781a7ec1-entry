// The Moon Finally Answers Back — make.fun bounty entry.
// One line in the Moon's own voice: wry, old, and a little tired of
// being wished upon. It answers the wishes, the howls and the
// late-night promises all at once — with a comeback, not a lecture.
// Writes the entry to $MAKEFUN_OUTPUT_DIR/entry.txt with no trailing
// newline, and prints it to stdout.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Four billion years of wishes, howls, and 3 a.m. promises — and not one of you has ever once wished me good night.";

// Gate: 1-240 characters, a single line, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 240) {
  throw new Error(
    `entry must be 1-240 characters (gate), got ${ENTRY.length}`,
  );
}
if (!ENTRY.trim()) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
