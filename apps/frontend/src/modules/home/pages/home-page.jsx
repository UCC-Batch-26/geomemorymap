import Hero from '@/modules/common/components/hero';
import { Link } from 'react-router';

export function HomePage() {
  return (
    <div className="grid gap-2 container grid-cols-4 mx-auto">
      <Hero />
      <h1 className="row-start-3 font-display text-6xl font-semibold">Let's Explore The World with Us</h1>
      <p className="row-start-4 min-h-0 max-h-24">
        <em className="font-semibold">Geo Memory Map</em> helps you pin down life’s special moments on a map — so your
        memories aren’t just written, they’re rooted in the places that shaped them.
      </p>
      <Link
        to={'/signup'}
        className="row-start-5 inline-flex h-12 w-50 font-display text-xl items-center justify-center rounded-md bg-[#526b5c] px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-90"
      >
        Sign Up
      </Link>
    </div>
  );
}
