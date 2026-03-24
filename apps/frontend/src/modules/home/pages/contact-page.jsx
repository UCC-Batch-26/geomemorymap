import bg from '@/assets/geo-memory-map-bg.png';
import { sendContactMessage } from '@/modules/api-hooks/send-contact-message';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

const MotionDiv = motion.div;
const MotionForm = motion.form;

const fadeSoft = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const formFocus = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      delay: 0.15,
    },
  },
};

const inputPop = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const response = await sendContactMessage(formData);
      toast.success(response.message || 'Message sent succesfully.');

      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      toast.error(error.message || 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  }

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
        <MotionDiv
          className="flex max-w-4xl flex-col gap-8 text-left"
          variants={fadeSoft}
          initial="hidden"
          animate="visible"
        >
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
        </MotionDiv>

        <div className="flex justify-center">
          <MotionForm
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-3xl bg-gray-800/20 px-6 py-8 shadow-xl backdrop-blur-sm sm:px-8 sm:py-10 lg:w-[550px] lg:max-w-none lg:px-10 lg:py-10"
            variants={formFocus}
            initial="hidden"
            animate="visible"
          >
            <MotionDiv variants={staggerContainer} initial="hidden" animate="visible" className="">
              <MotionDiv className="grid grid-cols-1 gap-4 sm:grid-cols-2" variants={inputPop}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full rounded-xl border border-white/15 bg-white/85 px-4 py-3 font-display text-[#24342b] outline-none placeholder:text-gray-500 focus:border-white/30"
                />

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full rounded-xl border border-white/15 bg-white/85 px-4 py-3 font-display text-[#24342b] outline-none placeholder:text-gray-500 focus:border-white/30"
                />
              </MotionDiv>

              <MotionDiv>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  className="mt-5 h-44 w-full rounded-2xl border border-white/15 bg-white/90 px-4 py-4 font-display text-[#24342b] outline-none placeholder:text-gray-500 focus:border-white/30 sm:h-52 lg:h-56"
                />
              </MotionDiv>

              <MotionDiv>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#526b5c] px-6 font-display text-base font-medium text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 sm:h-14 sm:text-lg md:w-52 xl:text-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </MotionDiv>
            </MotionDiv>
          </MotionForm>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
