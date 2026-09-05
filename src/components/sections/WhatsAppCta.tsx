import { MessageCircle } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { WHATSAPP_URL } from '@/data/site';
import { WHATSAPP_QR_IMAGE } from '@/content/home';
import { asset } from '@/lib/asset';

const STATS = [
  { value: '100%', label: 'Fair Pricing' },
  { value: '24/7', label: 'Instant Payout' },
  { value: '5+', label: 'Service States' },
  { value: '6 Years', label: 'Experience' },
];

export function WhatsAppCta() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <Reveal className="glass-strong bg-white/80 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border border-emerald-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Ready to <span className="gradient-text">Get Paid?</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Send a photo of your converter and we will quote it against current platinum,
                palladium and rhodium prices. Serving Maui and the Hawaiian Islands.
              </p>
              <a
                className="btn-hover-glow inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl text-xl shadow-xl hover:shadow-2xl"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle width={28} height={28} className="mr-3" />
                Sell Now via WhatsApp
              </a>
              <p className="text-sm text-gray-500 mt-6">
                💬 Available 24/7 • ⚡ Instant Response • 🔒 100% Secure
              </p>
            </div>

            <div className="flex justify-center">
              <div className="glass bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
                  <div className="bg-white rounded-lg flex items-center justify-center border border-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(WHATSAPP_QR_IMAGE)}
                      alt="Message Tri-Metal on WhatsApp"
                      width={1147}
                      height={1147}
                      loading="lazy"
                      decoding="async"
                      className="w-48 h-48 md:w-64 md:h-64 object-contain"
                    />
                  </div>
                </div>
                <p className="text-center text-gray-500 mt-4 text-sm font-medium">
                  Scan to Chat on WhatsApp
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-gray-200">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold gradient-text mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
