import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, Check, ArrowRight } from 'lucide-react';

export default function VehicleCard({ vehicle }) {
  return (
    <div className="bg-[#0E1722] rounded-2xl border border-white/10 hover:border-gold/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-2xl hover:shadow-gold/10">
      <div>
        {/* Vehicle Image with overlay */}
        <div className="relative aspect-[16/10] bg-[#090F16] overflow-hidden flex items-center justify-center p-4">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              // fallback image if remote link is broken
              e.target.src = "https://nycpremierlimo.com/wp-content/uploads/2026/09/Premium-sedan.png";
            }}
          />
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-gold border border-gold/30">
            {vehicle.rateEstimate}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gold mb-1">
            {vehicle.tagline}
          </div>
          <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition">
            {vehicle.name}
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5 mb-4">
            {vehicle.model}
          </p>

          {/* Passenger & Luggage pill specs */}
          <div className="flex items-center gap-4 py-3 border-y border-white/5 text-xs text-neutral-300">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gold" />
              <span>{vehicle.passengers} Passengers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-gold" />
              <span>{vehicle.luggage} Luggage</span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 mt-4 leading-relaxed line-clamp-2">
            {vehicle.description}
          </p>

          {/* Feature List preview */}
          <ul className="mt-4 space-y-1.5 text-[11px] text-neutral-300">
            {vehicle.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="p-6 pt-0 mt-2">
        <Link
          to={`/reservations?vehicle=${vehicle.id}`}
          className="w-full bg-white/5 hover:bg-gold hover:text-black text-white text-xs font-bold py-3 px-4 rounded-xl border border-white/10 hover:border-gold transition flex items-center justify-center gap-2 group/btn"
        >
          <span>Reserve Vehicle</span>
          <ArrowRight className="w-3.5 h-3.5 text-gold group-hover/btn:text-black group-hover/btn:translate-x-1 transition" />
        </Link>
      </div>
    </div>
  );
}
