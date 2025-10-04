function AboutPage() {
  return (
    <section className="fixed bg-[url(@/assets/geo-memory-map-bg.png)] bg-size-[900px] bg-no-repeat bg-center h-screen w-full">
      <div className="bg-[#526b5c]/75 h-full">
        <div className="flex flex-col justify-center-safe gap-8 h-full text-left">
          <h1 className="font-display md:text-4xl lg:text-7xl font-semibold text-white bg-gray-800/40 w-[35%] rounded-r-2xl pl-10">
            About
          </h1>
          <p className="font-display md:text-md lg:text-2xl text-gray-100 text-left max-w-3xl ml-10">
            Geo Memory Map is all about helping you keep your favorite memories alive in a fun, meaningful way. With our
            app, you can drop pins on a map to capture those special moments—whether it’s a trip, a celebration, or just
            a place that means something to you. Add your stories, photos, and little details that bring your memories
            to life right where they happened.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
