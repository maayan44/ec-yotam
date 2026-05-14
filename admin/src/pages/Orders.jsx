import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets';

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <p className='mb-4 font-medium text-lg'>הזמנות</p>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-[#e0e0e0] hover:border-[#C0001A] transition-colors p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-[#1A1A1A] bg-white rounded'
          >
            {/* Column 1: Icon */}
            <img className='w-12' src={assets.parcel_icon} alt="" />

            {/* Column 2: Items & Address */}
            <div>
              <div>
                {order.items.map((item, index) => (
                  <p className='py-0.5' key={index}>
                    {item.name} x {item.quantity}
                    {index !== order.items.length - 1 && "،"}
                  </p>
                ))}
              </div>
              <p className='mt-3 mb-2 font-medium'>
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className='text-[#8C8C8C]'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='mt-1'>{order.address.phone}</p>
            </div>

            {/* Column 3: Stats */}
            <div className='flex flex-col gap-1 text-[#8C8C8C]'>
              <p className='text-sm sm:text-[15px] text-[#1A1A1A] font-medium'>פריטים: {order.items.length}</p>
              <p>אמצעי תשלום: {order.paymentMethod}</p>
              <p>תשלום: {order.payment ? '✅ שולם' : '⏳ ממתין'}</p>
              <p>תאריך: {new Date(order.date).toLocaleDateString('he-IL')}</p>
            </div>

            {/* Column 4: Price */}
            <p className='text-sm sm:text-[15px] font-semibold text-[#C0001A]'>
              {currency}{order.amount}
            </p>

            {/* Column 5: Status */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className='p-2 font-semibold border border-[#e0e0e0] rounded text-[#1A1A1A]'
            >
              <option value="Order placed">הזמנה התקבלה</option>
              <option value="Packing">באריזה</option>
              <option value="Shipped">נשלח</option>
              <option value="Out for delivery">בדרך אליך</option>
              <option value="Delivered">נמסר</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders