import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets/assets.js'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { search, setSearch, showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className={`fixed top-[33px] left-0 right-0 z-50 border-b border-white/10 flex items-center justify-between px-8 font-medium bg-[#1A1A1A] transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>

            <Link to={'/'}>
                <img src={assets.logo} className={`transition-all duration-300 ${scrolled ? 'w-24' : 'w-34'}`} alt="Interproduct" />
            </Link>

            {/* Desktop nav */}
            <ul className='hidden sm:flex gap-6 text-sm'>
                <NavLink to='/' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-white/60'}`}>
                    {({ isActive }) => (
                        <>
                            <p>בית</p>
                            <hr className={`w-2/4 border-none h-[1.5px] bg-[#C0001A] ${isActive ? '' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/collection' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-white/60'}`}>
                    {({ isActive }) => (
                        <>
                            <p>קטלוג</p>
                            <hr className={`w-2/4 border-none h-[1.5px] bg-[#C0001A] ${isActive ? '' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/about' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-white/60'}`}>
                    {({ isActive }) => (
                        <>
                            <p>אודות</p>
                            <hr className={`w-2/4 border-none h-[1.5px] bg-[#C0001A] ${isActive ? '' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/contact' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-white/60'}`}>
                    {({ isActive }) => (
                        <>
                            <p>צור קשר</p>
                            <hr className={`w-2/4 border-none h-[1.5px] bg-[#C0001A] ${isActive ? '' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>
            </ul>

            {/* Icons */}
            <div className='flex items-center gap-4'>

                {/* Inline search */}
                <div className='flex items-center gap-2'>
                    {showSearch && (
                        <div className='flex items-center border border-white/20 rounded-full px-3 py-1 bg-[#2a2a2a]'>
                            <input
                                autoFocus
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    if (!window.location.pathname.includes('collection')) {
                                        navigate('/collection')
                                    }
                                }}
                                className='outline-none bg-transparent text-white text-sm w-36 placeholder-white/40'
                                type="text"
                                placeholder='חיפוש...'
                            />
                            <img
                                onClick={() => { setShowSearch(false); setSearch('') }}
                                className='w-3 cursor-pointer invert mr-2'
                                src={assets.cross_icon}
                                alt=""
                            />
                        </div>
                    )}
                    <img
                        onClick={() => setShowSearch(!showSearch)}
                        src={assets.search_icon}
                        className='w-5 cursor-pointer invert'
                        alt="חיפוש"
                    />
                </div>

                <div className='group relative'>
                    <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer invert' src={assets.profile_icon} alt="פרופיל" />
                    {token &&
                        <div className='group-hover:block hidden absolute dropdown-menu left-0 pt-4 z-50'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-[#2a2a2a] text-white/70 rounded text-sm'>
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

                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden invert' alt="תפריט" />
            </div>

            {/* Mobile sidebar */}
            <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-[#1A1A1A] transition-all duration-300 z-50 ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-white/70 min-h-screen'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-5 cursor-pointer border-b border-white/10'>
                        <img className='h-4' src={assets.dropdown_icon} alt="" />
                        <p className='text-sm'>חזרה</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-4 pr-8 border-b border-white/10 hover:text-white text-lg' to='/'>בית</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-4 pr-8 border-b border-white/10 hover:text-white text-lg' to='/collection'>קטלוג</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-4 pr-8 border-b border-white/10 hover:text-white text-lg' to='/about'>אודות</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-4 pr-8 border-b border-white/10 hover:text-white text-lg' to='/contact'>צור קשר</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Navbar