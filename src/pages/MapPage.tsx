import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { stores } from '@/data/stores';
import { useNavigate } from 'react-router-dom';
import { LocationHeader } from '@/components/LocationHeader';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Ícones Customizados
const userIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/markers/marker-icon-2x-blue.png",
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const storeIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/markers/marker-icon-2x-green.png",
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
    map.invalidateSize();
  }, [lat, lng, map]);
  return null;
}

const MapPage = () => {
  const navigate = useNavigate();
  // Centralizado em Santos
  const [position, setPosition] = useState<[number, number]>([-23.9630, -46.3320]);
  const [loadingLoc, setLoadingLoc] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setLoadingLoc(false);
        },
        (err) => {
          console.error("Usando localização padrão:", err);
          setLoadingLoc(false);
        }
      );
    } else {
      setLoadingLoc(false);
    }
  }, []);

  const handleStoreClick = (storeId: number) => {
    navigate(`/store/${storeId}`);
  };

  return (
    <div className="flex flex-col h-[100vh] w-full bg-gray-50 relative">

      {/* Header Flutuante (com pl-16 para não bater no botão do menu) */}
      <div className="absolute top-0 left-0 right-0 z-[400] px-4 pt-4 pb-2 pointer-events-none pl-16">
        <div className="pointer-events-auto bg-white/95 backdrop-blur shadow-md rounded-xl">
          <LocationHeader onSearch={(q) => console.log(q)} />
        </div>
      </div>

      {/* Mapa */}
      <div className="flex-1 w-full h-full relative z-0">
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <RecenterMap lat={position[0]} lng={position[1]} />

          {!loadingLoc && (
            <Marker position={position} icon={userIcon}>
              <Popup>Você está aqui</Popup>
            </Marker>
          )}

          {stores.map((store) => (
            <Marker
              key={store.id}
              position={[store.lat, store.lng]}
              icon={storeIcon}
              eventHandlers={{
                click: () => handleStoreClick(store.id),
              }}
            >
              <Popup>
                <div
                  onClick={() => handleStoreClick(store.id)}
                  className="text-center cursor-pointer min-w-[140px]"
                >
                  <strong className="block text-blue-700 text-sm mb-1">{store.name}</strong>
                  <span className="text-xs text-gray-500 block mb-2">{store.category}</span>
                  <button className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md w-full font-medium">
                    Ver Loja
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;