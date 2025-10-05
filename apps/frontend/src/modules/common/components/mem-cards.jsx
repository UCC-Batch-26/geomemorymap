import noImage from '@/assets/no-image-available.jpg';

function MemCards({ img, title, description, location, locationName }) {
  const src = img ?? noImage; // only replaces null/undefined
  const lat = typeof location?.lat === 'number' ? location.lat.toFixed(4) : null;
  const lng = typeof location?.lng === 'number' ? location.lng.toFixed(4) : null;

  return (
    <div>
      <div className="border border-white bg-white p-3 rounded-xl shadow-2xl w-70 h-full">
        <img
          className="h-80 w-auto border-white  object-cover bg-[#526b5c]"
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
