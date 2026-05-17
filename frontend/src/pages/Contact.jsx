import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets/assets.js'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'צור'} text2={'קשר'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-[#1A1A1A]'>אינטרפרודקט</p>
          <p className='text-[#8C8C8C]'>מצפה אבי"ב, ישראל</p>
          <p className='text-[#8C8C8C]'>
            טלפון:{' '}
            <a href='https://wa.me/+972535944674' target='_blank' rel='noopener noreferrer' className='hover:text-[#C0001A] transition-colors'>
              053-594-4674
            </a>
            <br />
            אימייל: interproduct95@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact