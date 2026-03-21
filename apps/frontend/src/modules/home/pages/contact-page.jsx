import bg from '@/assets/geo-memory-map-bg.png';

function ContactPage() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-[length:900px]"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      <div className="absolute inset-0 bg-[#526b5c]/75" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:gap-28 lg:px-10">
        <div className="flex max-w-4xl flex-col gap-8 text-left">
          <h1 className="font-display w-fit rounded-r-2xl bg-gray-800/40 py-2 pl-6 pr-6 text-4xl font-semibold text-white sm:pl-8 sm:pr-8 sm:text-5xl lg:pl-10 lg:pr-10 lg:text-7xl">
            Contact Us
          </h1>

          <p className="text-base font-medium text-[#f2f0ef] sm:ml-6 sm:text-lg lg:ml-10">
            We’d love to hear from you.
          </p>

          <div className="max-w-3xl space-y-4 sm:ml-6 sm:space-y-5 lg:ml-10 lg:space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Get in touch</h2>
              <p className="mt-3 font-display text-xl font-bold text-gray-100 sm:mt-4 sm:text-2xl">Email:</p>
            </div>

            <ul className="font-display space-y-3 text-base leading-relaxed text-gray-100 sm:text-lg lg:text-xl">
              <li className="break-words">Dean Harley Pal — paldeanharley@gmail.com</li>
              <li className="break-words">Nerbert Bulaquena — nerbertb@gmail.com</li>
              <li className="break-words">Peter John Galeno — pedrojuana08@gmail.com</li>
              <li className="break-words">Nathaniel Dacasin — nathandacasin01@gmail.com</li>
            </ul>

            <p className="font-display max-w-2xl text-base leading-relaxed text-gray-200 sm:text-lg">
              Reach out for questions, feedback, or collaboration about Geo Memory Map.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <form
            action="submit"
            method="post"
            className="w-full max-w-md rounded-3xl bg-gray-800/20 px-6 py-8 shadow-xl backdrop-blur-sm sm:px-8 sm:py-10 lg:w-[550px] lg:max-w-none lg:px-10 lg:py-10"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="w-full rounded-xl border border-white/15 bg-white/85 px-4 py-3 font-display text-[#24342b] outline-none placeholder:text-gray-500 focus:border-white/30"
              />

              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full rounded-xl border border-white/15 bg-white/85 px-4 py-3 font-display text-[#24342b] outline-none placeholder:text-gray-500 focus:border-white/30"
              />
            </div>

            <textarea
              id="message"
              placeholder="Message"
              className="mt-5 h-44 w-full rounded-2xl border border-white/15 bg-white/90 px-4 py-4 font-display text-[#24342b] outline-none placeholder:text-gray-500 focus:border-white/30 sm:h-52 lg:h-56"
            ></textarea>

            <button
              type="submit"
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#526b5c] px-6 font-display text-base font-medium text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 sm:h-14 sm:text-lg md:w-52 xl:text-xl"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;