import Hero from '@/modules/common/components/hero';
import { Link } from 'react-router';
import Cards from '@/modules/common/components/cards';
import cards from '../hooks/cards';
import MemoryFormPage from './memory-form-page';

function createCards(card) {
  return <Cards key={card.id} img={card.imgURL} name={card.name} />;
}

export function HomePage() {
  const token = localStorage.getItem('token');

  return (
    <div className="bg-[#f3f1ef]">
      <div className="container mx-auto min-h-[calc(100vh-96px)] px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-12 lg:space-y-16">
          <Hero />

          <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-12">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <h1 className="pb-4 font-display text-4xl font-bold leading-none sm:text-5xl md:text-6xl">
                Let&apos;s Explore <br className="hidden sm:block" />
                The World
              </h1>

              <p className="mx-auto max-w-md text-base leading-8 text-neutral-800 sm:text-lg lg:mx-0">
                <em className="font-semibold">Geo Memory Map</em> helps you pin down life&apos;s
                special moments on a map — so your memories aren&apos;t just written, they&apos;re
                rooted in the places that shaped them.
              </p>

              <div className="mt-8 flex justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="inline-flex min-w-[170px] items-center justify-center rounded-md bg-[#526b5c] px-8 py-4 font-display text-lg font-medium text-white shadow-md transition hover:opacity-95 active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
              <div className="md:translate-y-4">{createCards(cards[0])}</div>
              <div>{createCards(cards[1])}</div>
              <div className="md:-translate-y-4">{createCards(cards[2])}</div>
            </div>
          </section>
        </div>
      </div>

      {token ? (
        <div className="mt-10 bg-[#526b5c] py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <MemoryFormPage />
          </div>
        </div>
      ) : null}
    </div>
  );
}