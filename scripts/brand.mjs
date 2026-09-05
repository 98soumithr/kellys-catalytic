/**
 * Brand substitution applied during content generation.
 *
 * The content modules under src/content are generated from the reference site,
 * which is branded "Catalit". This project ships under a different brand, so the
 * rename has to live in the PIPELINE — a one-off find-and-replace in the generated
 * files would be silently undone the next time anyone re-runs the extractors.
 *
 * Order matters: longer/possessive forms are replaced before the bare name.
 */
export const BRAND = {
  name: "Kelly's Catalytic",
  short: "Kelly's Catalytic",
  legacy: 'Catalit',
};

const RULES = [
  // Possessive reads badly if handled by the generic rule ("Kelly's Catalytic's").
  [/Catalit's\b/g, `${BRAND.name}`],
  [/\bCatalit\b/g, BRAND.name],
];

/** Applies the brand rename to any string. Non-strings pass through untouched. */
export function rebrand(value) {
  if (typeof value !== 'string') return value;
  return RULES.reduce((out, [pattern, replacement]) => out.replace(pattern, replacement), value);
}

/** Deep-applies `rebrand` across strings in an object/array tree. */
export function rebrandDeep(node) {
  if (typeof node === 'string') return rebrand(node);
  if (Array.isArray(node)) return node.map(rebrandDeep);
  if (node && typeof node === 'object') {
    return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, rebrandDeep(v)]));
  }
  return node;
}
