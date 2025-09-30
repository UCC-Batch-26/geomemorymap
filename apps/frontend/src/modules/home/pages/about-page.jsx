function AboutPage() {
  return (
    <section className="fixed bg-[url(@/assets/geo-memory-map-bg.png)] bg-size-[900px] bg-no-repeat bg-center h-screen w-full">
      <div className="bg-[#526b5c]/75 h-full">
        <div className="flex flex-col justify-center-safe gap-8 h-full px-4 text-left">
          <h1 className="font-display md:text-4xl lg:text-7xl font-semibold text-white bg-gray-800/40 w-[35%] rounded-2xl pl-10">About</h1>
          <p className="font-display md:text-md lg:text-2xl text-gray-100 text-left max-w-3xl ml-10">
            Geo Memory Map is designed to help users capture and preserve their most cherished memories in a unique and
            meaningful way. By allowing users to pin moments directly onto an interactive map, the app connects stories,
            photos, and descriptions to the specific places that hold significance in their lives. Whether it’s a
            special event, a travel experience, or a personal milestone, Geo Memory Map transforms memories into visual
            landmarks, making it easy to explore and share the stories that shape us. 
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
