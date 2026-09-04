'use client';

import { useEffect, useRef } from 'react';

/**
 * TradingView market-quotes embed, configured with the same three PGM symbols
 * the reference tracks (Platinum, Palladium, Rhodium). This is a live third-party
 * data widget, not a site asset, so it is embedded via TradingView's official
 * script rather than copied.
 */
const CONFIG = {
  width: '100%',
  height: 550,
  symbolsGroups: [
    {
      name: 'Indices',
      originalName: 'Indices',
      symbols: [
        { name: 'TVC:PLATINUM', displayName: 'Platinum' },
        { name: 'TVC:PALLADIUM', displayName: 'Palladium' },
        { name: 'GLOBALPRIME:XRHUSD', displayName: 'Rhodium' },
      ],
    },
  ],
  showSymbolLogo: true,
  isTransparent: false,
  colorTheme: 'light',
  backgroundColor: '#ffffff',
};

export function TradingViewQuotes() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = container.current;
    if (!host || host.querySelector('script')) return;
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify(CONFIG);
    host.appendChild(script);
  }, []);

  return (
    <div className="w-full overflow-hidden relative min-h-[580px]">
      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ width: '100%', height: 550 }}
      >
        <div className="tradingview-widget-container__widget" />
        <div className="tradingview-widget-copyright">
          <a
            href="https://www.tradingview.com/"
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
    </div>
  );
}
