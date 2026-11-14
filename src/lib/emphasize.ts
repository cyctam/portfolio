export interface Piece {
  text: string;
  strong: boolean;
}

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function emphasize(text: string, terms: string[]): Piece[] {
  const variants = new Set<string>();
  for (const term of terms) {
    const clean = term.trim();
    if (!clean) continue;
    variants.add(clean);
    const short = clean.replace(/\s+cloud$/i, "").trim();
    if (short) variants.add(short);
  }
  if (!variants.size) return [{ text, strong: false }];

  const pattern = [...variants]
    .sort((a, b) => b.length - a.length)
    .map(escape)
    .join("|");
  const regex = new RegExp("(?<![\\w])(" + pattern + ")(?![\\w])", "gi");

  const pieces: Piece[] = [];
  let last = 0;
  for (const match of text.matchAll(regex)) {
    const start = match.index ?? 0;
    if (start > last) pieces.push({ text: text.slice(last, start), strong: false });
    pieces.push({ text: match[0], strong: true });
    last = start + match[0].length;
  }
  if (last < text.length) pieces.push({ text: text.slice(last), strong: false });
  return pieces;
}
