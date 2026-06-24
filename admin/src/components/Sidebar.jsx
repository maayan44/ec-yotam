import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <div className='min-h-screen border-r border-[#C6C7C3] w-[60px] md:w-[18%]'>
            <div className='flex flex-col gap-4 pt-6 text-[15px]'>
                <NavLink className='flex items-center justify-center md:justify-start gap-3 border border-[#C6C7C3] border-r-0 px-3 py-2 md:rounded-l' to="/add">
                    <img className='w-5 h-5 shrink-0' src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>הוסף מוצר</p>
                </NavLink>
                <NavLink className='flex items-center justify-center md:justify-start gap-3 border border-[#C6C7C3] border-r-0 px-3 py-2 md:rounded-l' to="/list">
                    <img className='w-5 h-5 shrink-0' src={assets.parcel_icon} alt="" />
                    <p className='hidden md:block'>רשימת מוצרים</p>
                </NavLink>
                <NavLink className='flex items-center justify-center md:justify-start gap-3 border border-[#C6C7C3] border-r-0 px-3 py-2 md:rounded-l' to="/orders">
                    <img className='w-5 h-5 shrink-0' src={assets.order_icon} alt="" />
                    <p className='hidden md:block'>הזמנות</p>
                </NavLink>
                <NavLink className='flex items-center justify-center md:justify-start gap-3 border border-[#C6C7C3] border-r-0 px-3 py-2 md:rounded-l' to="/users">
                    <img className='w-5 h-5 shrink-0' src={assets.profile_icon} alt="" />
                    <p className='hidden md:block'>משתמשים</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar