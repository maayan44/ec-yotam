import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-[#8C8C8C]'>
        {text1} <span className='text-[#1A1A1A] font-bold'>{text2}</span>
      </p>
      <p className='w-8 sm:w-12 h-[2px] bg-[#C0001A]'></p>
    </div>
  )
}

export default Title