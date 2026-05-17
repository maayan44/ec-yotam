import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [city, setCity] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === 'register') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name, email, password, phone, businessName, businessAddress, city
        })
        if (response.data.success) {
          toast.success('ההרשמה הושלמה! החשבון ממתין לאישור מנהל.')
          setCurrentState('login')
        } else {
          toast.error(response.data.message)
        }

      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  useEffect(() => {
    setName(''); setEmail(''); setPassword('');
    setPhone(''); setBusinessName(''); setBusinessAddress(''); setCity('');
  }, [currentState]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-4 text-[#1A1A1A]'>

      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl font-medium'>
          {currentState === 'login' ? 'התחברות' : 'הרשמה'}
        </p>
        <hr className='border-none h-[1.5px] w-8 bg-[#C0001A]' />
      </div>

      {currentState === 'register' && (
        <>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className='w-full px-3 py-2 border border-[#A3A5A1] rounded'
            placeholder='שם מלא'
            required
          />
          <input
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 10)
              setPhone(val)
            }}
            value={phone}
            type="text"
            inputMode="numeric"
            className='w-full px-3 py-2 border border-[#A3A5A1] rounded'
            placeholder='מספר טלפון (10 ספרות)'
            required
          />
          <input
            onChange={(e) => setBusinessName(e.target.value)}
            value={businessName}
            type="text"
            className='w-full px-3 py-2 border border-[#A3A5A1] rounded'
            placeholder='שם העסק'
            required
          />
          <input
            onChange={(e) => setBusinessAddress(e.target.value)}
            value={businessAddress}
            type="text"
            className='w-full px-3 py-2 border border-[#A3A5A1] rounded'
            placeholder='כתובת העסק'
            required
          />
          <input
            onChange={(e) => setCity(e.target.value)}
            value={city}
            type="text"
            className='w-full px-3 py-2 border border-[#A3A5A1] rounded'
            placeholder='עיר'
            required
          />
        </>
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className='w-full px-3 py-2 border border-[#A3A5A1] rounded'
        placeholder='כתובת אימייל'
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className='w-full px-3 py-2 border border-[#A3A5A1] rounded'
        placeholder='סיסמה (לפחות 8 תווים)'
        required
      />

      <div className='w-full flex justify-between text-sm mt-[-8px] text-[#8C8C8C]'>
        {currentState === 'login' && (
          <p className='cursor-pointer hover:text-[#C0001A] transition-colors'>שכחת סיסמה?</p>
        )}
        {currentState === 'login'
          ? <p onClick={() => setCurrentState('register')} className='cursor-pointer hover:text-[#C0001A] transition-colors'>הרשמה לחשבון חדש</p>
          : <p onClick={() => setCurrentState('login')} className='cursor-pointer hover:text-[#C0001A] transition-colors'>יש לי כבר חשבון</p>
        }
      </div>

      {currentState === 'register' && (
        <p className='text-xs text-[#8C8C8C] text-center'>
          לאחר ההרשמה, החשבון יועבר לאישור מנהל לפני שתוכל להתחבר
        </p>
      )}

      <button className='bg-[#1A1A1A] text-white font-medium px-8 py-2 mt-4 cursor-pointer rounded hover:bg-[#C0001A] transition-colors w-full'>
        {currentState === 'login' ? 'התחבר' : 'הרשם'}
      </button>

    </form>
  )
}

export default Login