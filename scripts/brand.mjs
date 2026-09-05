/**
 * Brand and locale substitution, applied during content generation.
 *
 * The content modules under src/content are generated from the reference site,
 * which is branded "Catalit" and written for a South-India market. This project
 * ships as Tri-Metal Company LLC in Maui, Hawaii, so the rename and the locale
 * swap have to live in the PIPELINE — editing the generated files directly would
 * be silently undone the next time anyone re-runs the extractors (see D-015).
 *
 * Order matters: longer and possessive forms are replaced before shorter ones,
 * or "South India" would be half-rewritten by the "India" rule.
 */
export const BRAND = {
  name: 'Tri-Metal',
  legalName: 'Tri-Metal Company LLC',
  region: 'Hawaii',
  city: 'Maui',
  cityRegion: 'Maui, Hawaii',
};

const RULES = [
  // --- brand -------------------------------------------------------------
  [/Catalit's\b/g, BRAND.name],
  [/\bCatalit\b/g, BRAND.name],

  // --- region (longest first) --------------------------------------------
  [/South India's\b/g, `${BRAND.region}'s`],
  [/\bSouth India\b/g, BRAND.region],
  [/\bIndia\(South India\)/g, BRAND.region],
  [/\ball over India\b/g, `all over ${BRAND.region}`],
  [/\bacross India\b/g, `across ${BRAND.region}`],
  [/\bIndian\b/g, 'Hawaii'],
  [/India's\b/g, `${BRAND.region}'s`],
  [/\bIndia\b/g, BRAND.region],

  // --- specific places ----------------------------------------------------
  [/\bErattupetta, Kerala\b/g, BRAND.cityRegion],
  [/\bErattupetta\b/g, BRAND.city],
  [/\bKottayam\b/g, BRAND.city],
  [/\bKerala, Tamil Nadu, and Karnataka\b/g, 'Maui, Oahu, and Hawaii Island'],
  [/\bKerala, Tamil Nadu, Karnataka, Andhra Pradesh, and Telangana\b/g,
    'Maui, Oahu, Hawaii Island, Kauai, and Molokai'],
  [/\bKerala, TN, Karnataka\b/g, 'Maui, Oahu, Hawaii Island'],
  [/\bKerala, Tamilnadu, KA\b/g, 'Maui, Oahu, Hawaii Island'],
  [/\bDelhi to Chennai\b/g, 'Hilo to Honolulu'],
  [/\bKerala\b/g, 'Maui'],
  [/\bTamil Nadu\b/g, 'Oahu'],
  [/\bTamilnadu\b/g, 'Oahu'],
  [/\bKarnataka\b/g, 'Hawaii Island'],
  [/\bAndhra Pradesh\b/g, 'Kauai'],
  [/\bTelangana\b/g, 'Molokai'],
  [/\bChennai\b/g, 'Honolulu'],
  [/\bDelhi\b/g, 'Hilo'],

  // --- unverifiable claims -------------------------------------------------
  // These are the reference business's own specific assertions. Relocated to a
  // different company they become false statements, so they are generalised
  // rather than transplanted. Replace with Tri-Metal's real figures when known.
  [/We have 6 dedicated collection teams strategically positioned across/g,
    'We operate collection routes across'],
  [/\bsix dedicated teams across\b/g, 'collection routes across'],
  [/#1 ranked in Hawaii\??/g, 'a trusted buyer in Hawaii?'],
  [/#1 in Hawaii\b/g, 'a trusted buyer in Hawaii'],
  [/Why is your company a trusted buyer in Hawaii\?/g, 'Why should I sell to you?'],
  [/\bWe are ranked a trusted buyer in Hawaii because we\b/g, 'We'],
  [/#1 Ranked/g, 'Trusted Buyer'],
  [/\bLeading the industry in precise XRF analysis and ethical recycling\.?/g,
    'Precise XRF analysis and ethical recycling.'],
  // Rupee price ranges do not apply in a US market; drop the specific figures.
  [/₹[\d,]+(?:\s*-\s*₹[\d,]+)?\+?/g, 'market rates'],
  [/typically ranging from market rates to market rates\+?/g, 'varying with market rates'],

  // --- market specifics ---------------------------------------------------
  // UPI is an India-only payment rail; Infinitoq is an unrelated third party.
  [/\bUPI, Bank Transfer, or Cash\b/g, 'ACH, Zelle, or Cash'],
  [/\bUPI\b/g, 'ACH'],
  [/,?\s*Backed by the expertise of Infinitoq,?\s*/g, ' '],
  [/\s*and the trust of a brand backed by Infinitoq/g, ''],
];

export function rebrand(value) {
  if (typeof value !== 'string') return value;
  return RULES.reduce((out, [pattern, replacement]) => out.replace(pattern, replacement), value);
}

export function rebrandDeep(node) {
  if (typeof node === 'string') return rebrand(node);
  if (Array.isArray(node)) return node.map(rebrandDeep);
  if (node && typeof node === 'object') {
    return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, rebrandDeep(v)]));
  }
  return node;
}
