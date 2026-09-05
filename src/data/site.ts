/**
 * Contact endpoints and navigation, mirroring the reference site exactly.
 * Values are overridable per deployment via NEXT_PUBLIC_* env vars.
 */
export const PHONE_E164 = process.env.NEXT_PUBLIC_PHONE_E164 ?? '+18085550100';
export const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? '(808) 555-0100';
export const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL ?? 'https://wa.me/18085550100';
export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? '#';
export const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL ?? '#';
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '#';
export const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? 'info@tri-metal.com';
export const TEL_HREF = `tel:${PHONE_E164}`;

export const SITE_TITLE =
  process.env.NEXT_PUBLIC_SITE_TITLE ??
  'Tri-Metal | Catalytic Converter & E-Waste Buyer in Hawaii';
export const SITE_DESCRIPTION =
  'Tri-Metal Company LLC buys catalytic converters, autocatalyst ceramics, oxygen sensors and e-waste across Maui and the Hawaiian Islands. Send a photo for a valuation.';

export const MAIN_NAV = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Why Us', href: '/#why-us' },
  { label: 'What We Buy', href: '/#what-we-buy' },
  { label: 'How to Sell', href: '/#how-to-sell' },
] as const;

export const RESOURCE_LINKS = [
  {
    label: 'Knowledge Base',
    description: 'Comprehensive FAQ and guides',
    href: '/resource-center/knowledge-base',
  },
  {
    label: 'Live PGM Price Tracker',
    description: 'Real-time precious metal prices',
    href: '/resource-center/pgm-price-tracker',
  },
] as const;

export const FOOTER_QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Why Us', href: '/about' },
  { label: 'Resource Center', href: '/resource-center' },
  { label: 'Service Areas', href: '/service-areas' },
] as const;

export const FOOTER_SERVICE_AREAS = [
  'Maui',
  'Oahu',
  'Hawaii Island',
  'Kauai',
  'Molokai',
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
] as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tri-metal.com';

/** The 13 canonical paths published in the reference sitemap.xml. */
export const SITEMAP_ROUTES = [
  '/',
  '/about',
  '/resource-center',
  '/knowledge-base',
  '/pgm-price-tracker',
  '/automotive-catalytic-converter',
  '/ceramic-monolith',
  '/oxygen-sensor',
  '/e-waste-management',
  '/converter-recycling-process',
  '/material-recovery-pgm-prices',
  '/anti-theft-compliance',
  '/service-areas',
] as const;
