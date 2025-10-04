import noImage from '@/assets/no-image-available.jpg';

function MemCards({ img, title, description }) {
  const src = img ?? noImage; // only replaces null/undefined
  return (
    <div>
      <img
        className="p-5 h-80 w-100 border-white border-[10px] rounded-md object-cover bg-[#526b5c]"
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
      <h2 className="font-display font-semibold">{title}</h2>
      <p className="font-display">{description}</p>
    </div>
  );
}
export default MemCards;