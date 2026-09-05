import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { SiteShell } from '@/components/layout/SiteShell';
import { SHELL } from '@/data/wrappers';
import { RESOURCE_CENTER, RESOURCE_CENTER_CARDS } from '@/content/resource-center';
import { asset } from '@/lib/asset';

export default function ResourceCenterPage() {
  return (
    <SiteShell
      wrapperClassName={SHELL.resourceCenter.wrapper}
      mainClassName={SHELL.resourceCenter.main}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            {RESOURCE_CENTER.h1}
          </h1>
          <p className="text-lg text-gray-600">{RESOURCE_CENTER.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESOURCE_CENTER_CARDS.map((card, i) => (
            <Reveal
              key={card.href + card.title}
              delay={(i % 4) * 0.08}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[4/5] flex flex-col justify-end"
            >
              <Link className="absolute inset-0 z-20" href={card.href}>
                <span className="sr-only">{card.srLabel}</span>
              </Link>
              {/* Lazily-loaded <img> in place of the reference's CSS background — see
                  the note in ResourceCards.tsx. Pixel-identical, but deferrable. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(card.image)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 z-[1]" aria-hidden="true" />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[2]"
                aria-hidden="true"
              />
              <div className="relative z-[10] p-6 m-3 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md transition-colors group-hover:bg-black/40 pointer-events-none">
                <h2 className="text-lg font-bold text-white mb-2 leading-tight">{card.title}</h2>
                <p className="text-sm text-gray-200 mb-4 line-clamp-3 leading-relaxed">
                  {card.description}
                </p>
                <span className="inline-flex items-center text-sm font-semibold text-emerald-400 transition-colors">
                  {card.cta}{' '}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
