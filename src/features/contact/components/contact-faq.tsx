'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function ContactFaq() {
  // Translation
  const t = useTranslations('contactPage');

  // State
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Variables
  const faqs = [
    { q: t('faqs.q1'), a: t('faqs.a1') },
    { q: t('faqs.q2'), a: t('faqs.a2') },
    { q: t('faqs.q3'), a: t('faqs.a3') },
    { q: t('faqs.q4'), a: t('faqs.a4') },
  ];

  // Functions
  function toggleFaq(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-elevated p-6 sm:p-8 shadow-xs">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft-pink-100 text-maroon-700 dark:bg-maroon-900/60 dark:text-soft-pink-300">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary">
            {t('faqTitle')}
          </h3>
          <p className="text-xs text-text-soft">{t('faqSubtitle')}</p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-border-subtle bg-bg-plain transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between p-4 text-start font-semibold text-text-primary transition-colors hover:text-maroon-600 focus:outline-none"
              >
                <span className="text-sm">{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-border-subtle/60 px-4 pb-4 pt-3 text-xs leading-relaxed text-text-soft">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
