import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '/uplift/geomemory-app/geomemorymap/apps/frontend/src/modules/style/map.css';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MyLocation({ setUserLocation }) {
  useMapEvents({
    locationfound(e) {
      setUserLocation(e.latlng);
    },
  });
  return null;
}

function LocationMarker({ setNewMemory }) {
  useMapEvents({
    click(e) {
      setNewMemory(e.latlng);
    },
  });
  return null;
}

export default function Map() {
  const [newMemory, setNewMemory] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    tags: '',
    date: '',
    mediaUrl: '',
    mediaType: '',
  });
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in first!');
      return;
    }

    const body = {
      title: form.title,
      description: form.description,
      tags: form.tags,
      date: form.date,
      location: { lat: newMemory.lat, lng: newMemory.lng },
      media: [{ url: form.mediaUrl, mediaType: form.mediaType }],
    };

    try {
      const res = await fetch('http://localhost:3000/api/memories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      setResponse(JSON.stringify(result, null, 2));
      setNewMemory(null);
      setForm({
        title: '',
        description: '',
        tags: '',
        date: '',
        mediaUrl: '',
        mediaType: '',
      });
    } catch (err) {
      setResponse('Error: ' + err.message);
    }
  };

  return (
    <div className="map-page">
      <h2>Create Memory</h2>

      {newMemory && (
        <div className="memory-form">
          <h3>
            Add memory at ({newMemory.lat.toFixed(4)}, {newMemory.lng.toFixed(4)})
          </h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
            <input type="text" name="tags" placeholder="Tags" value={form.tags} onChange={handleChange} />
            <input type="date" name="date" value={form.date} onChange={handleChange} />
            <input type="url" name="mediaUrl" placeholder="Media URL" value={form.mediaUrl} onChange={handleChange} />
            <input
              type="text"
              name="mediaType"
              placeholder="Media Type (image, video)"
              value={form.mediaType}
              onChange={handleChange}
            />
            <div className="form-actions">
              <button type="submit">Save Memory</button>
              <button type="button" onClick={() => setNewMemory(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <MapContainer
        center={[14.5995, 120.9842]}
        zoom={13}
        className="map-container"
        whenCreated={(map) => {
          map.locate({ setView: true, maxZoom: 16 });
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LocationMarker setNewMemory={setNewMemory} />
        <MyLocation setUserLocation={setUserLocation} />

        {newMemory && (
          <Marker position={newMemory}>
            <Popup>New memory here</Popup>
          </Marker>
        )}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>You are here 📍</Popup>
          </Marker>
        )}
      </MapContainer>

      <pre className="response-box">{response}</pre>
    </div>
  );
}
