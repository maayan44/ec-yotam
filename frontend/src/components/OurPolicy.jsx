import React from 'react'
import { Link } from 'react-router-dom'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base'>

      <div>
        <div className='text-4xl mb-4' aria-hidden="true">🚗</div>
        <p className='font-semibold text-[#1A1A1A]'>מוצרים מקצועיים בלבד</p>
        <p className='text-[#8C8C8C] mt-1'>אנו מציעים רק מוצרים באיכות מקצועית גבוהה</p>
      </div>

      <div>
        <div className='text-4xl mb-4' aria-hidden="true">🚚</div>
        <p className='font-semibold text-[#1A1A1A]'>משלוח מהיר לכל הארץ</p>
        <p className='text-[#8C8C8C] mt-1'>משלוח מהיר ואמין לכל נקודה בישראל</p>
      </div>

      <Link to='/contact' className='hover:opacity-70 transition-opacity'>
        <div className='text-4xl mb-4' aria-hidden="true">📞</div>
        <p className='font-semibold text-[#1A1A1A]'>תמיכה מקצועית</p>
        <p className='text-[#8C8C8C] mt-1'>הצוות שלנו זמין לכל שאלה</p>
      </Link>

    </div>
  )
}

export default OurPolicy