import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Helmet } from 'react-helmet-async'

const NotFound = () => {
  const { navigate } = useContext(ShopContext)

  return (
    <div className='flex flex-col items-center justify-center py-32 text-center' dir="rtl">

      <Helmet>
        <title>דף לא נמצא | Interproduct</title>
      </Helmet>

      <h1 className='text-8xl font-bold text-[#F5F5F0]'>404</h1>
      <h2 className='text-2xl font-medium text-[#1A1A1A] mt-4 mb-2' style={{ fontFamily: 'Heebo, sans-serif' }}>
        דף לא נמצא
      </h2>
      <p className='text-[#8C8C8C] text-sm mb-8'>
        הדף שחיפשת לא קיים או הוסר
      </p>
      <button
        onClick={() => navigate('/')}
        className='bg-[#1A1A1A] text-white text-sm px-8 py-3 cursor-pointer hover:bg-[#C0001A] transition-colors rounded'
        style={{ fontFamily: 'Heebo, sans-serif' }}
      >
        חזרה לדף הבית
      </button>
    </div>
  )
}

export default NotFound