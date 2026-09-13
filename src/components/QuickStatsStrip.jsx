import React from 'react';
import { Plane, ShieldCheck, UserCheck, MapPin, Star } from 'lucide-react';

const stats = [
  {
    num: "01",
    title: "Flight Tracking",
    desc: "We watch your flight & adjust pickup",
    icon: Plane
  },
  {
    num: "02",
    title: "All-Inclusive Pricing",
    desc: "Tolls & driver gratuity included",
    icon: ShieldCheck
  },
  {
    num: "03",
    title: "Meet & Greet",
    desc: "In-terminal pickup on request",
    icon: UserCheck
  },
  {
    num: "04",
    title: "Tri-State Coverage",
    desc: "New York, New Jersey, Connecticut",
    icon: MapPin
  },
  {
    num: "05",
    title: "5 Star Rated",
    desc: "Service trusted by thousands of riders",
    icon: Star
  }
];

export default function QuickStatsStrip() {
  return (
    <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 sm:p-6 grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 text-neutral-900">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx} 
              className={`flex items-start space-x-3.5 ${
                idx === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-gold uppercase tracking-wider">
                  {item.num}
                </div>
                <h4 className="text-sm font-bold text-neutral-900 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
