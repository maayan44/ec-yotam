import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-3 px-[4%] justify-between bg-[#1A1A1A]'>
      <img className='h-10 w-auto' src={assets.logo} alt="" />
      <button onClick={() => setToken('')} className='bg-[#C0001A] text-white cursor-pointer px-5 py-2 rounded-full text-xs sm:text-sm hover:bg-[#a00016] transition-colors'>
        התנתק
      </button>
    </div>
  )
}

export default Navbar