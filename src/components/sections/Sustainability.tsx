import Link from 'next/link';
import { ArrowRight, BarChart3, Globe, Leaf, Recycle } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const PILLARS = [
  { label: 'Regional Coverage', Icon: Globe },
  { label: 'Ethical Recycling', Icon: Recycle },
  { label: 'Expert Valuation', Icon: BarChart3 },
];

export function Sustainability() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-emerald-50/50">
      <div className="container mx-auto">
        <Reveal className="relative glass-strong rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl border border-emerald-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100/50 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2" />
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-bold mb-2">
                <Leaf className="w-4 h-4 mr-2" />
                Eco-Friendly Commitment
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Leading the Way in{' '}
                <span className="gradient-text">Sustainable Resource Recovery</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Tri-Metal Company LLC buys spent catalytic converters, autocatalyst ceramics,
                oxygen sensors and e-waste across Maui and the wider Hawaiian Islands. Every unit is
                assessed on its actual platinum, palladium and rhodium content rather than a flat
                rate, so you can see how a quote was reached. Recovered material is passed to
                licensed refiners, keeping precious metals in circulation and out of landfill.
                <Link
                  href="/about"
                  className="inline-flex items-center ml-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors group cursor-pointer"
                >
                  Know More
                  <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {PILLARS.map(({ label, Icon }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center p-4 bg-white/50 rounded-xl border border-emerald-50 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-gray-800">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
