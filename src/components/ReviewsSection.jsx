import React, { useState } from 'react';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { reviewsData } from '../data/reviewsData';

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviewsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-[#080E15] border-y border-white/5 relative overflow-hidden">
      {/* Background glow subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Trustindex Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Customer Reviews
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Trusted by Discerning NYC Travelers
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              From punctual 5:00 AM airport pickups to late-night Manhattan galas, read what real clients say about our professional chauffeurs.
            </p>
          </div>

          {/* Trustindex summary badge */}
          <div className="bg-[#101A24] border border-gold/30 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2 shadow">
              {/* Google Icon SVG */}
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <span className="text-white text-sm font-bold ml-1">5.0 / 5.0</span>
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">
                Verified by <strong className="text-neutral-200">Trustindex & Google</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel / Grid of Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsData.slice(currentIndex, currentIndex + 3).map((review, idx) => (
            <div
              key={idx}
              className="bg-[#0E1722] rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-gold/40 transition relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                    {review.source}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-gold/30 mb-2" />
                
                <p className="text-sm text-neutral-300 italic leading-relaxed">
                  "{review.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {review.author}
                  </h4>
                  <p className="text-[11px] text-neutral-500">
                    {review.date}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-green-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={prevReview}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold hover:text-black text-white border border-white/10 flex items-center justify-center transition"
            aria-label="Previous Reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-xs text-neutral-400">
            Showing reviews {currentIndex + 1} to {Math.min(currentIndex + 3, reviewsData.length)} of {reviewsData.length}
          </div>
          <button
            onClick={nextReview}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold hover:text-black text-white border border-white/10 flex items-center justify-center transition"
            aria-label="Next Reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
