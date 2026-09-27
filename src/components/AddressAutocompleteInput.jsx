import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Plane, 
  Building2, 
  Train, 
  Navigation, 
  X, 
  Loader2, 
  Crosshair, 
  Map as MapIcon,
  Sparkles
} from 'lucide-react';
import { 
  fetchAddressPredictions, 
  geocodeAddressQuery 
} from '../utils/googleMapsLoader';

export default function AddressAutocompleteInput({
  label,
  value = '',
  onChange,
  onSelectLocation,
  placeholder = 'Enter airport, hotel, or address...',
  required = false,
  icon: Icon = MapPin,
  onPickOnMap,
  onUseCurrentGPS,
  locatingGPS = false,
}) {
  const [inputValue, setInputValue] = useState(value);
  const [predictions, setPredictions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Sync internal input value when prop changes from outside (e.g. GPS or Map Picker)
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle typing with debounce
  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputValue(text);
    onChange(text);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (text.trim().length < 2) {
      setPredictions([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await fetchAddressPredictions(text);
        setPredictions(results);
        setIsOpen(results.length > 0);
        setHighlightedIndex(-1);
      } catch (err) {
        console.error('Prediction fetch error:', err);
      } finally {
        setLoading(false);
      }
    }, 200);
  };

  // Select prediction
  const handleSelectPrediction = async (item) => {
    const fullAddr = item.fullAddress || item.mainText;
    setInputValue(fullAddr);
    onChange(fullAddr);
    setIsOpen(false);

    let lat = item.lat;
    let lng = item.lng;
    let placeId = item.placeId;

    // If coordinates missing on suggestion, geocode in background
    if (!lat || !lng) {
      const geo = await geocodeAddressQuery(fullAddr);
      if (geo) {
        lat = geo.lat;
        lng = geo.lng;
        placeId = geo.placeId || placeId;
      }
    }

    if (onSelectLocation) {
      onSelectLocation({
        address: fullAddr,
        lat,
        lng,
        placeId,
      });
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen || predictions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < predictions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : predictions.length - 1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < predictions.length) {
        e.preventDefault();
        handleSelectPrediction(predictions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'AIRPORT':
        return <Plane className="w-3.5 h-3.5 text-[#e0a922]" />;
      case 'HOTEL':
        return <Building2 className="w-3.5 h-3.5 text-blue-400" />;
      case 'STATION':
        return <Train className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-neutral-400" />;
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Header Label & Quick Actions */}
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-gold" />
          <span>{label}</span>
        </label>

        <div className="flex items-center gap-2">
          {onUseCurrentGPS && (
            <>
              <button
                type="button"
                onClick={onUseCurrentGPS}
                disabled={locatingGPS}
                className="text-[11px] text-gold hover:underline flex items-center gap-1 font-bold"
              >
                <Crosshair className={`w-3 h-3 ${locatingGPS ? 'animate-spin' : ''}`} />
                <span>{locatingGPS ? 'Locating...' : 'Current GPS'}</span>
              </button>
              <span className="text-neutral-600">|</span>
            </>
          )}

          {onPickOnMap && (
            <button
              type="button"
              onClick={onPickOnMap}
              className="text-[11px] text-gold hover:underline flex items-center gap-1 font-bold"
            >
              <MapIcon className="w-3 h-3" />
              <span>Pick on Map</span>
            </button>
          )}
        </div>
      </div>

      {/* Input Box */}
      <div className="relative">
        <input
          type="text"
          required={required}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (predictions.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className="w-full bg-[#14202D] border border-white/10 rounded-xl pl-4 pr-16 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold transition shadow-inner"
        />

        {/* Right side loader / clear button */}
        <div className="absolute right-2.5 top-2.5 flex items-center gap-1">
          {loading && (
            <Loader2 className="w-4 h-4 text-gold animate-spin mr-1" />
          )}

          {inputValue && (
            <button
              type="button"
              onClick={() => {
                setInputValue('');
                onChange('');
                setPredictions([]);
                setIsOpen(false);
              }}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition"
              title="Clear input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {onPickOnMap && (
            <button
              type="button"
              onClick={onPickOnMap}
              className="p-1 rounded-lg text-neutral-400 hover:text-gold hover:bg-white/10 transition"
              title="Pick on Google Map"
            >
              <MapIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Floating Autocomplete Recommendations Dropdown */}
      {isOpen && predictions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-[#0E1722]/98 border border-gold/40 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden divide-y divide-white/5 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3.5 py-1.5 bg-[#080E14] text-[10px] uppercase font-bold tracking-wider text-gold flex items-center justify-between">
            <span>Recommended Locations</span>
            <span className="text-neutral-500 lowercase font-normal">select or press enter</span>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {predictions.map((item, index) => {
              const isHighlighted = highlightedIndex === index;
              return (
                <button
                  key={`${item.placeId || item.mainText}-${index}`}
                  type="button"
                  onClick={() => handleSelectPrediction(item)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full p-3 text-left transition flex items-start gap-3 ${
                    isHighlighted
                      ? 'bg-gold/15 text-white'
                      : 'hover:bg-white/5 text-neutral-300'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    {getCategoryIcon(item.category)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white leading-snug truncate flex items-center gap-1.5">
                      <span>{item.mainText}</span>
                      {item.category === 'AIRPORT' && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Airport
                        </span>
                      )}
                    </div>
                    {item.secondaryText && (
                      <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {item.secondaryText}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
