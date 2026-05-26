import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets/assets.js'

// Row 1: Original Products
const row1Brands = [
  { name: 'Brand X One', image: assets.x },
  { name: 'Brand X Two', image: assets.x },
]

// Row 2: Other Brands
const row2Brands = [
  { name: 'Brand Pro', image: assets.brand_pro },
  { name: 'Brand Insta', image: assets.brand_insta },
  { name: 'Brand Automagic', image: assets.brand_automagic },
  { name: 'Brand X Three', image: assets.brand_kroxx },
]

const BrandLogos = () => {
  return (
    <div className='my-10 px-4'>
      
      {/* Title Section */}
      <div className='text-center text-3xl py-8'>
        <Title text1={'המותגים'} text2={'שלנו'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#8C8C8C]'>
          מותגים מובילים, בלעדיים ומוצרים מקוריים של אינטרפרודקט ישראל
        </p>
      </div>

      {/* Row 1: 2 Logos (100% Size) */}
      <div className='flex justify-center gap-6 mb-6 max-w-xl mx-auto'>
        {row1Brands.map((brand, i) => (
          <div
            key={i}
            className='flex-1 flex items-center justify-center border border-[#F5F5F0] rounded-lg py-6 px-4'
          >
            <img src={brand.image} alt={brand.name} className='w-full max-h-12 object-contain' />
          </div>
        ))}
      </div>

      {/* Row 2: 4 Logos (80% Size Layout) */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto'>
        {row2Brands.map((brand, i) => (
          <div
            key={i}
            className='flex items-center justify-center border border-[#F5F5F0] rounded-lg py-5 px-3'
          >
            {/* max-h-[38px] scales the image asset down to exactly 80% of max-h-12 (48px) */}
            <img src={brand.image} alt={brand.name} className='w-full max-h-[38px] object-contain' />
          </div>
        ))}
      </div>

    </div>
  )
}

export default BrandLogos