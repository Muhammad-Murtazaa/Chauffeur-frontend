import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqData } from '../data/faqData';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {faqData.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen 
                ? 'bg-[#101923] border-gold/40 shadow-lg shadow-gold/10' 
                : 'bg-[#0E1722] border-white/5 hover:border-white/15'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-base sm:text-lg font-bold text-white leading-snug">
                {item.question}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                isOpen ? 'bg-gold text-black rotate-180' : 'bg-white/5 text-neutral-400'
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-neutral-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
