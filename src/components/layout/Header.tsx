'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MAIN_NAV, RESOURCE_LINKS, WHATSAPP_URL } from '@/data/site';
import { LOGO } from '@/content/home';

/**
 * Fixed header. Transparent at the top of the page; on scroll it swaps to the
 * frosted `glass` treatment — matching the reference's measured scrolled class list
 * (`glass shadow-sm bg-white/90 backdrop-blur-md`) and its 300ms transition.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass shadow-sm bg-white/90 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <nav className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link className="block" href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOGO}
                alt="Kelly's Catalytic Logo"
                width={480}
                height={96}
                loading="eager"
                fetchPriority="high"
                className="h-[41px] md:h-[54px] w-auto object-contain transition-all duration-300"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {MAIN_NAV.map((item) => (
              <div key={item.href} className="flex items-center">
                <Link
                  className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-semibold text-sm lg:text-base"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </div>
            ))}

            <div>
              <div className="relative group">
                <button
                  type="button"
                  aria-haspopup="true"
                  className="flex items-center gap-1 transition-colors duration-300 font-semibold text-sm lg:text-base text-gray-700 hover:text-emerald-600"
                >
                  <span>Resource Center</span>
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-300 group-hover:rotate-180"
                  />
                </button>
                <div className="absolute top-full left-0 mt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-300 z-[100] animate-fade-in-down">
                  <div className="glass-dropdown p-2">
                    {RESOURCE_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        className="block px-4 py-3 rounded-md transition-all duration-300 text-gray-700 hover:bg-emerald-50/50 hover:text-emerald-600"
                        href={link.href}
                      >
                        <div className="font-semibold text-sm">{link.label}</div>
                        <div className="text-xs mt-0.5 text-gray-500">{link.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <a
              className="hidden lg:inline-flex px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-colors shadow-md text-sm lg:text-base"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Quote
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded"
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 glass-strong rounded-xl overflow-hidden shadow-xl border border-gray-100 bg-white">
            <div className="flex flex-col space-y-4 p-6">
              {[
                ...MAIN_NAV,
                { label: 'Resource Center', href: '/resource-center' },
                ...RESOURCE_LINKS.map((r) => ({ label: r.label, href: r.href })),
              ].map((item) => (
                <Link
                  key={item.href + item.label}
                  className="text-gray-800 hover:text-emerald-600 transition-colors duration-300 font-semibold text-base block py-2 border-b border-gray-100 last:border-0"
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                className="inline-flex justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-colors shadow-md w-full mt-2"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Quote
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
