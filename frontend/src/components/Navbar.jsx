import React, { useContext, useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets/assets.js'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx';

const Navbar = () => {

    // State
    const [visible, setVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { search, setSearch, showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
    const menuRef = useRef(null);

    // Scroll shrink effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close profile dropdown on outside click 
    useEffect(() => {
        const handleClickOutside = () => setProfileOpen(false)
        if (profileOpen) document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [profileOpen]);

    //  Mobile menu: lock scroll + focus first item 
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden'
            menuRef.current?.querySelector('a, button')?.focus()
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [visible]);

    // Close menus on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setVisible(false)
                setProfileOpen(false)
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, []);

    // Logout: clear token + cart
    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div
            className={`fixed top-[33px] left-0 right-0 z-50 border-b border-white/10 flex items-center justify-between px-8 font-medium bg-[#1A1A1A] transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}
            role="banner"
        >

            {/* Logo */}
            <Link to={'/'} aria-label="Interproduct - עמוד הבית">
                <img src={assets.logo} className={`transition-all duration-300 ${scrolled ? 'w-24' : 'w-34'}`} alt="Interproduct" />
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="ניווט ראשי" className='hidden sm:flex'>
                <ul className='flex gap-6 text-sm list-none'>
                    <li>
                        <NavLink to='/' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-white/60'}`}>
                            {({ isActive }) => (
                                <>
                                    <p>בית</p>
                                    <hr className={`w-2/4 border-none h-[1.5px] bg-[#C0001A] ${isActive ? '' : 'hidden'}`} aria-hidden="true" />
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/collection' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-white/60'}`}>
                            {({ isActive }) => (
                                <>
                                    <p>קטלוג</p>
                                    <hr className={`w-2/4 border-none h-[1.5px] bg-[#C0001A] ${isActive ? '' : 'hidden'}`} aria-hidden="true" />
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/about' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-white/60'}`}>
                            {({ isActive }) => (
                                <>
                                    <p>אודות</p>
                                    <hr className={`w-2/4 border-none h-[1.5px] bg-[#C0001A] ${isActive ? '' : 'hidden'}`} aria-hidden="true" />
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-white/60'}`}>
                            {({ isActive }) => (
                                <>
                                    <p>צור קשר</p>
                                    <hr className={`w-2/4 border-none h-[1.5px] bg-[#C0001A] ${isActive ? '' : 'hidden'}`} aria-hidden="true" />
                                </>
                            )}
                        </NavLink>
                    </li>
                </ul>
            </nav>

            {/* ─── Icon actions: search, profile, cart, mobile toggle ───────── */}
            <div className='flex items-center gap-4'>

                {/* Search */}
                <div className='flex items-center gap-2'>
                    {showSearch && (
                        <div className='flex items-center border border-white/20 rounded-full px-3 py-1 bg-[#2a2a2a]' role="search">
                            <label htmlFor="navbar-search" className="sr-only">חיפוש מוצרים</label>
                            <input
                                id="navbar-search"
                                autoFocus
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    if (!window.location.pathname.includes('collection')) {
                                        navigate('/collection')
                                    }
                                }}
                                className='outline-none bg-transparent text-white text-sm w-36 placeholder-white/40'
                                type="search"
                                placeholder='חיפוש...'
                                aria-label="חיפוש מוצרים"
                            />
                            <button
                                onClick={() => { setShowSearch(false); setSearch('') }}
                                className='cursor-pointer mr-2 flex items-center'
                                aria-label="סגור חיפוש"
                            >
                                <img className='w-3 invert' src={assets.cross_icon} alt="" aria-hidden="true" />
                            </button>
                        </div>
                    )}
                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className='cursor-pointer flex items-center'
                        aria-label={showSearch ? 'סגור חיפוש' : 'פתח חיפוש'}
                        aria-expanded={showSearch}
                    >
                        <img src={assets.search_icon} className='w-5 invert' alt="" aria-hidden="true" />
                    </button>
                </div>

                {/* Profile dropdown */}
                <div className='relative' onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => {
                            if (!token) { navigate('/login'); return }
                            setProfileOpen(!profileOpen)
                        }}
                        className='cursor-pointer flex items-center'
                        aria-label={token ? 'תפריט פרופיל' : 'התחברות'}
                        aria-expanded={token ? profileOpen : undefined}
                        aria-haspopup={token ? 'menu' : undefined}
                    >
                        <img className='w-5 invert' src={assets.profile_icon} alt="" aria-hidden="true" />
                    </button>
                    {token && profileOpen && (
                        <div className='absolute left-0 pt-4 z-50' role="menu" aria-label="תפריט משתמש">
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-[#2a2a2a] text-white/70 rounded text-sm'>
                                <button role="menuitem" onClick={() => { navigate('/orders'); setProfileOpen(false) }} className='cursor-pointer hover:text-white text-right'>ההזמנות שלי</button>
                                <button role="menuitem" onClick={() => { logout(); setProfileOpen(false) }} className='cursor-pointer hover:text-white text-right'>התנתק</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Cart with item count badge */}
                <Link to='/cart' className='relative' aria-label={`סל קניות, ${getCartCount} פריטים`}>
                    <img src={assets.cart_icon} className='w-5 min-w-5 invert' alt="" aria-hidden="true" />
                    <span className='absolute left-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#C0001A] text-white aspect-square rounded-full text-[8px]' aria-hidden="true">
                        {getCartCount}
                    </span>
                </Link>

                {/* Mobile menu toggle — hidden on desktop */}
                <button
                    onClick={() => setVisible(true)}
                    className='w-5 cursor-pointer sm:hidden flex items-center'
                    aria-label="פתח תפריט ניווט"
                    aria-expanded={visible}
                    aria-controls="mobile-menu"
                >
                    <img src={assets.menu_icon} className='w-5 invert' alt="" aria-hidden="true" />
                </button>
            </div>

            {/* Mobile sidebar menu  */}
            <div
                id="mobile-menu"
                ref={menuRef}
                className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-[#1A1A1A] transition-all duration-300 z-50 ${visible ? 'w-full' : 'w-0'}`}
                role="dialog"
                aria-modal="true"
                aria-label="תפריט ניווט"
                aria-hidden={!visible}
            >
                <div className='flex flex-col text-white/70 min-h-screen'>
                    <button
                        onClick={() => setVisible(false)}
                        className='flex items-center gap-4 p-5 cursor-pointer border-b border-white/10 text-right'
                        aria-label="סגור תפריט"
                    >
                        <img className='h-4' src={assets.dropdown_icon} alt="" aria-hidden="true" />
                        <p className='text-sm'>חזרה</p>
                    </button>
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