import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token, formatPrice } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) return null
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
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
      'Packing': 'באריזה',
      'Shipped': 'נשלח',
      'Out for delivery': 'בדרך אליך',
      'Delivered': 'נמסר',
    }
    return map[status] || status
  }

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'ההזמנות'} text2={'שלי'} />
      </div>

      <div>
        {orderData.length === 0 && (
          <p className='text-[#8C8C8C] text-sm mt-8'>אין הזמנות עדיין</p>
        )}
        {orderData.map((item, index) => (
          <div key={index} className='py-4 border-t border-b text-[#535551] flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20 rounded' src={item.image[0]} alt="" />
              <div>
                <p className='sm:text-base font-medium text-[#1A1A1A]'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base'>
                  <p className='text-[#C0001A] font-medium'>{formatPrice(item.price)}</p>
                  <p className='text-[#8C8C8C]'>כמות: {item.quantity}</p>
                </div>
                <p className='mt-1 text-[#8C8C8C]'>
                  תאריך: <span>{new Date(item.date).toLocaleDateString('he-IL')}</span>
                </p>
                <p className='mt-1 text-[#8C8C8C]'>
                  תשלום: <span>{item.paymentMethod === 'cod' ? 'מזומן / בקבלה' : item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className='md:w-1/2 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{translateStatus(item.status)}</p>
              </div>
              <button
                onClick={loadOrderData}
                className='border border-[#1A1A1A] px-4 py-2 text-sm font-medium rounded cursor-pointer hover:bg-[#1A1A1A] hover:text-white transition-colors'
              >
                עדכן סטטוס
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Orders