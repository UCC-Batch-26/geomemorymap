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

function MapClickHandler({setCenter, onLocationSelect}) {
    useMapEvent('click', (e) => {
      const {lat, lng} = e.latlng;
      setCenter([lat, lng]);
      onLocationSelect?.({ lat, lng });
      toast('New location selected 📍');
    });

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

  return (
    <div className='h-full overflow-hidden rounded-2xl shadow-lg'>
      <div className="h-[320px] w-full sm:h-[420px] lg:h-full lg:min-h-[520px]">
        <MapContainer center={center} zoom={16} className="h-full w-full z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler setCenter={setCenter} onLocationSelect={onLocationSelect} />
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
                key={memory._id ?? memory.id}
                position={[memory.location.lat, memory.location.lng]}
                eventHandlers={{
                  mouseover: (e) => e.target.openPopup(),
                  mouseout: (e) => e.target.closePopup(),
                }}
              >
                <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                  <div className="w-[180px] max-w-full rounded-xl bg-[#526b5c]/95 px-3 py-3 text-white shadow-lg sm:w-[220px] md:w-[250px]">
                    <h1 className="font-display text-base font-semibold sm:text-lg">{memory.title}</h1>
                    <hr className="my-2 border-white/30" />
                    <p className="mb-2 text-xs leading-relaxed break-words sm:text-sm line-clamp-4">
                      {memory.description}
                    </p>

                    {memory.photoURL && (
                      <img
                        src={memory.photoURL}
                        alt={memory.title}
                        className="max-h-32 w-full rounded-lg object-cover"
                      />
                    )}
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
    </div>
  );
}
