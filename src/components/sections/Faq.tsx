'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { HOME_FAQ } from '@/content/faq';
import { PHONE_DISPLAY, TEL_HREF } from '@/data/site';

/**
 * Single-open FAQ accordion. Buttons expose aria-expanded/aria-controls and each
 * panel is labelled by its trigger, so the whole list is keyboard operable.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white to-emerald-50">
      <div className="container mx-auto max-w-4xl">
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <HelpCircle size={32} className="text-emerald-600" />
          </div>
          <h2 className="text-4xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Common questions about selling catalytic converters, ceramics and e-waste to
            Tri-Metal. Cannot find your answer? Get in touch.
          </p>
        </Reveal>

        <div className="space-y-4">
          {HOME_FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal
                key={item.question}
                delay={Math.min(i, 6) * 0.04}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-gray-900 pr-8">{item.question}</span>
                    <div className="flex-shrink-0">
                      <ChevronDown
                        className={`w-5 h-5 text-emerald-600 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  hidden={!isOpen}
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">{item.answer}</div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 text-center bg-emerald-50 rounded-xl p-8 border border-emerald-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4">
            Our team is available 24/7 to help you with any inquiries.
          </p>
          <a
            href={TEL_HREF}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-300"
          >
            Call Us Now: {PHONE_DISPLAY}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
