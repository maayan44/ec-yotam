import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

    // Context
    const { backendUrl, token, formatPrice } = useContext(ShopContext);
    const [orders, setOrders] = useState([])

    // Fetch user orders (GET, newest first)
    const loadOrderData = async () => {
        try {
            if (!token) return null
            const response = await axios.get(backendUrl + '/api/order/userorders', { headers: { token } })
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

    // Translate order status from English to Hebrew
    const translateStatus = (status) => {
        const map = {
            'Order Placed': 'הזמנה התקבלה',
            'Delivery Scheduled': 'נקבע מועד למשלוח',
            'Delivered': 'נמסר',
        }
        return map[status] || status
    }

    return (
        <div className='border-t pt-16'>

            {/* Page title */}
            <div className='text-2xl'>
                <Title text1={'ההזמנות'} text2={'שלי'} />
            </div>

            {/* Orders list */}
            <div className='flex flex-col gap-6 mt-6' role="list" aria-label="רשימת הזמנות">

                {/* Empty state */}
                {orders.length === 0 && (
                    <p className='text-[#8C8C8C] text-sm'>אין הזמנות עדיין</p>
                )}

                {orders.map((order, index) => (
                    <article key={index} role="listitem" className='border border-[#e0e0e0] rounded-lg p-5 flex flex-col gap-4' aria-label={`הזמנה מתאריך ${new Date(order.date).toLocaleDateString('he-IL')}`}>

                        {/* Order header: date + status */}
                        <div className='flex justify-between items-center border-b border-[#F5F5F0] pb-3'>
                            <p className='text-xs text-[#8C8C8C]'>
                                <time dateTime={new Date(order.date).toISOString()}>
                                    תאריך: {new Date(order.date).toLocaleDateString('he-IL')}
                                </time>
                            </p>
                            <div className='flex items-center gap-2'>
                                <span className='min-w-2 h-2 rounded-full bg-green-500' aria-hidden="true"></span>
                                <p className='text-sm font-medium'>{translateStatus(order.status)}</p>
                            </div>
                        </div>

                        {/* Order items */}
                        <ul className='flex flex-col gap-3 list-none' aria-label="פריטים בהזמנה">
                            {order.items.map((item, i) => (
                                <li key={i} className='flex items-center gap-4'>
                                    <img className='w-14 rounded' src={item.image[0]} alt={item.name} />
                                    <div>
                                        <p className='font-medium text-sm'>{item.name}</p>
                                        <p className='text-xs text-[#8C8C8C] mt-1'>
                                            כמות: {item.quantity} &nbsp;·&nbsp; {formatPrice(item.price)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Order footer: payment method + total */}
                        <div className='flex justify-between items-center border-t border-[#F5F5F0] pt-3'>
                            <p className='text-xs text-[#8C8C8C]'>תשלום: <span>טלפוני</span></p>
                            <p className='font-semibold text-[#C0001A]'>{formatPrice(order.amount)}</p>
                        </div>

                    </article>
                ))}
            </div>

        </div>
    )
}

export default Orders