import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Navigation, Loader2 } from 'lucide-react';
import { loadGoogleMapsScript, darkLuxuryMapStyle } from '../utils/googleMapsLoader';

// Helper custom Leaflet icons for Origin A & Destination B
const createBadgeIcon = (letter, color, bgColor) => {
  return L.divIcon({
    className: 'custom-route-badge',
    html: `
      <div style="
        width: 28px; 
        height: 28px; 
        border-radius: 50%; 
        background: ${bgColor}; 
        border: 2px solid ${color}; 
        color: #ffffff; 
        font-weight: bold; 
        font-size: 12px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        box-shadow: 0 4px 8px rgba(0,0,0,0.6);
      ">
        ${letter}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

export default function RouteMapPreview({ 
  pickupAddress, 
  pickupLat, 
  pickupLng, 
  dropoffAddress, 
  dropoffLat, 
  dropoffLng, 
  distanceMiles, 
  durationMinutes 
}) {
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function initRouteMap() {
      setLoading(true);

      const pLat = pickupLat ? Number(pickupLat) : 40.7589;
      const pLng = pickupLng ? Number(pickupLng) : -73.9851;
      const dLat = dropoffLat ? Number(dropoffLat) : 40.6413;
      const dLng = dropoffLng ? Number(dropoffLng) : -73.7781;

      // 1. Try Google Maps JS if key present
      const googleMaps = await loadGoogleMapsScript();

      if (!isMounted) return;

      if (googleMaps && mapContainerRef.current) {
        const origin = (pickupLat && pickupLng) 
          ? { lat: Number(pickupLat), lng: Number(pickupLng) } 
          : pickupAddress;

        const destination = (dropoffLat && dropoffLng) 
          ? { lat: Number(dropoffLat), lng: Number(dropoffLng) } 
          : dropoffAddress;

        const map = new googleMaps.Map(mapContainerRef.current, {
          zoom: 12,
          center: { lat: 40.7589, lng: -73.9851 },
          styles: darkLuxuryMapStyle,
          disableDefaultUI: true,
          zoomControl: true,
        });

        const directionsService = new googleMaps.DirectionsService();
        const directionsRenderer = new googleMaps.DirectionsRenderer({
          map,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#D4AF37', // Luxury Gold Route Polyline
            strokeWeight: 5,
            strokeOpacity: 0.9,
          },
        });

        directionsService.route(
          {
            origin,
            destination,
            travelMode: googleMaps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === googleMaps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
            }
          }
        );
      } else if (mapContainerRef.current) {
        // 2. Leaflet Visual Dark Map with Route Polyline
        if (leafletMapRef.current) {
          leafletMapRef.current.remove();
          leafletMapRef.current = null;
        }

        const map = L.map(mapContainerRef.current, {
          zoomControl: false,
          attributionControl: false,
        });
        leafletMapRef.current = map;

        // Dark Luxury Tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          subdomains: 'abcd',
          maxZoom: 19,
        }).addTo(map);

        // Marker A (Gold)
        const markerA = L.marker([pLat, pLng], {
          icon: createBadgeIcon('A', '#D4AF37', '#14202D'),
        }).addTo(map);

        // Marker B (Emerald)
        const markerB = L.marker([dLat, dLng], {
          icon: createBadgeIcon('B', '#10B981', '#14202D'),
        }).addTo(map);

        // Polyline connecting A & B
        const polyline = L.polyline([[pLat, pLng], [dLat, dLng]], {
          color: '#D4AF37',
          weight: 4,
          opacity: 0.85,
          dashArray: '8, 8',
        }).addTo(map);

        const bounds = L.latLngBounds([
          [pLat, pLng],
          [dLat, dLng],
        ]);
        map.fitBounds(bounds, { padding: [40, 40] });

        setTimeout(() => {
          if (leafletMapRef.current) {
            leafletMapRef.current.invalidateSize();
          }
        }, 150);
      }

      setLoading(false);
    }

    if (mapContainerRef.current) {
      initRouteMap();
    }

    return () => {
      isMounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [pickupAddress, pickupLat, pickupLng, dropoffAddress, dropoffLat, dropoffLng]);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#080E14] relative shadow-lg">
      {/* Route Info Overlay Bar */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between p-2.5 rounded-xl bg-[#080E14]/90 backdrop-blur-md border border-white/10 text-xs">
        <span className="font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5" />
          <span>Visual Route Preview</span>
        </span>
        {distanceMiles && (
          <span className="px-2.5 py-0.5 rounded-md bg-black/60 text-white font-mono text-[11px] border border-white/10">
            {distanceMiles} mi · ~{durationMinutes} min
          </span>
        )}
      </div>

      {/* Visual Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-56 sm:h-64 z-10" />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#080E14]/80 backdrop-blur-sm z-30">
          <Loader2 className="w-5 h-5 animate-spin text-gold" />
        </div>
      )}
    </div>
  );
}
