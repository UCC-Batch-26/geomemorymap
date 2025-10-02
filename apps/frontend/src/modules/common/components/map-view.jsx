import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import toast from 'react-hot-toast';

function RecenterMap({center}) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom())
    }
  }, [center, map]);
  
  return null;
}

export default function MapView({ onLocationSelect }) {
  // Default center (Manila) as fallback
  const [center, setCenter] = useState([14.5995, 120.9842]);

  // Store marker reference
  const markerRef = useRef(null);
  const requestedLocation = useRef(false);

  //current user location
  useEffect(() => {
    if (!requestedLocation.current) {
      requestedLocation.current = true;

      if (navigator.geolocation) {
        const toastId = toast.loading("Fetching your location...");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCenter([latitude, longitude]); // update center
            onLocationSelect?.({ lat: latitude, lng: longitude });

            toast.dismiss(toastId);
            toast.success("Location found", {id: toastId, icon: "🧭"});
          },
          (error) => {
            console.error('Geolocation error:', error);
            toast.error("Unable to fetch your location ❌", {id: toastId});
            // keep fallback center if error
          },
        );
      }
    }
  }, []);

  // Handle drag end
  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (marker != null) {
      const position = marker.getLatLng();
      setCenter([position.lat, position.lng]);
      onLocationSelect?.({ lat: position.lat, lng: position.lng });
      toast("Marker moved to new position 📍")
    }
  };

  const MapClickHandler = () => {
    useMapEvent('click', (e) => {
      const { lat, lng } = e.latlng;
      setCenter([lat, lng]);
      onLocationSelect?.({ lat, lng });
      toast("Map clicked: moved marker 📍");
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
        <RecenterMap center={center}/>
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
