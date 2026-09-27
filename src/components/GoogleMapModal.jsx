import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  X, 
  MapPin, 
  Crosshair, 
  Search, 
  Check, 
  Loader2, 
  Compass, 
  Sparkles
} from 'lucide-react';
import { 
  loadGoogleMapsScript, 
  darkLuxuryMapStyle, 
  getCurrentGPSLocation, 
  reverseGeocodeLocation,
  geocodeAddressQuery,
  fetchAddressPredictions
} from '../utils/googleMapsLoader';

// Custom Gold Luxury Pin for Leaflet
const createGoldIcon = () => {
  return L.divIcon({
    className: 'custom-gold-marker',
    html: `
      <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: grab;">
        <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(212, 175, 55, 0.3); animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="#D4AF37" stroke="#000000" stroke-width="1.5" style="filter: drop-shadow(0 6px 12px rgba(0,0,0,0.8));">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 34],
  });
};

export default function GoogleMapModal({ 
  isOpen, 
  onClose, 
  onSelectLocation, 
  initialAddress = '', 
  initialLat, 
  initialLng, 
  title = 'Select Location on Map' 
}) {
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const leafletMarkerRef = useRef(null);
  const googleMapRef = useRef(null);
  const googleMarkerRef = useRef(null);
  const searchDebounceRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState(initialAddress);
  const [currentAddress, setCurrentAddress] = useState(initialAddress || 'Select location on map...');
  const [selectedCoords, setSelectedCoords] = useState({
    lat: initialLat ? Number(initialLat) : 40.7589, // Default Midtown NYC
    lng: initialLng ? Number(initialLng) : -73.9851,
  });

  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      return;
    }

    let isMounted = true;

    async function initMap() {
      setLoading(true);
      const startLat = initialLat ? Number(initialLat) : 40.7589;
      const startLng = initialLng ? Number(initialLng) : -73.9851;
      setSelectedCoords({ lat: startLat, lng: startLng });

      // Check if Google Maps JS is available with key
      const googleMaps = await loadGoogleMapsScript();

      if (!isMounted) return;

      if (googleMaps && mapContainerRef.current) {
        // Init Google Maps
        const center = { lat: startLat, lng: startLng };
        const map = new googleMaps.Map(mapContainerRef.current, {
          center,
          zoom: 15,
          styles: darkLuxuryMapStyle,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        googleMapRef.current = map;

        const marker = new googleMaps.Marker({
          position: center,
          map,
          draggable: true,
          animation: googleMaps.Animation.DROP,
          icon: {
            path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
            fillColor: '#D4AF37',
            fillOpacity: 1,
            strokeWeight: 1.5,
            strokeColor: '#000000',
            scale: 2,
            anchor: new googleMaps.Point(12, 22),
          },
        });
        googleMarkerRef.current = marker;

        map.addListener('click', async (e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          marker.setPosition({ lat, lng });
          setSelectedCoords({ lat, lng });
          const addr = await reverseGeocodeLocation(lat, lng);
          if (isMounted) {
            setCurrentAddress(addr);
            setSearchQuery(addr);
          }
        });

        marker.addListener('dragend', async (e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setSelectedCoords({ lat, lng });
          const addr = await reverseGeocodeLocation(lat, lng);
          if (isMounted) {
            setCurrentAddress(addr);
            setSearchQuery(addr);
          }
        });
      } else if (mapContainerRef.current) {
        // Init Visual Leaflet Map with Dark Matter Luxury Tiles
        if (leafletMapRef.current) {
          leafletMapRef.current.remove();
          leafletMapRef.current = null;
        }

        const map = L.map(mapContainerRef.current, {
          center: [startLat, startLng],
          zoom: 15,
          zoomControl: false,
        });
        leafletMapRef.current = map;

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // CartoDB Dark Matter luxury styling
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
          subdomains: 'abcd',
          maxZoom: 19,
        }).addTo(map);

        const marker = L.marker([startLat, startLng], {
          icon: createGoldIcon(),
          draggable: true,
        }).addTo(map);
        leafletMarkerRef.current = marker;

        marker.on('dragend', async () => {
          const pos = marker.getLatLng();
          setSelectedCoords({ lat: pos.lat, lng: pos.lng });
          const addr = await reverseGeocodeLocation(pos.lat, pos.lng);
          if (isMounted) {
            setCurrentAddress(addr);
            setSearchQuery(addr);
          }
        });

        map.on('click', async (e) => {
          marker.setLatLng(e.latlng);
          setSelectedCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
          const addr = await reverseGeocodeLocation(e.latlng.lat, e.latlng.lng);
          if (isMounted) {
            setCurrentAddress(addr);
            setSearchQuery(addr);
          }
        });

        setTimeout(() => {
          if (leafletMapRef.current) {
            leafletMapRef.current.invalidateSize();
          }
        }, 150);
      }

      // If initial address given, geocode if coordinates missing
      if (initialAddress && (!initialLat || !initialLng)) {
        geocodeAddressQuery(initialAddress).then((res) => {
          if (res && isMounted) {
            moveToLocation(res.lat, res.lng, res.formattedAddress);
          }
        });
      }

      setLoading(false);
    }

    initMap();

    return () => {
      isMounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [isOpen]);

  const moveToLocation = (lat, lng, addressText) => {
    setSelectedCoords({ lat, lng });
    if (addressText) {
      setCurrentAddress(addressText);
      setSearchQuery(addressText);
    }

    // Move Google Map
    if (googleMapRef.current && googleMarkerRef.current && window.google?.maps) {
      const pos = { lat, lng };
      googleMapRef.current.setCenter(pos);
      googleMapRef.current.setZoom(16);
      googleMarkerRef.current.setPosition(pos);
    }

    // Move Leaflet Map
    if (leafletMapRef.current && leafletMarkerRef.current) {
      leafletMapRef.current.setView([lat, lng], 16, { animate: true });
      leafletMarkerRef.current.setLatLng([lat, lng]);
    }
  };

  // GPS Locate Current Location
  const handleLocateMe = async () => {
    setLocating(true);
    try {
      const loc = await getCurrentGPSLocation();
      moveToLocation(loc.lat, loc.lng, loc.address);
    } catch (err) {
      alert(err.message || 'Unable to retrieve current GPS location.');
    } finally {
      setLocating(false);
    }
  };

  // Search Input change with debounced recommendations
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    if (query.trim().length < 2) {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }

    searchDebounceRef.current = setTimeout(async () => {
      try {
        const results = await fetchAddressPredictions(query);
        setPredictions(results);
        setShowPredictions(results.length > 0);
      } catch (err) {
        console.error('Modal prediction error:', err);
      }
    }, 200);
  };

  // Select Prediction from Dropdown
  const handleSelectPrediction = async (item) => {
    const fullAddr = item.fullAddress || item.mainText;
    setSearchQuery(fullAddr);
    setCurrentAddress(fullAddr);
    setShowPredictions(false);

    let lat = item.lat;
    let lng = item.lng;

    if (!lat || !lng) {
      const geo = await geocodeAddressQuery(fullAddr);
      if (geo) {
        lat = geo.lat;
        lng = geo.lng;
      }
    }

    if (lat && lng) {
      moveToLocation(lat, lng, fullAddr);
    }
  };

  // Search Address in Map
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setShowPredictions(false);
    setSearching(true);
    try {
      const geo = await geocodeAddressQuery(searchQuery);
      if (geo) {
        moveToLocation(geo.lat, geo.lng, geo.formattedAddress);
      } else {
        alert('Address location not found. Please try a different query or place the pin directly.');
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setSearching(false);
    }
  };

  // Confirm Selection
  const handleConfirm = () => {
    onSelectLocation({
      address: currentAddress || searchQuery,
      lat: selectedCoords.lat,
      lng: selectedCoords.lng,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#0E1722] border border-gold/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#080E14]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white">{title}</h3>
              <p className="text-[11px] text-neutral-400">
                Drag the gold pin or click anywhere on the visual map to select your exact location
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & GPS Locate */}
        <div className="p-4 bg-[#0A1017] border-b border-white/10 flex flex-col sm:flex-row items-center gap-3 relative z-30">
          <form onSubmit={handleSearchSubmit} className="flex-1 w-full relative">
            <input
              type="text"
              placeholder="Search airport, hotel, address, or landmark..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                if (predictions.length > 0) setShowPredictions(true);
              }}
              className="w-full bg-[#14202D] border border-white/10 rounded-xl pl-10 pr-24 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold transition"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <button
              type="submit"
              disabled={searching}
              className="absolute right-2 top-1.5 px-3 py-1.5 bg-gold/20 hover:bg-gold text-gold hover:text-black font-bold text-xs rounded-lg transition"
            >
              {searching ? 'Locating...' : 'Search'}
            </button>

            {/* Address Recommendations Dropdown */}
            {showPredictions && predictions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#0E1722]/98 border border-gold/40 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden divide-y divide-white/5">
                <div className="px-3 py-1.5 bg-[#080E14] text-[10px] uppercase font-bold text-gold flex items-center justify-between">
                  <span>Suggested Locations</span>
                  <span className="text-neutral-500 font-normal lowercase">click to pan map</span>
                </div>
                <div className="max-h-56 overflow-y-auto">
                  {predictions.map((p, idx) => (
                    <button
                      key={`${p.placeId || p.mainText}-${idx}`}
                      type="button"
                      onClick={() => handleSelectPrediction(p)}
                      className="w-full p-2.5 text-left hover:bg-gold/15 transition flex items-center gap-2.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{p.mainText}</div>
                        {p.secondaryText && (
                          <div className="text-[10px] text-neutral-400 truncate">{p.secondaryText}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>

          <button
            type="button"
            onClick={handleLocateMe}
            disabled={locating}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#14202D] hover:bg-white/10 text-gold border border-gold/30 hover:border-gold rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shrink-0"
          >
            {locating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Locating GPS...</span>
              </>
            ) : (
              <>
                <Crosshair className="w-4 h-4 text-gold" />
                <span>Use Current Location</span>
              </>
            )}
          </button>
        </div>

        {/* Visual Real Interactive Map Canvas */}
        <div className="relative flex-1 min-h-[400px] sm:min-h-[460px] bg-[#080E14] overflow-hidden">
          <div ref={mapContainerRef} className="w-full h-full min-h-[400px] sm:min-h-[460px] z-10" />

          {/* Loading Indicator */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#080E14]/80 backdrop-blur-sm z-20">
              <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#0E1722] border border-gold/40 text-gold text-xs font-bold shadow-xl">
                <Loader2 className="w-4 h-4 animate-spin text-gold" />
                <span>Loading Visual Map Engine...</span>
              </div>
            </div>
          )}
        </div>

        {/* Selected Address Banner & Confirm Bar */}
        <div className="p-4 sm:p-5 bg-[#080E14] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3 w-full sm:w-auto">
            <div className="w-6 h-6 rounded-full bg-gold text-black flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
              ✓
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gold">Selected Pin Location</span>
              <p className="text-xs sm:text-sm font-semibold text-white line-clamp-1 max-w-lg">
                {currentAddress || 'No location selected yet'}
              </p>
              <span className="text-[10px] text-neutral-500 font-mono">
                Lat: {selectedCoords.lat.toFixed(5)}, Lng: {selectedCoords.lng.toFixed(5)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-7 py-2.5 rounded-full bg-gold hover:bg-gold-hover text-black font-bold text-xs tracking-wide transition shadow-lg shadow-gold/25 flex items-center gap-1.5"
            >
              <span>Confirm Location</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
