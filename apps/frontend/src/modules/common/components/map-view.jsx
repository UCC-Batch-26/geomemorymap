import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import toast from 'react-hot-toast';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom());
    }
  }, [center, map]);

  return null;
}

export default function MapView({ _memories = [], onLocationSelect }) {
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
        const toastId = toast.loading('Fetching your location...');

        const timer = setTimeout(() => {
          toast('Location request timed out', { id: toastId, icon: 'ℹ️' });
        }, 10000);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            clearTimeout(timer);
            const { latitude, longitude } = position.coords;
            setCenter([latitude, longitude]); // update center
            onLocationSelect?.({ lat: latitude, lng: longitude });

            toast.success('Location found', { id: toastId, icon: '🧭' });
          },
          (error) => {
            clearTimeout(timer);
            console.error('Geolocation error:', error);
            toast.error('Unable to fetch your location ❌', { id: toastId });
            // keep fallback center if error
          },
          { timeout: 10000 },
        );
      }
    }
  }, [onLocationSelect]);

  // Handle drag end
  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (marker != null) {
      const position = marker.getLatLng();
      setCenter([position.lat, position.lng]);
      onLocationSelect?.({ lat: position.lat, lng: position.lng });
      toast('Marker moved to new position 📍');
    }
  };

  const MapClickHandler = () => {
    useMapEvent('click', (e) => {
      const { lat, lng } = e.latlng;
      setCenter([lat, lng]);
      onLocationSelect?.({ lat, lng });
      toast('New location selected📍');
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
        <RecenterMap center={center} />
        {/* Draggable marker for user location */}
        <Marker
          position={center}
          draggable={true}
          icon={greenIcon}
          eventHandlers={{ dragend: handleDragEnd }}
          ref={markerRef}
        >
          <Popup>Drag me to adjust!</Popup>
        </Marker>

        {/* Memory markers */}
        {_memories
          .filter((memory) => memory.location && memory.location.lat && memory.location.lng)
          .map((memory) => (
            <Marker
              key={memory._id}
              position={[memory.location.lat, memory.location.lng]}
              eventHandlers={{
                mouseover: (e) => e.target.openPopup(),
                mouseout: (e) => e.target.closePopup(),
              }}
            >
              <Tooltip>
                <div
                  className="
    bg-[#526b5c]/90 text-white font-display
    px-4 py-3 rounded-xl shadow-lg
    transition-transform duration-300 ease-in-out
    hover:scale-105 hover:bg-[#6b8b74]"
                >
                  <h1 className="text-2xl font-semibold pt-2">{memory.title}</h1>
                  <hr className="flex h-px my-2 bg-white/40 border-0 m-auto" />
                  <p className="text-lg text-center mb-2">{memory.description}</p>
                  <div className="">
                    {memory.photoURL && (
                      <img
                        src={memory.photoURL}
                        alt={memory.title}
                        className="m-auto h-[50%]  object-contain rounded-2xl"
                      />
                    )}
                  </div>
                </div>
              </Tooltip>
            </Marker>
          ))}
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
