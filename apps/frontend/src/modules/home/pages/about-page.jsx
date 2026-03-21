import mapIcon from '@/assets/map-icon.png';
import cameraIcon from '@/assets/camera-icon.png';
import memoryIcon from '@/assets/memory-icon.png';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';


const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50},
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24},
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

function AboutPage() {
  return (
    <section className="min-h-screen w-full bg-[url(@/assets/geo-memory-map-bg.png)] bg-[length:900px] bg-center bg-no-repeat">
      <div className="min-h-screen bg-[#526b5c]/75">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] min-h-screen items-center px-4 py-8 sm:px-6 lg:px-10 gap-10 lg:gap-28">
          <motion.div 
            className="flex flex-col gap-8 text-left max-w-4xl"
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-display w-fit rounded-r-2xl bg-gray-800/40 py-2 pl-6 pr-6 text-4xl font-semibold text-white sm:pl-8 sm:pr-8 sm:text-5xl lg:pl-10 lg:pr-10 lg:text-7xl">
              About
            </h1>

            <p className="text-base font-medium text-[#f2f0ef] sm:ml-6 sm:text-lg lg:ml-10">Your memories, mapped with meaning.</p>

            <div className="max-w-3xl space-y-4 sm:ml-6 sm:space-y-5 lg:ml-10 lg:space-y-6">
              <p className="font-display text-lg leading-relaxed text-gray-100 sm:text-xl lg:text-2xl">
                Geo Memory Map helps you preserve meaningful moments by placing them on a map.
              </p>

              <p className="font-display text-base leading-relaxed text-gray-200 sm:text-lg lg:text-xl">
                Whether it’s a trip, celebration, or a place close to your heart, you can pin memories, add stories,
                upload photos, and revisit them right where they happened.
              </p>

              <div className="mt-4 flex items-start gap-3 rounded-lg border border-white/20 bg-gray-800/20 px-4 py-3 backdrop-blur-sm">
                <div className="rounded-xl bg-white/10 p-2.5">
                  <MapPin className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
                <p className="font-display text-sm text-gray-100 sm:text-base">
                  For the best experience, please allow location access so Geo Memory Map
                  can accurately place and explore your memories on the map.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center">
            <motion.div 
              className="w-full max-w-md rounded-3xl bg-gray-800/20 px-6 py-8 shadow-xl backdrop-blur-sm sm:px-8 sm:py-10 lg:w-[550px] lg:max-w-none lg:px-10 lg:py-12"
              variants={fadeRight}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"  
              >

                <motion.div 
                  className="flex items-start gap-4 sm:items-center sm:gap-6"
                  variants={fadeUpItem}
                >
                  <div className="bg-gray-800/30 rounded-2xl p-4 shrink-0">
                    <img src={mapIcon} alt="Pin memories icon" className="h-12 w-12 object-contain sm:h-16 sm:w-16" />
                  </div>

                  <div>
                    <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-display font-semibold">Pin Your Memories</h3>
                    <p className="text-gray-100 text-base sm:text-lg lg:text-xl mt-2 font-display">Drop pins anywhere on the map.</p>
                  </div>
                </motion.div>

                <div className="border-t border-white/15 my-6 sm:my-8 lg:my-10"></div>

                <motion.div 
                  className="flex items-start gap-4 sm:items-center sm:gap-6"
                  variants={fadeUpItem}
                >
                  
                  <div className="bg-gray-800/30 rounded-2xl p-4 shrink-0">
                    <img src={cameraIcon} alt="Add photos icon" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
                  </div>

                  <div>
                    <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-display font-semibold">Add Photos</h3>
                    <p className="text-gray-100 text-base sm:text-lg lg:text-xl mt-2 font-display">Attach images to each memory.</p>
                  </div>
                </motion.div>

                <div className="border-t border-white/15 my-6 sm:my-8 lg:my-10"></div>

                <motion.div 
                  className="flex items-start gap-4 sm:items-center sm:gap-6"
                  variants={fadeUpItem}
                >
                  <div className="bg-gray-800/30 rounded-2xl p-4 shrink-0">
                    <img src={memoryIcon} alt="Revisit journey icon" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
                  </div>

                  <div>
                    <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-display font-semibold">Revisit Your Journey</h3>
                    <p className="text-gray-100 text-base sm:text-lg lg:text-xl  mt-2 font-display">Explore memories where they happened.</p>
                  </div>
                </motion.div>

                <div className="border-t border-white/15 mt-6 sm:mt-8 lg:mt-10"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
