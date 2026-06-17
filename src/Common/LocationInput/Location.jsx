import { useState, useEffect } from "react";
import MapPicker from "./MapPicker";
import { getAddressFromCoords } from "../../Utils/locationUtils";

const Location = ({ value, onChange, placeholder, className }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [label, setLabel] = useState(value?.label || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLabel(value?.label || "");
  }, [value?.label]);

  const handleMapSelect = async ({ lat, lng }) => {
    setIsLoading(true);
    try {
      const address = await getAddressFromCoords(lat, lng);
      setLabel(address);
      if (onChange) {
        onChange({ lat, lng, label: address });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const initialPosition =
    value?.lat && value?.lng ? { lat: value.lat, lng: value.lng } : null;

  return (
    <>
      <div
        className={`w-full flex items-center cursor-pointer h-[42px] border border-gray-300 rounded px-3 text-sm ${className || ""}`}
        onClick={() => !isLoading && setIsMapOpen(true)}
      >
        {isLoading ? (
          <span className="flex items-center gap-2 text-gray-400">
            <i className="pi pi-spinner pi-spin text-xs" />
            <span>Fetching address...</span>
          </span>
        ) : (
          <>
            <span className={`flex-1 truncate ${label ? "text-[#495057]" : "text-gray-400"}`}>
              {label || placeholder || "Search location"}
            </span>
            <i className="pi pi-map-marker text-gray-400 text-xs" />
          </>
        )}
      </div>

      {isMapOpen && (
        <MapPicker
          onClose={() => setIsMapOpen(false)}
          onSelect={handleMapSelect}
          initialPosition={initialPosition}
        />
      )}
    </>
  );
};

export default Location;
