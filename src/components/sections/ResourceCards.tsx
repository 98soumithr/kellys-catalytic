import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { RESOURCE_CARDS } from '@/content/home';
import { asset } from '@/lib/asset';

export function ResourceCards() {
  return (
    <section className="py-20 px-4 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <Reveal className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            Resource Center
          </h2>
          <p className="text-lg text-gray-600">
            Explore our comprehensive guides and resources on catalytic converter recycling, e-waste
            management, and industry compliance.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {RESOURCE_CARDS.map((card, i) => (
            <Reveal
              key={card.href}
              delay={(i % 4) * 0.08}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[4/5] flex flex-col justify-end"
            >
              {/*
                * The reference paints this with a CSS background-image. Rendered as a
                * lazily-loaded <img> instead: object-cover/center is pixel-identical to
                * bg-cover/bg-center (verified by the screenshot diff suite), but a CSS
                * background cannot be deferred and these eight cards are below the fold.
                */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(card.image.src)}
                alt=""
                aria-hidden="true"
                width={card.image.width}
                height={card.image.height}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 z-[1]" aria-hidden="true" />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[2]"
                aria-hidden="true"
              />
              <div className="relative z-[10] p-6 m-3 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md transition-colors group-hover:bg-black/40">
                <h3 className="text-lg font-bold text-white mb-2 leading-tight">{card.title}</h3>
                <p className="text-sm text-gray-200 mb-4 line-clamp-3 leading-relaxed">
                  {card.description}
                </p>
                <Link
                  className="inline-flex items-center text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  href={card.href}
                >
                  Learn More{' '}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center">
          <Link
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
            href="/resource-center"
          >
            View All Resources
          </Link>
        </div>
      </div>
    </section>
  );
}
