import noImage from '@/assets/no-image-available.jpg';
import { useState } from 'react';
import ModalImage from 'react-modal-image';

function MemCards({ img, title, description, location, locationName }) {
  const src = img ?? noImage; // only replaces null/undefined
  const lat = typeof location?.lat === 'number' ? location.lat.toFixed(4) : null;
  const lng = typeof location?.lng === 'number' ? location.lng.toFixed(4) : null;

  return (
    <div>
      <div className="border border-white bg-white p-3 rounded-xl shadow-2xl w-100 h-[100%] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-3xl cursor-pointer">
        <div className="w-full h-48 overflow-hidden rounded-lg">
          <img
            className="w-full max-h-64 object-cover border-white bg-[#526b5c] transition-transform duration-500 ease-out hover:scale-105w-full max-h-64 object-cover border-white bg-[#526b5c] transition-transform duration-500 ease-out hover:scale-105"
            src={src}
            alt={title}
            onError={(e) => {
              if (e.currentTarget.src !== noImage) {
                e.currentTarget.onerror = null;
                e.currentTarget.src = noImage;
              }
            }}
            loading="lazy"
          />
        </div>
        <h2 className="font-display font-semibold py-2">{title}</h2>
        <p className="font-display py-2">📍{locationName} </p>
        <p className="font-display py-2">
          📍{lat}, {lng}
        </p>
        <p className="font-display py-2 overflow-y-auto max-h-24">{description}</p>
      </div>
    </div>
  );
}
export default MemCards;
