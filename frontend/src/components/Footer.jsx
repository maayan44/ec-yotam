import React from 'react'
import { assets } from '../assets/assets/assets.js'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='mt-20 bg-[#1A1A1A]'>

      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 px-8 py-14 text-sm'>

        <div>
          <img src={assets.logo} className='mb-5 w-30' alt="Interproduct" />
          <p className='w-full md:w-2/3 text-white/50 leading-relaxed'>
            INTERPRODUCT מספקת מוצרי טיפוח לרכב ואביזרי רכב מקצועיים. משלוח מהיר לכל הארץ, מחירים תחרותיים ושירות אמין.
          </p>
        </div>

        <div>
          <p className='text-base font-semibold mb-5 text-white'>החברה</p>
          <ul className='flex flex-col gap-3 text-white/50'>
            <li>
              <Link to='/' className='hover:text-[#C0001A] transition-colors'>בית</Link>
            </li>
            <li>
              <Link to='/about' className='hover:text-[#C0001A] transition-colors'>אודות</Link>
            </li>
            <li className='hover:text-[#C0001A] cursor-pointer transition-colors'>מדיניות פרטיות</li>
          </ul>
        </div>

        <div>
          <p className='text-base font-semibold mb-5 text-white'>צור קשר</p>
          <ul className='flex flex-col gap-3 text-white/50'>
            <li>
              <a href='https://wa.me/+972535944674' target='_blank' rel='noopener noreferrer' className='flex items-center gap-2 hover:text-white transition-colors'>
                <img src={assets.whatsapp_icon} alt='WhatsApp' className='w-5 h-5 object-contain' />
                <span>053-594-4674</span>
              </a>
            </li>
            <li>interproduct95@gmail.com</li>
          </ul>
        </div>

      </div>

      <div className='px-8'>
        <hr className='border-white/10' />
        <p className='py-5 text-xs text-center text-white/30'>
          © 2026 Interproduct.co.il — כל הזכויות שמורות &nbsp;·&nbsp; Ciano Webs
        </p>
      </div>

    </div>
  )
}

export default Footer