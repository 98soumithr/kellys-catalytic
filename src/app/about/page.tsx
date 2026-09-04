import {
  ArrowRight,
  Car,
  Cpu,
  Globe,
  Leaf,
  Phone,
  ShieldCheck,
  TrendingUp,
  Truck,
  UserPlus,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { SiteShell } from '@/components/layout/SiteShell';
import { SHELL } from '@/data/wrappers';
import { Reveal } from '@/components/ui/Reveal';
import {
  ABOUT_CTA,
  ABOUT_HERO_SUBTITLE,
  ABOUT_STORY,
  NETWORK,
  NETWORK_CARDS,
  VISION,
  WHAT_WE_DO,
  WHAT_WE_DO_HEADING,
  WHY_PARTNER,
  WHY_PARTNER_HEADING,
} from '@/content/about';
import { TEL_HREF } from '@/data/site';

const WHAT_WE_DO_ICONS = [Car, Cpu, Leaf];
const WHY_ICONS = [Users, Truck, TrendingUp, ShieldCheck];
const NETWORK_ICONS = [UserPlus, Truck, ShieldCheck];

export default function AboutPage() {
  return (
    <SiteShell wrapperClassName={SHELL.about.wrapper} mainClassName={SHELL.about.main}>
      <section className="relative py-20 px-4 bg-gradient-to-br from-emerald-900 to-slate-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url("/images/about-hero-background.png")' }}
          aria-label="Catalit's state-of-the-art recycling facility"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
        <div className="container mx-auto relative z-10 text-center">
          <Reveal as="h1" className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            About <span className="text-emerald-400">Catalit</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.1}
            className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md"
          >
            {ABOUT_HERO_SUBTITLE}
          </Reveal>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <Reveal className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold mb-6">
              {ABOUT_STORY.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              {ABOUT_STORY.title}
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed text-lg md:text-xl">
              {ABOUT_STORY.body}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 px-4 bg-emerald-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {WHAT_WE_DO_HEADING.title}
            </h2>
            <p className="text-gray-600 text-lg">{WHAT_WE_DO_HEADING.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHAT_WE_DO.map((card, i) => {
              const Icon = WHAT_WE_DO_ICONS[i];
              return (
                <Reveal
                  key={card.title}
                  delay={i * 0.1}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl"
                >
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {WHY_PARTNER_HEADING.title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {WHY_PARTNER_HEADING.intro}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {WHY_PARTNER.map((card, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <Reveal
                  key={card.title}
                  delay={i * 0.08}
                  className="flex p-6 bg-slate-50 rounded-xl border border-gray-100"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600">{card.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-emerald-900 to-slate-900 text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <Reveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-8 border border-emerald-500/50">
              <Globe className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">{VISION.title}</h2>
            <p className="text-xl md:text-2xl text-emerald-100 leading-relaxed font-light italic">
              {VISION.body}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto relative z-10">
          <Reveal className="max-w-5xl mx-auto glass-strong bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-emerald-100 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Join Our <span className="text-emerald-600">Growing Network</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {NETWORK.intro}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {NETWORK_CARDS.map((card, i) => {
                const Icon = NETWORK_ICONS[i];
                return (
                  <div
                    key={card.title}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{card.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{card.body}</p>
                  </div>
                );
              })}
            </div>
            <div className="text-center pt-8 border-t border-gray-200/60">
              <h4 className="text-xl font-semibold text-gray-800 mb-6 italic">{NETWORK.quote}</h4>
              <a
                href={TEL_HREF}
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-lg transition-colors group"
              >
                <Phone className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                {NETWORK.contact}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-10"
              style={{ backgroundImage: 'url("/images/texture-cubes.png")' }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{ABOUT_CTA.title}</h2>
              <p className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
                {ABOUT_CTA.body}
              </p>
              <Link
                href="/#how-to-sell"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 text-lg font-bold rounded-full hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl"
              >
                {ABOUT_CTA.button}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
