import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: { ...formData, state: '', zipcode: '', country: 'ישראל' },
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
      if (response.data.success) {
        setCartItems({})
        navigate('/orders')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* Delivery Information */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'פרטי'} text2={'משלוח'} />
        </div>

        <div className='flex gap-3'>
          <input
            required
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            className='border border-[#A3A5A1] rounded py-1.5 px-3.5 w-full'
            type="text"
            placeholder='שם פרטי'
          />
          <input
            required
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            className='border border-[#A3A5A1] rounded py-1.5 px-3.5 w-full'
            type="text"
            placeholder='שם משפחה'
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          className='border border-[#A3A5A1] rounded py-1.5 px-3.5 w-full'
          type="email"
          placeholder='כתובת אימייל'
        />

        <input
          required
          onChange={onChangeHandler}
          name='street'
          value={formData.street}
          className='border border-[#A3A5A1] rounded py-1.5 px-3.5 w-full'
          type="text"
          placeholder='רחוב ומספר עסק'
        />

        <input
          required
          onChange={onChangeHandler}
          name='city'
          value={formData.city}
          className='border border-[#A3A5A1] rounded py-1.5 px-3.5 w-full'
          type="text"
          placeholder='עיר'
        />

        <input
          required
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          className='border border-[#A3A5A1] rounded py-1.5 px-3.5 w-full'
          type="number"
          placeholder='מספר טלפון'
        />
      </div>

      {/* Order Summary & Payment */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'אמצעי'} text2={'תשלום'} />

          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-[#C0001A] transition-colors'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-[#C0001A]' : ''}`}></p>
              <p className='text-[#1A1A1A] text-sm font-medium mx-4'>תשלום במזומן / בקבלה</p>
            </div>
          </div>

          <div className='w-full text-start mt-8'>
            <button
              type='submit'
              className='bg-[#1A1A1A] text-white px-16 py-3 text-sm cursor-pointer hover:bg-[#C0001A] transition-colors rounded'
            >
              בצע הזמנה
            </button>
          </div>

        </div>
      </div>

    </form>
  )
}

export default PlaceOrder