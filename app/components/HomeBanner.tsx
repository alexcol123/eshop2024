import Image from 'next/image'



const HomeBanner = () => {
  return (
    <div className='relative bg-primary rounded-md'>
      <div className='mx-auto px-8 py-12 flex flex-col fap-2 md:flex-row items-center justify-evenly '>
        {/* left */}
        <div className='mb-8 md:mb-0 text-center ' >
          <h1 className='text-base-200 text-4xl md:text-6xl font-bold mb-4' >Summer Sale</h1>
          <p className='text-base-200 text-lg md:text-xl  mb-2' > Enjoy discounts on selected items</p>
          <p className='text-base-200 text-2xl md:text-4xl font-semibold'>GET UP TO 50% OFF</p>
        </div>
        <div className="  w-1/3 flex items-center justify-center relative aspect-video">

          <Image src='/banner-image.png' fill    priority  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 70vw" alt='banner'  className='object-contain '  />
        </div>

        {/* right */}
        <div>

        </div>
      </div>
    </div>
  )
}

export default HomeBanner