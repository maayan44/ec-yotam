import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets/assets.js'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className='sticky top-0 z-50 border-b border-white/10 flex items-center justify-between py-4 px-8 font-medium bg-[#1A1A1A]'>

            <Link to={'/'}>
                <img src={assets.logo} className='w-34' alt="YGarage" />
            </Link>

            {/* Desktop nav - center */}
            <ul className='hidden sm:flex gap-6 text-sm text-white/60'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>בית</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#C0001A] hidden' />
                </NavLink>

                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>קטלוג</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#C0001A] hidden' />
                </NavLink>

                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>אודות</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#C0001A] hidden' />
                </NavLink>

                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>צור קשר</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#C0001A] hidden' />
                </NavLink>
            </ul>

            {/* Icons */}
            <div className='flex items-center gap-6'>
                <img
                    onClick={() => setShowSearch(true)}
                    src={assets.search_icon}
                    className='w-5 cursor-pointer invert'
                    alt="חיפוש"
                />

                <div className='group relative'>
                    <img
                        onClick={() => token ? null : navigate('/login')}
                        className='w-5 cursor-pointer invert'
                        src={assets.profile_icon}
                        alt="פרופיל"
                    />
                    {/* Dropdown */}
                    {token &&
                    <div className='group-hover:block hidden absolute dropdown-menu left-0 pt-4 z-50'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-[#2a2a2a] text-white/70 rounded text-sm'>
                            <p className='cursor-pointer hover:text-white'>הפרופיל שלי</p>
                            <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-white'>ההזמנות שלי</p>
                            <p onClick={logout} className='cursor-pointer hover:text-white'>התנתק</p>
                        </div>
                    </div>}
                </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5 invert' alt="סל קניות" />
                    <p className='absolute left-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#C0001A] text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>

                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className='w-5 cursor-pointer sm:hidden invert'
                    alt="תפריט"
                />
            </div>

            {/* Mobile sidebar */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-[#1A1A1A] transition-all z-50 ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-white/70'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4' src={assets.dropdown_icon} alt="" />
                        <p className='text-sm'>חזרה</p>
                    </div>

                    <NavLink onClick={() => setVisible(false)} className='py-3 pr-6 border-b border-white/10 hover:text-white' to='/'>בית</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-3 pr-6 border-b border-white/10 hover:text-white' to='/collection'>קטלוג</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-3 pr-6 border-b border-white/10 hover:text-white' to='/about'>אודות</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-3 pr-6 border-b border-white/10 hover:text-white' to='/contact'>צור קשר</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Navbar