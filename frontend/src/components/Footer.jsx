import React from 'react'
import { assets } from '../assets/assets/assets.js'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-[#646661]'>
            Few sentances about the brand  ....  ....</p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-[#646661]'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-med mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-[#646661]'>
                <li>+972-50-444-444</li>
                <li>letrue@gmail.com</li>
            </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2026@ letrue.co.il - All Rights Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
