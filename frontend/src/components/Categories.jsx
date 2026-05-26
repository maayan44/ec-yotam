import React from 'react'
import { useNavigate } from 'react-router-dom'
import Title from './Title'
import { assets } from '../assets/assets/assets.js'

const categories = [
  { name: 'אביזרי עזר', icon: assets.polish_icon, value: 'אביזרי עזר' },
  { name: 'חומרי עזר', icon: assets.materials_icon, value: 'חומרי עזר' },
  { name: 'נוזלי ניקוי', icon: assets.cleaning_icon, value: 'נוזלי ניקוי' },
  { name: 'מוצרי ריח', icon: assets.smell_icon, value: 'מוצרי ריח' },
  { name: 'אביזרים למכשירים', icon: assets.parts_icon, value: 'אביזרים למכשירים' },
]

const Categories = () => {
  const navigate = useNavigate()

  const handleClick = (categoryValue) => {
    navigate(`/collection?category=${encodeURIComponent(categoryValue)}`)
  }

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'קטגוריות'} text2={'מוצרים'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#8C8C8C]'>
          בחרו קטגוריה וגלו את המוצרים המתאימים לכם
        </p>
      </div>

      <div className='grid grid-cols-3 sm:grid-cols-5 gap-6 justify-items-center'>
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => handleClick(cat.value)}
            className='flex flex-col items-center justify-center gap-3 cursor-pointer group'
          >
            {/* Circle with thin red border — always visible */}
            <div className='w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-[#C0001A]/30 group-hover:border-[#C0001A]/60 transition-all duration-300 flex items-center justify-center bg-white'>
              <img
                src={cat.icon}
                alt={cat.name}
                className='w-16 h-16 sm:w-20 sm:h-20 object-contain'
              />
            </div>
            <p className='font-semibold text-[#1A1A1A] text-sm text-center'>
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories