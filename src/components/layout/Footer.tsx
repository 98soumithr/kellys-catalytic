import Link from 'next/link';
import { Facebook, Instagram, MapPin, Mail, MessageCircle, Phone } from 'lucide-react';
import {
  EMAIL,
  FACEBOOK_URL,
  FOOTER_LEGAL_LINKS,
  FOOTER_QUICK_LINKS,
  FOOTER_SERVICE_AREAS,
  GOOGLE_REVIEW_URL,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  TEL_HREF,
  WHATSAPP_URL,
} from '@/data/site';

const SOCIALS = [
  { href: FACEBOOK_URL, label: 'Facebook', Icon: Facebook },
  { href: INSTAGRAM_URL, label: 'Instagram', Icon: Instagram },
  { href: WHATSAPP_URL, label: 'WhatsApp', Icon: MessageCircle },
  { href: GOOGLE_REVIEW_URL, label: 'Google Maps', Icon: MapPin },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <span className="text-2xl font-bold mb-4 block text-emerald-600">Kelly&apos;s Catalytic</span>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              South India&apos;s most trusted buyer of catalytic converters, ceramics, and e-waste.
              Fair pricing, instant payouts, and professional service since 2020.
            </p>
            <div className="flex space-x-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-600 flex items-center justify-center transition-all duration-300"
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="text-lg font-bold mb-4 block text-gray-900">Quick Links</span>
            <ul className="space-y-2">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 text-sm"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-lg font-bold mb-4 block text-gray-900">Service Areas</span>
            <div className="space-y-2 mb-4">
              {FOOTER_SERVICE_AREAS.map((area) => (
                <div key={area} className="flex items-center space-x-2 text-gray-600 text-sm">
                  <MapPin size={14} className="text-emerald-500 flex-shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold mb-4 block text-gray-900">Contact Us</span>
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <Phone size={16} className="text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <a
                    className="text-gray-600 text-sm hover:text-emerald-600 transition-colors"
                    href={TEL_HREF}
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <p className="text-gray-400 text-xs">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={16} className="text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 text-sm">{EMAIL}</p>
                  <p className="text-gray-400 text-xs">We reply within 24 hours</p>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-xs italic bg-gray-50 p-3 rounded-lg border border-gray-100">
              Serving our clients across South India with transparency and integrity.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2026 Kelly&apos;s Catalytic. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  className="text-gray-500 hover:text-emerald-600 text-sm transition-colors duration-300"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
