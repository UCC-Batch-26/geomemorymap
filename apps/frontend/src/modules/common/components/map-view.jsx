import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ onLocationSelect }) {
  // Default center (Manila) as fallback
  const [center, setCenter] = useState([14.5995, 120.9842]);

  // Store marker reference
  const markerRef = useRef(null);

  //current user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter([latitude, longitude]); // update center
          onLocationSelect?.({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Geolocation error:', error);
          // keep fallback center if error
        },
      );
    }
  }, []);

  // Handle drag end
  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (marker != null) {
      const pos = marker.getLatLng;
      setCenter(marker.getLatLng());
      onLocationSelect?.({ lat: pos.lat, lng: pos.lng });
    }
  };

  const MapClickHandler = () => {
    useMapEvent('click', (e) => {
      const { lat, lng } = e.latlng;
      setCenter([lat, lng]);
      onLocationSelect?.({ lat, lng });
    });
    return null;
  };

  return (
    <div id="map">
      <MapContainer center={center} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />

        {/* Draggable marker for user location */}
        <Marker position={center} draggable={true} eventHandlers={{ dragend: handleDragEnd }} ref={markerRef}>
          <Popup>Drag me to adjust :round_pushpin:</Popup>
        </Marker>

        {/* Example fixed markers
        <Marker position={[14.6925, 120.9699]}>
          <Popup>Hello from Valenzuela! :flag_ph:</Popup>
        </Marker>
        <Marker position={[18.351, 121.5142]}>
          <Popup>Hello from Ballesteros! :flag_ph:</Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
}
