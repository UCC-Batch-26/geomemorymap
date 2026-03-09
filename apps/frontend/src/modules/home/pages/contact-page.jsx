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

      <div className="relative z-10 grid min-h-screen items-start px-16 pt-44 pb-16 lg:grid-cols-[1.6fr_1fr] gap-20">
        <div className="flex flex-col gap-8 text-left max-w-4xl">
          <h1 className="font-display md:text-5xl lg:text-7xl font-semibold text-white bg-gray-800/40 w-fit pr-10 rounded-r-2xl pl-10 py-2">
            Contact Us
          </h1>

          <p className="ml-10 text-[#f2f0ef] text-lg font-medium">We’d love to hear from you.</p>

          <div className="ml-10 max-w-3xl space-y-6">
            <div>
              <h2 className="font-display text-3xl font-semibold text-white">Get in touch</h2>
              <p className="mt-4 font-display text-2xl font-bold text-gray-100">Email:</p>
            </div>

            <ul className="font-display text-xl text-gray-100 leading-relaxed space-y-3">
              <li>Dean Harley Pal — paldeanharley@gmail.com</li>
              <li>Nerbert Bulaquena — nerbertb@gmail.com</li>
              <li>Peter John Galeno — pedrojuana08@gmail.com</li>
              <li>Nathaniel Dacasin — nathandacasin01@gmail.com</li>
            </ul>

            <p className="font-display text-lg text-gray-200 leading-relaxed max-w-2xl">
              Reach out for questions, feedback, or collaboration about Geo Memory Map.
            </p>
          </div>
        </div>

        <div className="flex justify-center lg:justify-center">
          <form
            action="submit"
            method="post"
            className="w-[550px] rounded-3xl bg-gray-800/20 backdrop-blur-sm px-10 py-10 shadow-xl"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              className="mt-5 h-56 w-full rounded-2xl border border-white/15 bg-white/90 px-4 py-4 font-display text-[#24342b] outline-none placeholder:text-gray-500 focus:border-white/30"
            ></textarea>

            <button
              type="submit"
              className="mt-6 inline-flex h-14 w-full md:w-52 items-center justify-center rounded-2xl bg-[#526b5c] px-6 font-display text-xl font-medium text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
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