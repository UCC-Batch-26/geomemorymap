import mapIcon from '@/assets/map-icon.png';
import cameraIcon from '@/assets/camera-icon.png';
import memoryIcon from '@/assets/memory-icon.png';

function AboutPage() {
  return (
    <section className="fixed bg-[url(@/assets/geo-memory-map-bg.png)] bg-size-[900px] bg-no-repeat bg-center h-screen w-full">
      <div className="bg-[#526b5c]/75 h-full">
        <div className="grid grid-cols-[1.6fr_1fr] h-full items-center px-10 gap-28">
          
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-8 text-left max-w-4xl">
            <h1 className="font-display md:text-4xl lg:text-7xl font-semibold text-white bg-gray-800/40 w-fit pr-10 rounded-r-2xl pl-10 py-2">
              About
            </h1>

            <p className="ml-10 text-[#f2f0ef] text-lg font-medium">
              Your memories, mapped with meaning.
            </p>

            <div className="ml-10 max-w-3xl space-y-6">
              <p className="font-display md:text-md lg:text-2xl text-gray-100 leading-relaxed">
                Geo Memory Map helps you preserve meaningful moments by placing them on a map.
              </p>

              <p className="font-display md:text-md lg:text-xl text-gray-200 leading-relaxed">
                Whether it’s a trip, celebration, or a place close to your heart, you can pin memories,
                add stories, upload photos, and revisit them right where they happened.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          {/* RIGHT SIDE */}
          <div className="flex justify-center">
            <div className="w-[550px] rounded-3xl bg-gray-800/20 backdrop-blur-sm px-10 py-12 shadow-xl">
              {/* ITEM 1 */}
              <div className="flex items-center gap-6">
                <div className="bg-gray-800/30 rounded-2xl p-4 shrink-0">
                  <img src={mapIcon} alt="Pin memories icon" className="w-18 h-18 object-contain" />
                </div>

                <div>
                  <h3 className="text-white text-3xl font-display font-semibold">Pin Your Memories</h3>
                  <p className="text-gray-100 text-xl mt-2 font-display">
                    Drop pins anywhere on the map.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/15 my-10"></div>

              {/* ITEM 2 */}
              <div className="flex items-center gap-6">
                <div className="bg-gray-800/30 rounded-2xl p-4 shrink-0">
                  <img src={cameraIcon} alt="Add photos icon" className="w-18 h-18 object-contain" />
                </div>

                <div>
                  <h3 className="text-white text-3xl font-display font-semibold">Add Photos</h3>
                  <p className="text-gray-100 text-xl mt-2 font-display">
                    Attach images to each memory.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/15 my-10"></div>

              {/* ITEM 3 */}
              <div className="flex items-center gap-6">
                <div className="bg-gray-800/30 rounded-2xl p-4 shrink-0">
                  <img src={memoryIcon} alt="Revisit journey icon" className="w-18 h-18 object-contain" />
                </div>

                <div>
                  <h3 className="text-white text-3xl font-display font-semibold">Revisit Your Journey</h3>
                  <p className="text-gray-100 text-xl mt-2 font-display">
                    Explore memories where they happened.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/15 mt-10"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutPage;