import React from 'react'
import { useNavigate } from 'react-router-dom'
import Title from './Title'
import { assets } from '../assets/assets/assets.js'

const categories = [
  { name: 'מוצרי חשמל', icon: assets.vacuum_icon, value: 'מוצרי חשמל' },
  { name: 'נוזלי ניקוי', icon: assets.cleaning_icon, value: 'נוזלי ניקוי' },
  { name: 'מוצרי ריח', icon: assets.smell_icon, value: 'מוצרי ריח' },
  { name: 'חלקי חילוף', icon: assets.parts_icon, value: 'חלקי חילוף' },
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

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-6'>
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => handleClick(cat.value)}
            className='flex flex-col items-center justify-center gap-4 py-10 px-6 border border-[#F5F5F0] rounded-lg cursor-pointer hover:border-[#C0001A] hover:shadow-md transition-all group'
          >
            <img
              src={cat.icon}
              alt={cat.name}
              className='w-16 h-16 object-contain group-hover:scale-110 transition-transform'
            />
            <p className='font-semibold text-[#1A1A1A] text-sm'>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories