import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets/assets.js'

const brands = [
  { name: 'Brand One' },
  { name: 'Brand Two' },
  { name: 'Brand Three' },
  { name: 'Brand Four' },
  { name: 'Brand Five' },
  { name: 'Brand Six' },
]

const BrandLogos = () => {
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'המותגים'} text2={'שלנו'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#8C8C8C]'>
          מותגים מובילים בלעדיים לאינטרפרודקט בישראל
        </p>
      </div>

      <div className='grid grid-cols-3 sm:grid-cols-6 gap-6'>
        {brands.map((brand, i) => (
          <div
            key={i}
            className='flex items-center justify-center border border-[#F5F5F0] rounded-lg py-6 px-4 hover:border-[#C0001A] hover:shadow-sm transition-all cursor-pointer'
          >
            <img src={assets.p_img1} alt={brand.name} className='w-full max-h-12 object-contain' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BrandLogos