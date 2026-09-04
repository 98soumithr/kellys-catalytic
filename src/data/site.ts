/**
 * Contact endpoints and navigation, mirroring the reference site exactly.
 * Values are overridable per deployment via NEXT_PUBLIC_* env vars.
 */
export const PHONE_E164 = process.env.NEXT_PUBLIC_PHONE_E164 ?? '+919895397781';
export const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? '+91 9895397781';
export const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL ?? 'https://wa.me/919895397781';
export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? 'https://g.page/r/CYlTCXv453w8EBE/review';
export const FACEBOOK_URL =
  'https://www.facebook.com/share/1E9cCSuXiJ/?mibextid=wwXIfr';
export const INSTAGRAM_URL =
  'https://www.instagram.com/catalit.in?igsh=MW00enQwZXZseDY2Yg%3D%3D&utm_source=qr';
export const EMAIL = 'info@catalit.com';
export const TEL_HREF = `tel:${PHONE_E164}`;

export const SITE_TITLE = 'Catalit | Top Catalytic Converter Buyer in India';
export const SITE_DESCRIPTION =
  'Catalit offers top cash payouts for catalytic converters. Serving Kerala, Tamilnadu, KA & all over India. Get an instant valuation and spot cash today!';

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
  'Kerala',
  'Tamil Nadu',
  'Karnataka',
  'Andhra Pradesh',
  'Telangana',
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
] as const;
