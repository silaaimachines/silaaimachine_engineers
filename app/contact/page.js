"use client";

import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const center = {
  lat: 22.223337,
  lng: 84.866342,
};

const StoreLocation = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const markers = [
    {
      position: { lat: 22.223337, lng: 84.866342 },
      title: 'Marker 1',
      content: 'This is Marker 1.',
    },
  ];

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${center.lat},${center.lng}`;
    window.open(url, '_blank');
  };

  return isLoaded ? (
    <div className="p-4 flex flex-col md:flex-row items-center md:items-start justify-center space-y-4 md:space-y-0 md:space-x-8">
      {/* Map Column */}
      <div className="w-full md:w-[70%]">
        <GoogleMap
          mapContainerClassName="w-full h-96 sm:h-[400px] md:h-[500px] lg:h-[600px]"
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              onClick={() => {
                handleMarkerClick(marker);
              }}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => {
                setSelectedMarker(null);
              }}
            >
              <div>
                <h2>{selectedMarker.title}</h2>
                <p>{selectedMarker.content}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      {/* Contact Information Column */}
      <div className="w-full md:w-[30%] bg-white shadow-lg p-6 rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p className="mb-2"><strong>Phone:</strong> +91-9437782677</p>
        <p className="mb-2"><strong>Email:</strong> satya.silaaimachines@gmail.com</p>
        <p className="mb-2"><strong>WhatsApp:</strong> +91-9437782677</p>
        <p className="mb-4"><strong>Address:</strong> Bisra Rd, Near Sani Mandir, Rourkela, Odisha 769001</p>
        <button
          onClick={openGoogleMaps}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Get Directions
        </button>
      </div>
    </div>
  ) : null;
};

export default StoreLocation;
