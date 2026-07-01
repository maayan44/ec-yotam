import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify'

const Cart = () => {

    // Context
    const { products, formatPrice, cartItems, updateQuantity, navigate, token } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    // Build flat cart array from nested cartItems object
    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item]
                        })
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products])

    return (
        <div className='border-t pt-14'>

            {/* Page title */}
            <div className='text-2xl mb-3'>
                <Title text1={'סל'} text2={'הקניות'} />
            </div>

            {/* Empty cart state */}
            {cartData.length === 0 && (
                <div className='flex flex-col items-center justify-center py-24 text-center' dir="rtl">
                    <div className='w-20 h-20 mb-6 rounded-full bg-[#F5F5F0] flex items-center justify-center' aria-hidden="true">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </div>
                    <h2 className='text-xl font-medium text-[#1A1A1A] mb-2' style={{ fontFamily: 'Heebo, sans-serif' }}>העגלה שלך ריקה</h2>
                    <p className='text-[#8C8C8C] text-sm mb-8'>לא הוספת מוצרים עדיין</p>
                    <button
                        onClick={() => navigate('/collection')}
                        className='bg-[#1A1A1A] text-white text-sm px-8 py-3 cursor-pointer hover:bg-[#C0001A] transition-colors rounded'
                        style={{ fontFamily: 'Heebo, sans-serif' }}
                    >
                        לקטלוג המוצרים
                    </button>
                </div>
            )}

            {/* Cart items list */}
            <div role="list" aria-label="פריטים בסל הקניות">
                {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);
                    if (!productData) return null;

                    return (
                        <div key={index} role="listitem" className='py-4 border-t border-b text-[#535551] grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>

                            {/* Product image + name + price */}
                            <div className='flex items-start gap-6'>
                                <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
                                <div>
                                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                    <div className='flex items-center gap-5 mt-2'>
                                        <p className='text-[#C0001A] font-medium'>{formatPrice(productData.price)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity stepper */}
                            <div className='flex items-center gap-0' dir="rtl">
                                <div
                                    className='relative flex items-center justify-center h-9 w-16 bg-white border border-[#1A1A1A] rounded-full cursor-default select-none overflow-hidden'
                                    role="group"
                                    aria-label={`כמות עבור ${productData.name}`}
                                >
                                    <div className='flex items-center gap-1'>
                                        <span className='text-sm font-medium text-[#1A1A1A]' aria-live="polite" aria-atomic="true">{item.quantity}</span>
                                        <div className='flex flex-col'>
                                            <button
                                                onMouseDown={(e) => { e.preventDefault(); updateQuantity(item._id, item.size, item.quantity + 1) }}
                                                aria-label={`הגדל כמות של ${productData.name}`}
                                                className='flex items-center justify-center w-5 h-4 text-[10px] text-[#8C8C8C] hover:text-[#C0001A] transition-colors leading-none cursor-pointer'
                                                style={{ lineHeight: 1 }}
                                            >▲</button>
                                            <button
                                                onMouseDown={(e) => { e.preventDefault(); if (item.quantity > 1) updateQuantity(item._id, item.size, item.quantity - 1) }}
                                                aria-label={`הקטן כמות של ${productData.name}`}
                                                className='flex items-center justify-center w-5 h-4 text-[10px] text-[#8C8C8C] hover:text-[#C0001A] transition-colors leading-none cursor-pointer'
                                                style={{ lineHeight: 1 }}
                                            >▼</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Remove item */}
                            <button
                                onClick={() => updateQuantity(item._id, item.size, 0)}
                                aria-label={`הסר את ${productData.name} מהסל`}
                                className='cursor-pointer flex items-center justify-center'
                            >
                                <img className='w-4 mr-4 sm:w-5' src={assets.bin_icon} alt="" aria-hidden="true" />
                            </button>

                        </div>
                    )
                })}
            </div>

            {/* Order summary + checkout */}
            {cartData.length > 0 && (
                <div className='flex justify-start my-20'>
                    <div className='w-full sm:w-[450px]'>
                        <CartTotal />
                        <div className='w-full text-start mt-4'>
                            <button
                                onClick={() => {
                                    if (!token) {
                                        toast.error('יש להתחבר כדי להמשיך לתשלום')
                                        navigate('/login')
                                        return
                                    }
                                    navigate('/place-order')
                                }}
                                className='bg-[#1A1A1A] text-white text-sm px-8 py-3 cursor-pointer hover:bg-[#C0001A] transition-colors rounded'
                            >
                                המשך לתשלום
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Cart