import { Award, MapPin, ShieldCheck, TrendingUp } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { HOME_FEATURES } from '@/content/home';

const ICONS = [Award, MapPin, TrendingUp, ShieldCheck];
const GRADIENTS = [
  'from-emerald-500 to-teal-500',
  'from-green-500 to-emerald-600',
  'from-teal-500 to-green-500',
  'from-emerald-400 to-green-500',
];

export function Features() {
  return (
    <section className="py-20 px-4 bg-white/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {HOME_FEATURES.map((feature, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal
                key={feature.title}
                delay={i * 0.1}
                className="glass rounded-xl p-8 shadow-lg hover:glass-strong transition-all duration-300 cursor-pointer bg-white/60 border border-emerald-50"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${GRADIENTS[i]} flex items-center justify-center shadow-md`}
                  >
                    <Icon size={26} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
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
