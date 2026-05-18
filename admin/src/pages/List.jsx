import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
// 1. Imported the assets object (Adjust path if your admin app folder structure is different)
import { assets } from '../assets/assets' 

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2 font-medium text-lg'>רשימת מוצרים</p>
      <div className='flex flex-col gap-2'>

        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-[#F5F5F0] text-sm font-medium'>
          <b>תמונה</b>
          <b>שם</b>
          <b>קטגוריה</b>
          <b>מחיר</b>
          <b className='text-center'>מחק</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm hover:bg-[#F5F5F0] transition-colors'
            key={item._id}
          >
            <img className='w-12 rounded' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{Number(item.price).toFixed(2)}</p>
            
            <div className='flex justify-end md:justify-center items-center'>
              <img 
                onClick={() => removeProduct(item._id)}
                className='w-5 cursor-pointer hover:scale-110 active:scale-95 transition-all'
                src={assets.bin_icon} 
                alt="מחק" 
              />
            </div>
          </div>
        ))}

      </div>
    </>
  )
}

export default List