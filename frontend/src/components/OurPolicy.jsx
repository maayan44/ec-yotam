import React from 'react'
import { assets } from '../assets/assets/assets.js'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-[#535551]'>

        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-[#A3A5A1]'>We offer easy exchange policy</p>
        </div>
        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-[#A3A5A1]'>We provide 7 days free return policy</p>
        </div><div>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Customer Support</p>
            <p className='text-[#A3A5A1]'>We provide customer support via..</p>
        </div>

    </div>
  )
}

export default OurPolicy