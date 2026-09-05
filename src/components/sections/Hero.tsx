import { PHONE_DISPLAY, TEL_HREF, WHATSAPP_URL } from '@/data/site';
import { HERO_IMAGE } from '@/content/home';
import { asset } from '@/lib/asset';

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Turn your spent <span className="gradient-text">Catalytic Converter</span> into cash
              !!
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Professional valuation and instant spot payouts for converters, ceramics, and e-waste
              across South India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                className="btn-hover-glow inline-flex items-center justify-center px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full text-lg shadow-lg w-full sm:w-auto transition-all"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Sell Now
              </a>
              <a
                className="btn-hover-glow inline-flex items-center justify-center px-10 py-4 bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold rounded-full text-lg shadow-md w-full sm:w-auto transition-all"
                href={TEL_HREF}
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end animate-fade-in">
            <div className="image-overlay rounded-2xl overflow-hidden shadow-2xl border-4 border-white w-full max-w-lg lg:max-w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(HERO_IMAGE)}
                alt="Catalytic converter ready for recycling and cash conversion"
                width={1600}
                height={893}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-strong p-6 rounded-xl shadow-xl hidden lg:block bg-white/90">
              <p className="text-3xl font-bold gradient-text">6+</p>
              <p className="text-sm text-gray-600 font-medium">Years in Business</p>
            </div>
            <div className="absolute -top-6 -right-6 glass-strong p-6 rounded-xl shadow-xl hidden lg:block bg-white/90">
              <p className="text-3xl font-bold gradient-text">100%</p>
              <p className="text-sm text-gray-600 font-medium">Fair Pricing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
