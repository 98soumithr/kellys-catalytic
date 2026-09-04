import { Banknote, Camera, CircleCheckBig, Truck } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SELL_STEPS } from '@/content/home';

const ICONS = [Camera, Truck, Banknote, CircleCheckBig];

export function HowToSell() {
  return (
    <section
      id="how-to-sell"
      className="py-20 px-4 bg-gradient-to-b from-white/20 to-emerald-50/20"
    >
      <div className="container mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Easily sell your{' '}
            <span className="gradient-text">Catalytic converter and inventory</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our simple 4-step process ensures quick, fair, and hassle-free transactions
          </p>
        </Reveal>

        {/* Desktop: four numbered columns */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8 relative">
          {SELL_STEPS.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={step.title} delay={i * 0.1} className="relative">
                <div className="glass-strong bg-white/80 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl h-full border border-gray-100">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg border-4 border-white">
                      <span className="text-2xl font-bold text-white">{i + 1}</span>
                    </div>
                  </div>
                  <div className="flex justify-center mt-8 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-emerald-100 flex items-center justify-center shadow-sm">
                      <Icon size={30} className="text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed text-center">{step.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Mobile / tablet: stacked cards with the number inline */}
        <div className="lg:hidden space-y-8">
          {SELL_STEPS.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal
                key={step.title}
                direction="left"
                delay={i * 0.1}
                className="glass-strong bg-white/90 rounded-2xl p-6 shadow-xl border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                      <span className="text-xl font-bold text-white">{i + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center shadow-sm mb-4">
                      <Icon size={26} className="text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.body}</p>
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
