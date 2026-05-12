import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
        <p className='text-[#767873]'>{text1} <span className='text-[#535551] font-medium'>{text2}</span></p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
        {/* [#767873] instead of gray-500 and [#535551] instead of gray-700 */ }
    </div>
  )
}

export default Title
