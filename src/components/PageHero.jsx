import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Phone, CalendarCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function PageHero({
  title,
  subtitle,
  badge = "NYC Premier Chauffeur",
  bgImage = "https://nycpremierlimo.com/wp-content/uploads/2026/09/fleet-page-chauffeur-service-nyc-hero.webp",
  breadcrumbs = []
}) {
  const navigate = useNavigate();
  const { promptInstantQuote } = useAuth();

  return (
    <section className="relative min-h-[440px] sm:min-h-[500px] flex items-center justify-center pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image with Dark Luxury Gradients */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060B10]/90 via-[#060B10]/80 to-[#060B10]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060B10]/95 via-transparent to-[#060B10]/95" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
        {/* Breadcrumb Navigation */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center justify-center space-x-2 text-xs text-neutral-400 mb-2">
            <Link to="/" className="hover:text-gold transition">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
                {crumb.link ? (
                  <Link to={crumb.link} className="hover:text-gold transition">{crumb.name}</Link>
                ) : (
                  <span className="text-gold font-medium">{crumb.name}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Category Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-widest">
            {badge}
          </div>
        )}

        {/* Page Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* CTAs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => promptInstantQuote(navigate, '/reservations')}
            className="bg-gold hover:bg-gold-hover text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide transition shadow-xl shadow-gold/25 flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Instant Quote & Book</span>
          </button>

          <a
            href="tel:+13478889797"
            className="border border-white/20 hover:border-gold hover:text-gold text-white px-6 py-3.5 rounded-full font-bold text-sm tracking-wide transition flex items-center gap-2 bg-white/5 backdrop-blur-sm"
          >
            <Phone className="w-4 h-4 text-gold" />
            <span>(347) 888-9797</span>
          </a>
        </div>
      </div>
    </section>
  );
}
