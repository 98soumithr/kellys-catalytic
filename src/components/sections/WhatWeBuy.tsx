import { Reveal } from '@/components/ui/Reveal';
import { WHAT_WE_BUY } from '@/content/home';

export function WhatWeBuy() {
  return (
    <section id="what-we-buy" className="py-20 px-4">
      <div className="container mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            What <span className="gradient-text">We Buy</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We specialize in purchasing high-value recyclable materials containing precious metals
          </p>
        </Reveal>

        <div className="space-y-24">
          {WHAT_WE_BUY.map((item, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal
                key={item.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  reversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={reversed ? 'lg:order-2' : undefined}>
                  <div className="image-overlay rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      className="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className={reversed ? 'lg:order-1' : undefined}>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">{item.title}</h3>
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed text-lg">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
