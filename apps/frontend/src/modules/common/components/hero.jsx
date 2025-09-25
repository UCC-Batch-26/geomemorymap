import heroImg from '@/assets/hero-landscape-2.jpg';

function Hero() {
  return (
    <div className="col-span-4 row-span-2 h-100">
      <img
        src={heroImg}
        alt="hero-landscape"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
}

export default Hero;
