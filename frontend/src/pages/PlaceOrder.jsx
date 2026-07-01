import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    // Context
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, MIN_ORDER, products } = useContext(ShopContext);

    // State
    const [agreedToPolicy, setAgreedToPolicy] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        phone: ''
    })

    // Update form fields
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }))
    }

    // Submit order: validate → build payload → POST → redirect
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (getCartAmount < MIN_ORDER) {
                toast.error(`סכום מינימלי להזמנה הוא ₪${MIN_ORDER}`)
                return;
            }

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
                address: formData,
                items: orderItems,
                amount: getCartAmount + delivery_fee,
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

    // Derived: can form be submitted
    const belowMinimum = getCartAmount < MIN_ORDER
    const canSubmit = agreedToPolicy && !belowMinimum

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t' aria-label="טופס השלמת הזמנה" noValidate>

            {/* Delivery details form */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'פרטי'} text2={'משלוח'} />
                </div>

                <div className='flex gap-3'>
                    <div className='w-full'>
                        <label htmlFor='firstName' className='sr-only'>שם פרטי</label>
                        <input id='firstName' required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-[#A3A5A1] rounded py-1.5 px-3.5 w-full' type="text" placeholder='שם פרטי' autoComplete='given-name' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor='lastName' className='sr-only'>שם משפחה</label>
                        <input id='lastName' required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-[#A3A5A1] rounded py-1.5 px-3.5 w-full' type="text" placeholder='שם משפחה' autoComplete='family-name' />
                    </div>
                </div>

                <label htmlFor='email' className='sr-only'>כתובת אימייל</label>
                <input id='email' required onChange={onChangeHandler} name='email' value={formData.email} className='border border-[#A3A5A1] rounded py-1.5 px-3.5 w-full' type="email" placeholder='כתובת אימייל' autoComplete='email' />

                <label htmlFor='street' className='sr-only'>רחוב ומספר עסק</label>
                <input id='street' required onChange={onChangeHandler} name='street' value={formData.street} className='border border-[#A3A5A1] rounded py-1.5 px-3.5 w-full' type="text" placeholder='רחוב ומספר עסק' autoComplete='street-address' />

                <label htmlFor='city' className='sr-only'>עיר</label>
                <input id='city' required onChange={onChangeHandler} name='city' value={formData.city} className='border border-[#A3A5A1] rounded py-1.5 px-3.5 w-full' type="text" placeholder='עיר' autoComplete='address-level2' />

                <label htmlFor='phone' className='sr-only'>מספר טלפון</label>
                <input id='phone' required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-[#A3A5A1] rounded py-1.5 px-3.5 w-full' type="tel" placeholder='מספר טלפון' autoComplete='tel' inputMode='numeric' />
            </div>

            {/* Order summary + policy + submit */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>

                    {/* Manual payment notice */}
                    <p className='text-xs text-[#8C8C8C] leading-relaxed border-r-2 border-[#C0001A] pr-3'>
                        לאחר קבלת ואישור ההזמנה,<br />
                        צוות אינטרפרודקט יצור עמכם קשר טלפוני<br />
                        לקביעת מועד משלוח ותשלום.<br />
                        * ייתכנו עלויות משלוח נוספות לאזורים מרוחקים (בהתאם למדיניות המשלוחים שלנו).
                    </p>

                    {/* Minimum order warning */}
                    {belowMinimum && (
                        <div className='mt-4 text-xs text-[#C0001A] border border-[#C0001A]/30 rounded px-3 py-2 bg-[#C0001A]/5' dir='rtl' role="alert" aria-live="polite">
                            <p>סכום מינימום להזמנה: ₪{MIN_ORDER}</p>
                            <p>חסר ₪{(MIN_ORDER - getCartAmount).toFixed(2)} להשלמת ההזמנה</p>
                            <hr className='border-t border-[#C0001A] my-2' />
                            <p>למשלוחים מתחת ל1499₪ יש ליצור קשר טלפוני</p>
                        </div>
                    )}

                    {/* Privacy policy agreement */}
                    <div className='flex items-start gap-2 mt-6' dir='rtl'>
                        <input
                            type='checkbox'
                            id='policyAgree'
                            checked={agreedToPolicy}
                            onChange={(e) => setAgreedToPolicy(e.target.checked)}
                            className='mt-0.5 cursor-pointer accent-[#C0001A]'
                        />
                        <label htmlFor='policyAgree' className='text-xs text-[#8C8C8C] leading-relaxed cursor-pointer'>
                            לחיצה על 'שלח הזמנה' אני מאשר כי קראתי והסכמתי ל
                            <a href='/privacy' target='_blank' rel='noopener noreferrer' className='text-[#C0001A] hover:underline mx-0.5'>מדיניות הפרטיות</a>
                        </label>
                    </div>

                    {/* Submit button — disabled until policy agreed and minimum met */}
                    <div className='w-full text-start mt-4'>
                        <button
                            type='submit'
                            disabled={!canSubmit}
                            aria-disabled={!canSubmit}
                            className={`px-16 py-3 text-sm rounded transition-colors ${canSubmit ? 'bg-[#1A1A1A] text-white cursor-pointer hover:bg-[#C0001A]' : 'bg-[#d0d0d0] text-white cursor-not-allowed'}`}
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