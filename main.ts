import { mkdirSync, writeFileSync } from "node:fs";

const STORY =
  "The baby monitor has been picking up a second voice in the nursery every night after midnight. Last night I finally understood the words, and the voice was teaching my daughter to say my name in a language I have never spoken.";

// Guard: exactly two sentences, 1-400 characters total, not only whitespace.
// Abbreviations with periods (a.m., p.m., Dr., etc.) must not count as
// sentence ends, so mask them before splitting on terminators.
if (!STORY.trim()) {
  throw new Error("story is empty or whitespace only");
}
const masked = STORY.replace(/\b(?:a\.m\.|p\.m\.|Dr\.|Mr\.|Mrs\.|Ms\.)/gi, (m) =>
  m.replace(/\./g, ""),
);
const sentences = masked
  .split(/[.!?]+/)
  .map((s) => s.trim())
  .filter(Boolean);
if (sentences.length !== 2) {
  throw new Error(`expected exactly 2 sentences, got ${sentences.length}`);
}
if (STORY.length < 1 || STORY.length > 400) {
  throw new Error(`expected 1-400 characters, got ${STORY.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", STORY, "utf8");
console.log(
  `wrote ${STORY.length} chars, ${sentences.length} sentences to /output/entry.txt`,
);
