// The Moon Finally Answers Back — v2 resubmit.
// Premise: the Moon is tired of being howled at as if it were in
// charge. It points out it is only the Sun's mirror pulling the
// night shift, while the Sun pockets all the glory. One dry,
// world-weary comeback, delivered in a single line.
// The program below assembles that line from its spoken clauses,
// checks it against the competition gate, then emits it to stdout
// and to $MAKEFUN_OUTPUT_DIR/entry.txt (no trailing newline).
// The file is written as raw UTF-8 bytes so the em dash survives
// exactly as written, with nothing appended after the final period.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const GATE_MIN = 1;
const GATE_MAX = 240;

function assembleLine(): string {
  const clauses = [
    "Stop howling like I run this place",
    "—",
    "I'm just the Sun's mirror on the night shift,",
    "and the Sun takes all the credit.",
  ];
  return clauses.join(" ");
}

function gateProblems(line: string): string[] {
  const problems: string[] = [];
  if (line.length < GATE_MIN || line.length > GATE_MAX) {
    problems.push(
      `length ${line.length} is outside ${GATE_MIN}-${GATE_MAX} characters`,
    );
  }
  if (line.trim().length === 0) {
    problems.push("line is only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    problems.push("line must not contain a line break");
  }
  if (line !== line.trim()) {
    problems.push("line must not start or end with whitespace");
  }
  return problems;
}

function main(): void {
  const line = assembleLine();
  const problems = gateProblems(line);
  if (problems.length > 0) {
    throw new Error(`entry fails the gate: ${problems.join("; ")}`);
  }
  const destination = resolve(
    process.env.MAKEFUN_OUTPUT_DIR ?? "/output",
    "entry.txt",
  );
  mkdirSync(resolve(destination, ".."), { recursive: true });
  writeFileSync(destination, Buffer.from(line, "utf8"));
  process.stdout.write(`${line}\n`);
}

main();
