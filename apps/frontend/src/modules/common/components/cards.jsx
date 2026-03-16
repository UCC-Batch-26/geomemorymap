import { useState } from 'react';

function Cards(props) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="mx-auto">
      <div className="relative w-full max-w-[200px] overflow-hidden rounded-md md:max-w-[220px] lg:max-w-[230px]">
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse rounded-md bg-neutral-300" />
        )}

        <img
          src={props.img}
          alt={props.name}
          onLoad={() => setIsLoaded(true)}
          className={`block h-56 w-full rounded-md border-[8px] border-white object-cover transition-all duration-700 ease-out md:h-64 lg:h-72 ${
            isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
          }`}
        />
      </div>
    </div>
  );
}

export default Cards;