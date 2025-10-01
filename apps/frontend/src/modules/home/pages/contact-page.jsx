function ContactPage() {
  return (
    <section className="fixed bg-[url(@/assets/geo-memory-map-bg.png)] bg-size-[900px] bg-no-repeat bg-center h-screen w-full">
      <div className="bg-[#526b5c]/80 h-full">
        <div className=" font-display flex flex-col justify-center-safe gap-5 text-left">
          <h1 className="text-7xl font-semibold p-20">Contact Us</h1>
        </div>

        <div className="flex flex-wrap text-left  place-content-around">
          <div>
            <h2 className="font-display font-semibold pl-20 py-5 text-3xl">Get in touch</h2>
            <p className="font-display font-bold pl-20 py-2 text-2xl">Email:</p>

            <ul className="font-display pl-20 text-xl space-y-2">
              <li>Dean Harley Pal - paldeanharley@gmail.com</li>
              <li>Nerbert Bulaquena - nerbertb@gmail.com</li>
              <li>Peter John Galeno - pedrojuana08@gmail.com</li>
              <li>Nathaniel Dacasin - nathandacasin01@gmail.com</li>
            </ul>
          </div>
          <div className="flex w-[50%] justify-center items-center">
            <form action="submit" method="post" className='border border-solid w-[80%]  ' >
              <input type="text" name="" id="name" placeholder="Name" className='border border-solid w-[40%] my-5 mx-5'/>
              <input type="email" name="" id="email" placeholder="Email" className='border border-solid  w-[40%] mx-5'/>
              <textarea name="" id="" className='bg-white/50 w-[85%] h-50  m-5'></textarea>
              <button type="submit" className='inline-flex h-12 w-50 ml-5 mb-5 font-display text-xl items-center justify-center rounded-md bg-[#526b5c] px-5 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-90'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
