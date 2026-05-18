import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token, formatPrice } = useContext(ShopContext);
  const [orders, setOrders] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) return null
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  const translateStatus = (status) => {
    const map = {
      'Order placed': 'הזמנה התקבלה',
      'Delivery Scheduled': 'נקבע מועד למשלוח',
      'Delivered': 'נמסר',
    }
    return map[status] || status
  }

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'ההזמנות'} text2={'שלי'} />
      </div>

      <div className='flex flex-col gap-6 mt-6'>
        {orders.length === 0 && (
          <p className='text-[#8C8C8C] text-sm'>אין הזמנות עדיין</p>
        )}
        {orders.map((order, index) => (
          <div key={index} className='border border-[#e0e0e0] rounded-lg p-5 flex flex-col gap-4'>

            {/* Order header */}
            <div className='flex justify-between items-center border-b border-[#F5F5F0] pb-3'>
              <p className='text-xs text-[#8C8C8C]'>
                תאריך: {new Date(order.date).toLocaleDateString('he-IL')}
              </p>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm font-medium'>{translateStatus(order.status)}</p>
              </div>
            </div>

            {/* Order items */}
            <div className='flex flex-col gap-3'>
              {order.items.map((item, i) => (
                <div key={i} className='flex items-center gap-4'>
                  <img className='w-14 rounded' src={item.image[0]} alt="" />
                  <div>
                    <p className='font-medium text-sm'>{item.name}</p>
                    <p className='text-xs text-[#8C8C8C] mt-1'>
                      כמות: {item.quantity} &nbsp;·&nbsp; {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order footer */}
            <div className='flex justify-between items-center border-t border-[#F5F5F0] pt-3'>
              <p className='text-xs text-[#8C8C8C]'>תשלום: <span>טלפוני</span></p>
              <p className='font-semibold text-[#C0001A]'>{formatPrice(order.amount)}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Orders