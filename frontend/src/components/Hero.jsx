import React from 'react'
import { assets } from '../assets/assets/assets.js'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-[#1A1A1A]'>

      {/* Hero Right Side - Image (comes first in RTL) */}
      <img className='w-full sm:w-1/2 object-cover' src={assets.hero_img} alt="מוצרי גראז'" />

      {/* Hero Left Side - Text */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-[#1A1A1A]'>
        <div className='text-white px-8'>

          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#C0001A]'></p>
            <p className='font-medium text-sm md:text-base tracking-widest text-white/60'>הנמכרים ביותר</p>
          </div>

          <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed font-bold'>
            מוצרים חדשים
          </h1>

          <Link to='/collection'>
            <div className='flex items-center gap-2 mt-2 group cursor-pointer'>
              <p className='font-semibold text-sm md:text-base text-[#C0001A] group-hover:text-white transition-colors'>לקנייה עכשיו</p>
              <p className='w-8 md:w-11 h-[1px] bg-[#C0001A] group-hover:w-16 transition-all'></p>
            </div>
          </Link>

        </div>
      </div>

    </div>
  )
}

export default Hero