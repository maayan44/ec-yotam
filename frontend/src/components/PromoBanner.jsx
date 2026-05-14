import React from 'react'
import { Link } from 'react-router-dom'

const PromoBanner = () => {
  const items = [
    <Link to='/collection' className='hover:underline'>
      משלוח מהיר לכל הארץ בקנייה מעל ₪499
    </Link>,
    <span>מוצרים במחיר סיטונאי ובלעדי</span>,
    <Link to='/collection' className='hover:underline'>
      משלוח מהיר לכל הארץ בקנייה מעל ₪499
    </Link>,
    <span>מוצרים במחיר סיטונאי ובלעדי</span>,
  ]

  return (
    <div className='w-full bg-[#C0001A] text-white py-2 overflow-hidden whitespace-nowrap'>
      <div className='flex animate-marquee'>
        {items.map((item, i) => (
          <span key={i} className='flex items-center text-sm font-medium mx-12'>
            {item}
            <span className='mx-12 text-white/40'>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default PromoBanner