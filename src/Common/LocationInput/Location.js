import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { useLocationAPi } from "./hooks/LocationApi";

const Location = ({ value, onChange, placeholder, className }) => {
  const [locationQuery, setLocationQuery] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Session token initialization
  useEffect(() => {
    if (window.crypto && window.crypto.randomUUID) {
      setSessionToken(window.crypto.randomUUID());
    } else {
      setSessionToken(String(Date.now()));
    }
  }, []);

  const { data: allLocations, isLoading: isLoadingLocations } = useLocationAPi({
    input: locationQuery,
    sessionToken: sessionToken,
  });

  const suggestions = allLocations?.suggestions || [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocationQuery(value);
    setShowDropdown(true);

    // Clear selection if user types
    if (selectedLocation) {
      setSelectedLocation(null);
      if (onChange) {
        onChange({ value: null, label: null });
      }
    }
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setLocationQuery(location.description);
    setShowDropdown(false);

    if (onChange) {
      onChange({
        value: location.place_id,
        label: location.description,
        data: location,
      });
    }
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowDropdown(true);
    }
  };

  return (
    <div className={`relative w-full`} ref={dropdownRef}>
      <InputText
        ref={inputRef}
        value={locationQuery}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder="Search location"
        className={`w-full !h-[42px] px-3 ${className}`}
      />

      {/* Custom Dropdown */}
      {showDropdown && (locationQuery || suggestions.length > 0) && (
        <div
          className={`absolute bg-white z-[999] top-[46px] left-0 right-0 border-1 border-gray-300 shadow-lg rounded-md max-h-60 overflow-y-auto`}
        >
          {isLoadingLocations ? (
            <div className="p-3 text-center text-gray-500">
              <i className="pi pi-spinner pi-spin mr-2"></i>
              Loading...
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((location, index) => (
              <div
                key={location.place_id}
                className="flex flex-col p-3 cursor-pointer hover:bg-gray-100 border-b-1 border-gray-200 last:border-b-0"
                onClick={() => handleSelectLocation(location)}
              >
                <p className="font-inter text-[14px] font-normal leading-4 m-0">
                  {location.structured_formatting?.main_text ||
                    location.description}
                </p>
                {location.structured_formatting?.secondary_text && (
                  <p className="font-inter text-[12px] font-normal leading-4 text-gray-600 m-0 mt-1">
                    {location.structured_formatting.secondary_text}
                  </p>
                )}
              </div>
            ))
          ) : locationQuery ? (
            <div className="p-3 text-center text-gray-500">
              No locations found
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Location;
