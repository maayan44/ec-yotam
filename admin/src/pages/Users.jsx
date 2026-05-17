import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Users = ({ token }) => {

  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/list', { headers: { token } })
      if (response.data.success) {
        setUsers(response.data.users.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const approveUser = async (userId) => {
    try {
      const response = await axios.post(backendUrl + '/api/user/approve', { userId }, { headers: { token } })
      if (response.data.success) {
        toast.success('המשתמש אושר בהצלחה')
        fetchUsers()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const rejectUser = async (userId) => {
    try {
      const response = await axios.post(backendUrl + '/api/user/reject', { userId }, { headers: { token } })
      if (response.data.success) {
        toast.success('המשתמש נדחה והוסר')
        fetchUsers()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const pending = users.filter(u => !u.isApproved)
  const approved = users.filter(u => u.isApproved)

  return (
    <div>
      <p className='mb-6 font-medium text-lg'>ניהול משתמשים</p>

      {/* Pending Users */}
      <p className='mb-3 font-medium text-base text-[#C0001A]'>ממתינים לאישור ({pending.length})</p>
      <div className='flex flex-col gap-2 mb-8'>
        {pending.length === 0 && <p className='text-[#8C8C8C] text-sm'>אין משתמשים ממתינים</p>}
        {pending.map((user) => (
          <div key={user._id} className='flex items-center justify-between gap-4 py-3 px-4 border bg-white text-sm rounded'>
            <div className='w-[180px]'>
              <p className='font-medium'>{user.name}</p>
              <p className='text-[#8C8C8C] text-xs'>{user.email}</p>
            </div>
            <div className='w-[150px]'>
              <p>{user.businessName}</p>
              <p className='text-[#8C8C8C] text-xs'>{user.city}</p>
            </div>
            <p className='w-[110px] text-[#8C8C8C]'>{user.phone}</p>
            <div className='flex gap-2'>
              <button
                onClick={() => approveUser(user._id)}
                className='bg-[#1A1A1A] text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors cursor-pointer w-12'
              >
                אשר
              </button>
              <button
                onClick={() => rejectUser(user._id)}
                className='bg-[#C0001A] text-white px-3 py-1 rounded text-xs hover:bg-red-800 transition-colors cursor-pointer w-12'
              >
                דחה
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Approved Users */}
      <p className='mb-3 font-medium text-base text-green-700'>משתמשים מאושרים ({approved.length})</p>
      <div className='flex flex-col gap-2'>
        {approved.length === 0 && <p className='text-[#8C8C8C] text-sm'>אין משתמשים מאושרים עדיין</p>}
        {approved.map((user) => (
          <div key={user._id} className='flex items-center justify-between gap-4 py-3 px-4 border bg-white text-sm rounded'>
            <div className='w-[180px]'>
              <p className='font-medium'>{user.name}</p>
              <p className='text-[#8C8C8C] text-xs'>{user.email}</p>
            </div>
            <div className='w-[150px]'>
              <p>{user.businessName}</p>
              <p className='text-[#8C8C8C] text-xs'>{user.city}</p>
            </div>
            <p className='w-[110px] text-[#8C8C8C]'>{user.phone}</p>
            <button
              onClick={() => rejectUser(user._id)}
              className='bg-[#C0001A] text-white px-3 py-1 rounded text-xs hover:bg-red-800 transition-colors cursor-pointer w-12'
            >
              הסר
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Users