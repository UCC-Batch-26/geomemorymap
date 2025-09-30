import Hero from '@/modules/common/components/hero';
import { Link } from 'react-router';
import Cards from '@/modules/common/components/cards';
import cards from '../hooks/cards';
import MemoryFormPage from './memory-form-page';

function createCards(card) {
  return <Cards key={card.id} img={card.imgURL} name={card.name} />;
}

export function HomePage() {
  return (
    <div>
      <div className="grid container grid-cols-4 m-auto h-screen">
        <Hero />
        <div>
          <h1 className="font-display text-6xl font-bold pb-5">Let's Explore The World</h1>
          <p className="min-h-0 max-h-24">
            <em className="font-semibold">Geo Memory Map</em> helps you pin down life’s special moments on a map — so
            your memories aren’t just written, they’re rooted in the places that shaped them.
          </p>
        </div>
        <Link
          to={'/signup'}
          className="row-start-4 inline-flex h-12 w-50 font-display text-xl items-center justify-center rounded-md bg-[#526b5c] px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-90"
        >
          Sign Up
        </Link>
        {cards.map(createCards)}
      </div>

      <div className="col-span-4 row-span-2">
        <MemoryFormPage />
      </div>
    </div>
  );
}
