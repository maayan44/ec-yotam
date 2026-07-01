import React from 'react'
import { assets } from '../assets/assets/assets.js'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-20 bg-[#1A1A1A]' aria-label="פוטר האתר">

      {/* Footer columns: brand, nav, contact */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 px-8 py-14 text-sm'>

        {/* Brand description */}
        <div>
          <img src={assets.logo} className='mb-5 w-30' alt="Interproduct" />
          <p className='w-full md:w-2/3 text-white/50 leading-relaxed'>
            INTERPRODUCT מספקת מוצרי טיפוח לרכב ואביזרי רכב מקצועיים. <br />משלוח מהיר לכל הארץ, מחירים תחרותיים ושירות אמין.
          </p>
        </div>

        {/* Secondary navigation */}
        <nav aria-label="ניווט משני">
          <p className='text-base font-semibold mb-5 text-white'>החברה</p>
          <ul className='flex flex-col gap-3 text-white/50 list-none'>
            <li><Link to='/' className='hover:text-[#C0001A] transition-colors'>בית</Link></li>
            <li><Link to='/about' className='hover:text-[#C0001A] transition-colors'>אודות</Link></li>
            <li><Link to='/privacy' className='hover:text-[#C0001A] transition-colors'>מדיניות פרטיות</Link></li>
          </ul>
        </nav>

        {/* Contact details */}
        <div>
          <p className='text-base font-semibold mb-5 text-white'>צור קשר</p>
          <address className='not-italic flex flex-col gap-3 text-white/50'>
            <a
              href='https://wa.me/+972535944674'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 hover:text-white transition-colors'
              aria-label="צור קשר בוואטסאפ: 053-594-4674"
            >
              <img src={assets.whatsapp_icon} alt="" aria-hidden="true" className='w-5 h-5 object-contain' />
              <span>053-594-4674</span>
            </a>
            <a href='mailto:interproduct95@gmail.com' className='hover:text-white transition-colors'>
              interproduct95@gmail.com
            </a>
          </address>
        </div>

      </div>

      {/* Copyright bar */}
      <div className='px-8'>
        <hr className='border-white/10' />
        <p className='py-5 sm:py-5 pb-8 sm:pb-5 text-xs text-center text-white/30'>
          © 2026 Interproduct.co.il — כל הזכויות שמורות
          <span className='hidden sm:inline' aria-hidden="true">&nbsp;·&nbsp;</span>
          <a
            href='https://ciano-webs.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
            aria-label="אתר נבנה על ידי Ciano Webs"
          >
            <img src={assets.cianowebs_logo} alt="Ciano Webs" className='h-5 inline-block opacity-30 hover:opacity-60 transition-opacity align-middle mb-0.5 mx-auto' />
          </a>
        </p>
      </div>

    </footer>
  )
}

export default Footer