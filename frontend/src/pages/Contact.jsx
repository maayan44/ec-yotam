import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets/assets.js'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-[#646661]'>Our Store</p>
          <p className='text-[#767873]'>LE TRUE | 44 HaYarkon St <br /> Tel Aviv-Yafo, Israel</p>
          <p className='text-[#767873]'>Tel: +972-50-444-4444 <br /> Email: letrue@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Contact