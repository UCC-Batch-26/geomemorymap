import { useState } from 'react';
import heroImg from '@/assets/hero-landscape-2.jpg';

function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full overflow-hidden">
      {!isLoaded && (
        <div className="h-[220px] w-full animate-pulse bg-neutral-300 sm:h-[280px] md:h-[340px] lg:h-[420px]" />
      )}

      <img
        src={heroImg}
        alt="hero-landscape"
        onLoad={() => setIsLoaded(true)}
        className={`block w-full object-cover object-center transition-all duration-700 ease-out sm:h-[280px] md:h-[340px] lg:h-[420px] ${
          isLoaded ? 'h-[220px] translate-y-0 opacity-100' : 'absolute h-[220px] -translate-y-8 opacity-0'
        }`}
      />
    </div>
  );
}

export default Hero;
