import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";

export function readingMinutes(source: string) {
  const text = source
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "");
  return Math.max(1, Math.ceil((text.match(/\S+/g)?.length ?? 0) / 200));
}

export const readingTime = cache(async (slug: string) => {
  const source = await readFile(join(process.cwd(), "src/content/blog", `${slug}.mdx`), "utf8");
  return `${readingMinutes(source)} min read`;
});
