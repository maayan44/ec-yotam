import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r border-[#C6C7C3]'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <NavLink className='flex items-center gap-3 border border-[#C6C7C3] border-r-0 px-3 py-2 rounded-l' to="/add">
                    <img className='w-5 h-5' src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>הוסף מוצר</p>
                </NavLink>
                <NavLink className='flex items-center gap-3 border border-[#C6C7C3] border-r-0 px-3 py-2 rounded-l' to="/list">
                    <img className='w-5 h-5' src={assets.order_icon} alt="" />
                    <p className='hidden md:block'>רשימת מוצרים</p>
                </NavLink>
                <NavLink className='flex items-center gap-3 border border-[#C6C7C3] border-r-0 px-3 py-2 rounded-l' to="/orders">
                    <img className='w-5 h-5' src={assets.order_icon} alt="" />
                    <p className='hidden md:block'>הזמנות</p>
                </NavLink>
                <NavLink className='flex items-center gap-3 border border-[#C6C7C3] border-r-0 px-3 py-2 rounded-l' to="/users">
                    <img className='w-5 h-5' src={assets.profile_icon} alt="" />
                    <p className='hidden md:block'>משתמשים</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar