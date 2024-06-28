import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({Lat= 51.505,Long = -0.09,Heigth = 200, Width = 400}) => {
  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  console.log(Lat,Long)

  return (
    <MapContainer center={[Lat, Long]} zoom={13} style={{ height: `${Heigth}px`, width: `${Width}px`, borderRadius: "20px", margin: "25px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[Lat, Long]} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;