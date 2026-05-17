import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets/assets.js'

const brands = [
  { name: 'Brand One', image: assets.brand_pro }, 
  { name: 'Brand Two', image: assets.brand_insta },
  { name: 'Brand Three', image: assets.x },
  { name: 'Brand Four', image: assets.brand_automagic },
  { name: 'Brand Five', image: assets.x }, 
]

const BrandLogos = () => {
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'המותגים'} text2={'שלנו'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#8C8C8C]'>
          מותגים מובילים, בלעדיים ומוצרים מקוריים של אינטרפרודקט ישראל
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-5 gap-6'>
        {brands.map((brand, i) => (
          <div
            key={i}
            className='flex items-center justify-center border border-[#F5F5F0] rounded-lg py-6 px-4'
          >
            <img src={brand.image} alt={brand.name} className='w-full max-h-12 object-contain' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BrandLogos