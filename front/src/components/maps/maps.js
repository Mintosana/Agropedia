import React from "react";
import { useState} from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Maps(){

  const libraries = useState(["places"]);
  const mapContainerStyle = {
    width: "65vw",
    height: "45vh",
    borderRadius: "8px",
  };
  const center = {
    lat: 43.9014,
    lng: 24.6149,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyC4ZzPVR1ikmjgmbuv3vLGzPXeajDY62sg",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={16}
      center={center}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};