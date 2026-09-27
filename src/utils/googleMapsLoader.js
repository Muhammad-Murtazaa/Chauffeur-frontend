/**
 * Google Maps Loader & Geolocation Utilities
 */

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

let scriptLoadingPromise = null;

export const darkLuxuryMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0b131c' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#080e14' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8fa0b5' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#e0a922' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7a8c9e' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#0e1d2b' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5b738a' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1a2736' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#101c29' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#97a8bc' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#273c52' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1b2938' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#e0a922' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#162330' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#e0a922' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#04070a' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#3d5269' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#04070a' }],
  },
];

/**
 * Dynamically load Google Maps JavaScript API with places & geometry
 */
export function loadGoogleMapsScript() {
  if (typeof window !== 'undefined' && window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (scriptLoadingPromise) {
    return scriptLoadingPromise;
  }

  scriptLoadingPromise = new Promise((resolve, reject) => {
    if (!GOOGLE_MAPS_API_KEY) {
      // If no API key configured, resolve null so fallback interactive UI renders gracefully
      console.warn('VITE_GOOGLE_MAPS_API_KEY is not set. Visual interactive fallback will be used.');
      resolve(null);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google?.maps) {
        resolve(window.google.maps);
      } else {
        resolve(null);
      }
    };

    script.onerror = (err) => {
      console.error('Failed to load Google Maps script:', err);
      resolve(null);
    };

    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

/**
 * Get device GPS current location and reverse geocode
 */
export async function getCurrentGPSLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const address = await reverseGeocodeLocation(lat, lng);
          resolve({
            lat,
            lng,
            address: address || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          });
        } catch (err) {
          resolve({
            lat,
            lng,
            address: `Current Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
          });
        }
      },
      (error) => {
        let msg = 'Unable to retrieve current location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission denied. Please allow location access in your browser.';
        }
        reject(new Error(msg));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
}

/**
 * Reverse Geocode coordinates to human-readable address
 */
export async function reverseGeocodeLocation(lat, lng) {
  // Try Google Geocoder first if loaded
  if (window.google?.maps?.Geocoder) {
    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      if (response.results?.[0]) {
        return response.results[0].formatted_address;
      }
    } catch (e) {
      console.warn('Google reverse geocode error, falling back to OSM:', e);
    }
  }

  // Fallback: OpenStreetMap Nominatim reverse geocoder
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    if (res.ok) {
      const data = await res.json();
      if (data.display_name) {
        return data.display_name;
      }
    }
  } catch (err) {
    console.error('Reverse geocode fallback failed:', err);
  }

  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

/**
 * Geocode text query to coordinates and formatted address
 */
export async function geocodeAddressQuery(query) {
  if (!query || !query.trim()) return null;

  // Try Google Geocoder first
  if (window.google?.maps?.Geocoder) {
    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ address: query });
      if (response.results?.[0]) {
        const result = response.results[0];
        return {
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
          formattedAddress: result.formatted_address,
          placeId: result.place_id,
        };
      }
    } catch (e) {
      console.warn('Google geocode error:', e);
    }
  }

  // Fallback Geocoding with OSM Nominatim
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    if (res.ok) {
      const data = await res.json();
      if (data?.[0]) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          formattedAddress: data[0].display_name,
          placeId: data[0].place_id ? String(data[0].place_id) : undefined,
        };
      }
    }
  } catch (err) {
    console.error('Geocode address fallback error:', err);
  }

  return null;
}

/**
 * Curated Luxury NYC / Metro Airport & Landmark Catalog
 */
export const curatedLandmarks = [
  {
    mainText: 'John F. Kennedy International Airport (JFK)',
    secondaryText: 'Queens, NY 11430, USA',
    fullAddress: 'John F. Kennedy International Airport (JFK), Queens, NY 11430',
    lat: 40.6413,
    lng: -73.7781,
    category: 'AIRPORT',
  },
  {
    mainText: 'JFK Terminal 4 (International Arrivals)',
    secondaryText: 'JFK Access Rd, Queens, NY 11430',
    fullAddress: 'JFK Terminal 4, Queens, NY 11430',
    lat: 40.6437,
    lng: -73.7820,
    category: 'AIRPORT',
  },
  {
    mainText: 'JFK Terminal 8 (American Airlines / BA)',
    secondaryText: 'Queens, NY 11430',
    fullAddress: 'JFK Terminal 8, Queens, NY 11430',
    lat: 40.6465,
    lng: -73.7915,
    category: 'AIRPORT',
  },
  {
    mainText: 'LaGuardia Airport (LGA) - All Terminals',
    secondaryText: 'Queens, NY 11371, USA',
    fullAddress: 'LaGuardia Airport (LGA), Queens, NY 11371',
    lat: 40.7769,
    lng: -73.8740,
    category: 'AIRPORT',
  },
  {
    mainText: 'LGA Terminal B (Main Terminal)',
    secondaryText: 'LaGuardia Airport, Queens, NY 11371',
    fullAddress: 'LaGuardia Terminal B, Queens, NY 11371',
    lat: 40.7745,
    lng: -73.8719,
    category: 'AIRPORT',
  },
  {
    mainText: 'Newark Liberty International Airport (EWR)',
    secondaryText: '3 Brewster Rd, Newark, NJ 07114',
    fullAddress: 'Newark Liberty International Airport (EWR), Newark, NJ 07114',
    lat: 40.6895,
    lng: -74.1745,
    category: 'AIRPORT',
  },
  {
    mainText: 'Teterboro Airport (TEB) Private Jet Terminal',
    secondaryText: 'Signature Flight Support, Teterboro, NJ 07608',
    fullAddress: 'Teterboro Airport (TEB), 111 Industrial Ave, Teterboro, NJ 07608',
    lat: 40.8501,
    lng: -74.0608,
    category: 'AIRPORT',
  },
  {
    mainText: 'Westchester County Airport (HPN)',
    secondaryText: '240 Airport Rd, White Plains, NY 10604',
    fullAddress: 'Westchester County Airport (HPN), White Plains, NY 10604',
    lat: 41.0669,
    lng: -73.7076,
    category: 'AIRPORT',
  },
  {
    mainText: 'The Plaza Hotel',
    secondaryText: '767 5th Ave, New York, NY 10019',
    fullAddress: 'The Plaza Hotel, 767 5th Ave, New York, NY 10019',
    lat: 40.7645,
    lng: -73.9745,
    category: 'HOTEL',
  },
  {
    mainText: 'The St. Regis New York',
    secondaryText: 'Two E 55th St, New York, NY 10022',
    fullAddress: 'The St. Regis New York, 2 E 55th St, New York, NY 10022',
    lat: 40.7613,
    lng: -73.9748,
    category: 'HOTEL',
  },
  {
    mainText: 'The Ritz-Carlton New York, Central Park',
    secondaryText: '50 Central Park S, New York, NY 10019',
    fullAddress: 'The Ritz-Carlton Central Park, 50 Central Park S, New York, NY 10019',
    lat: 40.7656,
    lng: -73.9765,
    category: 'HOTEL',
  },
  {
    mainText: 'The Carlyle, A Rosewood Hotel',
    secondaryText: '35 E 76th St, New York, NY 10021',
    fullAddress: 'The Carlyle, 35 E 76th St, New York, NY 10021',
    lat: 40.7744,
    lng: -73.9634,
    category: 'HOTEL',
  },
  {
    mainText: 'One World Trade Center (Freedom Tower)',
    secondaryText: '285 Fulton St, New York, NY 10007',
    fullAddress: 'One World Trade Center, 285 Fulton St, New York, NY 10007',
    lat: 40.7127,
    lng: -74.0134,
    category: 'LANDMARK',
  },
  {
    mainText: 'Empire State Building',
    secondaryText: '20 W 34th St, New York, NY 10001',
    fullAddress: 'Empire State Building, 20 W 34th St, New York, NY 10001',
    lat: 40.7484,
    lng: -73.9857,
    category: 'LANDMARK',
  },
  {
    mainText: 'Times Square & Theater District',
    secondaryText: 'Broadway & 7th Ave, New York, NY 10036',
    fullAddress: 'Times Square, Manhattan, NY 10036',
    lat: 40.7580,
    lng: -73.9855,
    category: 'LANDMARK',
  },
  {
    mainText: 'Grand Central Terminal',
    secondaryText: '89 E 42nd St, New York, NY 10017',
    fullAddress: 'Grand Central Terminal, 89 E 42nd St, New York, NY 10017',
    lat: 40.7527,
    lng: -73.9772,
    category: 'STATION',
  },
  {
    mainText: 'Moynihan Train Hall (Penn Station)',
    secondaryText: '421 8th Ave, New York, NY 10001',
    fullAddress: 'Moynihan Train Hall, 421 8th Ave, New York, NY 10001',
    lat: 40.7513,
    lng: -73.9967,
    category: 'STATION',
  },
  {
    mainText: 'DUMBO Brooklyn Waterfront',
    secondaryText: 'Water St & Washington St, Brooklyn, NY 11201',
    fullAddress: 'DUMBO, Brooklyn, NY 11201',
    lat: 40.7033,
    lng: -73.9893,
    category: 'LANDMARK',
  },
  {
    mainText: 'Barclays Center Arena',
    secondaryText: '620 Atlantic Ave, Brooklyn, NY 11217',
    fullAddress: 'Barclays Center, 620 Atlantic Ave, Brooklyn, NY 11217',
    lat: 40.6826,
    lng: -73.9754,
    category: 'LANDMARK',
  },
  {
    mainText: 'Yankee Stadium',
    secondaryText: '1 E 161 St, Bronx, NY 10451',
    fullAddress: 'Yankee Stadium, 1 E 161 St, Bronx, NY 10451',
    lat: 40.8296,
    lng: -73.9262,
    category: 'LANDMARK',
  },
  {
    mainText: 'Citi Field Arena',
    secondaryText: '41 Seaver Way, Queens, NY 11368',
    fullAddress: 'Citi Field, 41 Seaver Way, Queens, NY 11368',
    lat: 40.7571,
    lng: -73.8458,
    category: 'LANDMARK',
  },
  {
    mainText: 'Southampton Main Village',
    secondaryText: 'Main St, Southampton, NY 11968 (The Hamptons)',
    fullAddress: 'Southampton, NY 11968',
    lat: 40.8843,
    lng: -72.3898,
    category: 'LANDMARK',
  },
  {
    mainText: 'Philadelphia 30th Street Station',
    secondaryText: '2955 Market St, Philadelphia, PA 19104',
    fullAddress: '30th Street Station, Philadelphia, PA 19104',
    lat: 40.7128,
    lng: -74.006,
    category: 'STATION',
  },
];

/**
 * Fetch address recommendations/predictions as user types
 */
export async function fetchAddressPredictions(query) {
  if (!query || query.trim().length < 2) return [];

  const cleanQuery = query.trim().toLowerCase();

  // 1. Check if Google Places AutocompleteService is loaded
  if (window.google?.maps?.places?.AutocompleteService) {
    try {
      const service = new window.google.maps.places.AutocompleteService();
      const predictions = await new Promise((resolve) => {
        service.getPlacePredictions(
          {
            input: query,
            types: ['geocode', 'establishment'],
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
              resolve(results);
            } else {
              resolve([]);
            }
          }
        );
      });

      if (predictions && predictions.length > 0) {
        return predictions.slice(0, 6).map((p) => ({
          placeId: p.place_id,
          mainText: p.structured_formatting?.main_text || p.description,
          secondaryText: p.structured_formatting?.secondary_text || '',
          fullAddress: p.description,
          category: p.types?.includes('airport')
            ? 'AIRPORT'
            : p.types?.includes('lodging')
            ? 'HOTEL'
            : p.types?.includes('transit_station')
            ? 'STATION'
            : 'ADDRESS',
        }));
      }
    } catch (err) {
      console.warn('Google Places Autocomplete error, checking curated and OSM:', err);
    }
  }

  // 2. Curated Landmarks Match (Immediate, instant response for NYC/Metro)
  const matchingLandmarks = curatedLandmarks
    .filter(
      (l) =>
        l.mainText.toLowerCase().includes(cleanQuery) ||
        l.secondaryText.toLowerCase().includes(cleanQuery) ||
        l.fullAddress.toLowerCase().includes(cleanQuery)
    )
    .slice(0, 5);

  // 3. Fallback Live OSM Nominatim Search
  let osmResults = [];
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    if (res.ok) {
      const data = await res.json();
      osmResults = data.map((item) => {
        const parts = item.display_name.split(',');
        const main = parts[0]?.trim() || item.name;
        const secondary = parts.slice(1, 4).join(',').trim();
        const type = item.type === 'aerodrome' || item.class === 'aeroway'
          ? 'AIRPORT'
          : item.type === 'hotel' || item.type === 'motel'
          ? 'HOTEL'
          : item.type === 'station' || item.type === 'halt'
          ? 'STATION'
          : 'ADDRESS';

        return {
          placeId: String(item.place_id),
          mainText: main,
          secondaryText: secondary,
          fullAddress: item.display_name,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          category: type,
        };
      });
    }
  } catch (e) {
    // Ignore network error on fast typing
  }

  // Combine curated matches with OSM results without duplicates
  const combined = [...matchingLandmarks];
  for (const item of osmResults) {
    if (!combined.some((c) => c.mainText.toLowerCase() === item.mainText.toLowerCase())) {
      combined.push(item);
    }
  }

  return combined.slice(0, 6);
}

