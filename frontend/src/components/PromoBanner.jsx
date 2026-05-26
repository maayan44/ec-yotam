import React from 'react'
import { Link } from 'react-router-dom'

const PromoBanner = () => {
  return (
    <div className='fixed top-0 left-0 right-0 z-[60] w-full bg-[#C0001A] text-white py-2 overflow-hidden' style={{direction: 'ltr'}}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'bannerScroll 22s linear infinite',
      }}>
        {/* Duplicated 4 times for seamless loop */}
        {[0,1,2,3].map((i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Link to='/collection' className='hover:underline text-sm font-medium' style={{ padding: '0 48px', whiteSpace: 'nowrap' }}>
              משלוח מהיר לכל הארץ בקנייה מעל ₪799
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>·</span>
            <span className='text-sm font-medium' style={{ padding: '0 48px', whiteSpace: 'nowrap' }}>
              מוצרים במחיר סיטונאי ובלעדי
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>·</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes bannerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </div>
  )
}

export default PromoBanner