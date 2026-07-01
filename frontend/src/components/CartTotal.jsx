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

        <dl className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <dt>סכום ביניים</dt>
                <dd>{formatPrice(getCartAmount)}</dd>
            </div>
            <hr className='border-[#F5F5F0]' />
            <div className='flex justify-between'>
                <dt>דמי משלוח</dt>
                <dd>{formatPrice(delivery_fee)}</dd>
            </div>
            <hr className='border-[#F5F5F0]' />
            <div className='flex justify-between'>
                <dt><b>סה"כ לתשלום</b></dt>
                <dd><b className='text-[#C0001A]'>{formatPrice(getCartAmount === 0 ? 0 : getCartAmount + delivery_fee)}</b></dd>
            </div>
        </dl>
    </div>
  )
}

export default CartTotal