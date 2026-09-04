'use client';

import { useMemo, useState } from 'react';
import { BookOpen, ChevronRight, Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { KNOWLEDGE_BASE, KNOWLEDGE_BASE_ITEMS } from '@/content/knowledge-base';
import { WHATSAPP_URL } from '@/data/site';

const INPUT_CLASS =
  'flex h-9 w-full border bg-transparent px-3 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-12 pr-12 py-6 text-base rounded-2xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm text-gray-900';

export function KnowledgeBaseView() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return KNOWLEDGE_BASE_ITEMS;
    return KNOWLEDGE_BASE_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-6">
            <BookOpen className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            {KNOWLEDGE_BASE.h1}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {KNOWLEDGE_BASE.intro}
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
              aria-hidden="true"
            />
            <input
              type="text"
              className={INPUT_CLASS}
              placeholder={KNOWLEDGE_BASE.searchPlaceholder}
              aria-label="Search FAQs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
          {results.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-3">
              {results.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  value={`item-${i}`}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-300 transition-colors duration-300"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-emerald-50/50 transition-colors duration-300 text-left">
                    <div className="flex items-start gap-2 pr-4 w-full">
                      <span className="font-semibold text-gray-900 text-base md:text-lg">
                        <span>{item.question}</span>
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-1 text-gray-600 leading-relaxed text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-center text-gray-500 py-8">
              No results found. Try a different search term.
            </p>
          )}
        </div>

        <div className="mt-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Still Have Questions?</h3>
          <p className="text-emerald-50 text-lg mb-6 max-w-2xl mx-auto">
            Our team is here to help. Get instant answers and personalized assistance via WhatsApp.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Contact Us on WhatsApp
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
