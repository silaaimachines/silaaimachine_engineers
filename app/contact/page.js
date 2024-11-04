"use client";

import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';

const center = {
    lat: 22.223337,
    lng: 84.866342,
};

const StoreLocation = () => {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const { isLoaded } = useJsApiLoader(
        googleMapsApiKey
            ? {
                  id: 'google-map-script',
                  googleMapsApiKey: googleMapsApiKey,
              }
            : null
    );

    const [map, setMap] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);

    const markers = [
        {
            position: { lat: 22.223337, lng: 84.866342 },
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
        <div>
            <div>
                <h1 className="text-5xl font-semibold m-5 text-center ">Contact Us</h1>
            </div>
            <div className="p-4 flex flex-col md:flex-row items-center md:items-start justify-center space-y-4 md:space-y-0 md:space-x-8">

                {/* Map Column */}
                <div className="w-full md:w-[70%]">
                    <GoogleMap
                        mapContainerClassName="w-full h-96 sm:h-[400px] md:h-[500px] lg:h-[600px]"
                        center={center}
                        zoom={18}
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
                <div className="w-full md:w-[30%] p-4 rounded-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Contact Information</h2>

                    <table className="w-full table-auto">
                        <tbody>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Phone:</td>
                                <td className="p-2">+91-9437782677</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Email:</td>
                                <td className="p-2">satya.silaaimachines@gmail.com</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">WhatsApp:</td>
                                <td className="p-2">+91-9437782677</td>
                            </tr>
                            <tr>
                                <td className="p-2 font-semibold">Address:</td>
                                <td className="p-2">Bisra Rd, Near Sani Mandir, Rourkela, Odisha 769001</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex justify-center items-center mt-4">
                        <Button onClick={openGoogleMaps}>
                            Get Directions
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default StoreLocation;