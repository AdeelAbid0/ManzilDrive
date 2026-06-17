import { useState, useRef, useEffect } from "react";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;
const DEFAULT_CENTER = { lat: 33.6844, lng: 73.0479 }; // Islamabad fallback

const loadGoogleMaps = () =>
  new Promise((resolve) => {
    if (window.google?.maps) {
      resolve();
      return;
    }
    if (document.getElementById("gmap-script")) {
      window.__gmapResolvers = window.__gmapResolvers || [];
      window.__gmapResolvers.push(resolve);
      return;
    }
    window.__gmapInit = () => {
      resolve();
      (window.__gmapResolvers || []).forEach((r) => r());
    };
    const s = document.createElement("script");
    s.id = "gmap-script";
    s.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=__gmapInit`;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  });

const MapPicker = ({ onClose, onSelect, initialPosition }) => {
  const mapDivRef = useRef(null);
  const searchInputRef = useRef(null);
  const gMapRef = useRef(null);
  const markerRef = useRef(null);
  const [pin, setPin] = useState(initialPosition || null);
  const [mapReady, setMapReady] = useState(false);

  const placeMarker = (map, lat, lng) => {
    if (markerRef.current) {
      markerRef.current.setPosition({ lat, lng });
    } else {
      markerRef.current = new window.google.maps.Marker({
        position: { lat, lng },
        map,
      });
    }
  };

  const initMap = () => {
    if (!mapDivRef.current) return;
    const mapCenter = initialPosition
      ? { lat: initialPosition.lat, lng: initialPosition.lng }
      : DEFAULT_CENTER;

    const map = new window.google.maps.Map(mapDivRef.current, {
      center: mapCenter,
      zoom: initialPosition ? 14 : 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
    gMapRef.current = map;

    if (initialPosition) {
      placeMarker(map, initialPosition.lat, initialPosition.lng);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          map.setCenter(loc);
          map.setZoom(14);
        },
        () => {},
        { timeout: 5000 },
      );
    }

    map.addListener("click", (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setPin({ lat, lng });
      placeMarker(map, lat, lng);
    });

    if (searchInputRef.current) {
      const ac = new window.google.maps.places.Autocomplete(
        searchInputRef.current,
        { fields: ["geometry", "name", "formatted_address"] },
      );
      ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        if (!place.geometry?.location) return;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setPin({ lat, lng });
        map.setCenter({ lat, lng });
        map.setZoom(16);
        placeMarker(map, lat, lng);
      });
    }

    setMapReady(true);
  };

  useEffect(() => {
    loadGoogleMaps().then(initMap);
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
      gMapRef.current = null;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-semibold text-[#394C49] text-base m-0">
            Select Location
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none bg-transparent border-0 cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        <div className="px-4 pt-3 pb-2 bg-white">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for a place e.g. Gulberg Lahore"
            className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm outline-none focus:border-[#394C49] transition-colors"
          />
        </div>

        {!mapReady && (
          <div className="flex justify-center items-center bg-white" style={{ height: 400 }}>
            <p className="text-sm text-gray-400 m-0">Loading map...</p>
          </div>
        )}

        <div
          ref={mapDivRef}
          style={{ height: 400, width: "100%", display: mapReady ? "block" : "none" }}
        />

        {pin && (
          <p className="px-4 py-2 text-xs text-gray-400 m-0 bg-white">
            Pinned: {pin.lat.toFixed(5)}, {pin.lng.toFixed(5)}
          </p>
        )}

        <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => { if (pin) { onSelect(pin); onClose(); } }}
            disabled={!pin}
            className="px-4 py-2 bg-[#394C49] text-white rounded text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer border-0"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPicker;
