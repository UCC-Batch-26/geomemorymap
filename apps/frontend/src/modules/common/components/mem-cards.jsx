import noImage from '@/assets/no-image-available.jpg';
import { MapPin, X } from 'lucide-react';

function MemCards({ img, title, description, location, locationName, onDelete }) {
  const src = img ?? noImage; // only replaces null/undefined
  const lat = typeof location?.lat === 'number' ? location.lat.toFixed(4) : null;
  const lng = typeof location?.lng === 'number' ? location.lng.toFixed(4) : null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/70 bg-white p-3 shadow-xl transition duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl sm:p-4">
      <div className="h-50 w-full overflow-hidden rounded-xl bg-[#526b5c] sm:h-48">
        <img
            className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
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
      <div className="mt-3 space-y-2">
        <h2 className="font-display text-lg font-semibold leading-tight text-gray-900 sm:text-xl line-clamp-2">
          {title}
        </h2>

        {locationName && (
          <p className="flex items-center gap-1 font-display text-sm text-gray-700 sm:text-base break-words">
            <MapPin size={16} className="text-[#526b5c]" />
            {locationName}
          </p>
        )}

        {lat && lng && (
          <p className="font-display text-xs text-gray-500 sm:text-sm break-all">
            {lat}, {lng}
          </p>
        )}

        <p className="font-display text-sm leading-relaxed text-gray-700 sm:text-base line-clamp-4">
          {description}
        </p>

        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm backdrop-blur transition hover:bg-[#EF6B48] hover:text-white  cursor-pointer  "
          >
            <X size={17} />
          </button>
        )}
      </div>
    </div>
    
  );
}
export default MemCards;
