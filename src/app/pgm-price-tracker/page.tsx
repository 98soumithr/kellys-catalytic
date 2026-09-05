import { SiteShell } from '@/components/layout/SiteShell';
import { SHELL } from '@/data/wrappers';
import { TradingViewQuotes } from './TradingViewQuotes';

export default function PgmPriceTrackerPage() {
  return (
    <SiteShell wrapperClassName={SHELL.column.wrapper} mainClassName={SHELL.column.main}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Live PGM Price Tracker
            </h1>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Stay updated with the real-time market performance of Platinum Group Metals (PGM).
                Monitoring spot prices for <strong>Platinum (XPT)</strong>,{' '}
                <strong>Palladium (XPD)</strong>, and <strong>Rhodium (XRH)</strong>is essential for
                accurately valuing automotive catalytic converter scrap and ensuring fair market
                transactions.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                The tracker below shows current market data, so recyclers,
                collectors, and industry professionals to make informed decisions based on the
                latest global commodity trends and precious metal fluctuations.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-4 md:p-8">
            <TradingViewQuotes />
          </div>

          <div className="mt-12 bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
            <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-2 block">
              Market Insight
            </span>
            <p className="text-gray-700 text-sm italic">
              Note: Market prices are subject to global volatility. Tri-Metal shows these live
              rates for informational purposes to help our partners estimate the value of their
              materials transparently.
            </p>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
