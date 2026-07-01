import React from 'react'

// Accepts a level prop to render the correct heading tag (h1, h2, h3...)
// Defaults to h2 — override on pages where Title is the main page heading
const Title = ({ text1, text2, level = 2 }) => {
    const Tag = `h${level}`
    return (
        <Tag className='inline-flex gap-2 items-center mb-3'>
            <span className='text-[#8C8C8C]'>
                {text1} <span className='text-[#1A1A1A] font-bold'>{text2}</span>
            </span>
            <span className='w-8 sm:w-12 h-[2px] bg-[#C0001A]' aria-hidden="true"></span>
        </Tag>
    )
}

export default Title