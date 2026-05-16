import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const CartTotal = () => {

    const { formatPrice, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'סיכום'} text2={'הזמנה'} />
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>סכום ביניים</p>
                <p>{formatPrice(getCartAmount())}</p>
            </div>
            <hr className='border-[#F5F5F0]' />
            <div className='flex justify-between'>
                <p>דמי משלוח</p>
                <p>{formatPrice(delivery_fee)}</p>
            </div>
            <hr className='border-[#F5F5F0]' />
            <div className='flex justify-between'>
                <b>סה"כ לתשלום</b>
                <b className='text-[#C0001A]'>{formatPrice(getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee)}</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal