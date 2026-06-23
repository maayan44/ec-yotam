import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("אביזרי עזר")
  const [bestseller, setBestseller] = useState(false)

  const handlePriceInput = (e) => {
    const raw = e.target.value.replace(/[^\d.]/g, '')

    // Allow free typing, just enforce max 2 decimal places
    const parts = raw.split('.')
    if (parts.length > 2) return // block multiple dots

    if (parts[1] !== undefined && parts[1].length > 2) return // block more than 2 decimal digits

    setPrice(raw)
  }

  const handlePriceBlur = () => {
    if (price === '' || price === '.') { setPrice(''); return; }
    const num = parseFloat(price)
    if (isNaN(num)) { setPrice(''); return; }
    setPrice(num.toFixed(2))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify([]))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setBestseller(false)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-4'>

      {/* Image Upload */}
      <div>
        <p className='mb-2 font-medium'>תמונות מוצר</p>
        <div className='flex gap-2'>
          {[
            { id: 'image1', state: image1, setter: setImage1 },
            { id: 'image2', state: image2, setter: setImage2 },
            { id: 'image3', state: image3, setter: setImage3 },
            { id: 'image4', state: image4, setter: setImage4 },
          ].map(({ id, state, setter }) => (
            <label key={id} htmlFor={id}>
              <img
                className='w-20 cursor-pointer rounded border border-gray-200'
                src={!state ? assets.upload_area : URL.createObjectURL(state)}
                alt=""
              />
              <input onChange={(e) => setter(e.target.files[0])} type="file" id={id} hidden />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className='w-full'>
        <p className='mb-2 font-medium'>שם המוצר</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded'
          type="text"
          placeholder='הכנס שם מוצר'
          required
        />
      </div>

      {/* Description */}
      <div className='w-full'>
        <p className='mb-2 font-medium'>תיאור המוצר</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded'
          placeholder='תיאור המוצר'
          required
        />
      </div>

      {/* Category & Price */}
      <div className='flex flex-col sm:flex-row gap-4 w-full'>

        <div>
          <p className='mb-2 font-medium'>קטגוריה</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className='w-full px-3 py-2 border border-gray-300 rounded'
          >
            <option value="אביזרי עזר">אביזרי עזר</option>
            <option value="חומרי עזר">חומרי עזר</option>
            <option value="נוזלי ניקוי">נוזלי ניקוי</option>
            <option value="מוצרי ריח">מוצרי ריח</option>
            <option value="אביזרים למכשירים">אביזרים למכשירים</option>
          </select>
        </div>

        <div>
          <p className='mb-2 font-medium'>מחיר (₪)</p>
          <div className='relative sm:w-[120px]'>
            <input
              onChange={handlePriceInput}
              onBlur={handlePriceBlur}
              value={price}
              placeholder='0.00'
              className='w-full px-3 py-2 border border-gray-300 rounded'
              type="text"
              inputMode="numeric"
            />
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm'>₪</span>
          </div>
        </div>

      </div>

      {/* Bestseller */}
      <div className='flex gap-2 mt-2 items-center'>
        <input
          onChange={() => setBestseller(prev => !prev)}
          checked={bestseller}
          type="checkbox"
          id='bestseller'
        />
        <label className='cursor-pointer font-medium' htmlFor="bestseller">הוסף למוצרים מובילים</label>
      </div>

      <button
        className='cursor-pointer w-32 py-3 mt-4 bg-[#C0001A] text-white hover:bg-[#a00016] transition-all font-medium rounded active:scale-95'
        type='submit'
      >
        הוסף מוצר
      </button>

    </form>
  )
}

export default Add