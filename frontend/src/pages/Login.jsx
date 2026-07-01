import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    // State
    const [currentState, setCurrentState] = useState('login');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [businessAddress, setBusinessAddress] = useState('')
    const [city, setCity] = useState('')
    const [registered, setRegistered] = useState(false)
    const [loginError, setLoginError] = useState('')

    // Form submission: login or register
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoginError('')

        try {
            if (currentState === 'register') {
                const response = await axios.post(backendUrl + '/api/user/register', {
                    name, email, password, phone, businessName, businessAddress, city
                })
                if (response.data.success) {
                    setRegistered(true)
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
                    setLoginError(response.data.message)
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    // Redirect if already logged in
    useEffect(() => {
        if (token) navigate('/');
    }, [token]);

    // Clear fields on state switch
    useEffect(() => {
        setName(''); setEmail(''); setPassword('');
        setPhone(''); setBusinessName(''); setBusinessAddress(''); setCity('');
        setLoginError('');
    }, [currentState]);

    const isRegister = currentState === 'register'

    return (
        <form
            onSubmit={onSubmitHandler}
            className='flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-4 text-[#1A1A1A]'
            aria-label={isRegister ? 'טופס הרשמה' : 'טופס התחברות'}
            noValidate
        >

            {/* Page title */}
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <h1 className='text-3xl font-medium'>{isRegister ? 'הרשמה' : 'התחברות'}</h1>
                <hr className='border-none h-[1.5px] w-8 bg-[#C0001A]' aria-hidden="true" />
            </div>

            {/* Post-registration success notice */}
            {registered && (
                <div
                    className='w-full bg-[#F5F5F0] border border-[#A3A5A1] rounded px-4 py-4 text-center text-sm text-[#1A1A1A]'
                    dir="rtl"
                    role="status"
                    aria-live="polite"
                >
                    <p className='font-medium mb-1'>✅ הפרטים התקבלו בהצלחה</p>
                    <p className='text-[#8C8C8C] leading-relaxed'>
                        בקשת ההצטרפות שלך נמצאת בבדיקה. לאחר אישור הצוות תוכל להתחבר עם כתובת האימייל והסיסמה שבחרת.
                    </p>
                </div>
            )}

            {/* Inline login error (persists, not a toast) */}
            {loginError && (
                <div
                    className='w-full bg-[#fff5f5] border border-[#C0001A] rounded px-4 py-4 text-center text-sm text-[#C0001A]'
                    dir="rtl"
                    role="alert"
                    aria-live="assertive"
                >
                    <p className='leading-relaxed'>{loginError}</p>
                </div>
            )}

            {/* Register-only fields */}
            {isRegister && (
                <>
                    <label htmlFor='reg-name' className='sr-only'>שם מלא</label>
                    <input id='reg-name' onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-[#A3A5A1] rounded' placeholder='שם מלא' autoComplete='name' required />

                    <label htmlFor='reg-phone' className='sr-only'>מספר טלפון</label>
                    <input
                        id='reg-phone'
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                            setPhone(val)
                        }}
                        value={phone} type="tel" inputMode="numeric" className='w-full px-3 py-2 border border-[#A3A5A1] rounded' placeholder='מספר טלפון (10 ספרות)' autoComplete='tel' required
                    />

                    <label htmlFor='reg-business' className='sr-only'>שם העסק</label>
                    <input id='reg-business' onChange={(e) => setBusinessName(e.target.value)} value={businessName} type="text" className='w-full px-3 py-2 border border-[#A3A5A1] rounded' placeholder='שם העסק' autoComplete='organization' required />

                    <label htmlFor='reg-address' className='sr-only'>כתובת העסק</label>
                    <input id='reg-address' onChange={(e) => setBusinessAddress(e.target.value)} value={businessAddress} type="text" className='w-full px-3 py-2 border border-[#A3A5A1] rounded' placeholder='כתובת העסק' autoComplete='street-address' required />

                    <label htmlFor='reg-city' className='sr-only'>עיר</label>
                    <input id='reg-city' onChange={(e) => setCity(e.target.value)} value={city} type="text" className='w-full px-3 py-2 border border-[#A3A5A1] rounded' placeholder='עיר' autoComplete='address-level2' required />
                </>
            )}

            {/* Shared fields: email + password */}
            <label htmlFor='login-email' className='sr-only'>כתובת אימייל</label>
            <input id='login-email' onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-[#A3A5A1] rounded' placeholder='כתובת אימייל' autoComplete='email' required />

            <label htmlFor='login-password' className='sr-only'>סיסמה</label>
            <input id='login-password' onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-[#A3A5A1] rounded' placeholder='סיסמה (לפחות 8 תווים)' autoComplete={isRegister ? 'new-password' : 'current-password'} required />

            {/* Switch between login / register */}
            <div className='w-full flex justify-between text-sm mt-[-8px] text-[#8C8C8C]'>
                {!isRegister && (
                    <p className='cursor-pointer hover:text-[#C0001A] transition-colors'>שכחת סיסמה?</p>
                )}
                {!isRegister
                    ? <button type='button' onClick={() => setCurrentState('register')} className='cursor-pointer hover:text-[#C0001A] transition-colors'>הרשמה לחשבון חדש</button>
                    : <button type='button' onClick={() => setCurrentState('login')} className='cursor-pointer hover:text-[#C0001A] transition-colors'>יש לי כבר חשבון</button>
                }
            </div>

            {/* Approval notice (register only) */}
            {isRegister && (
                <p className='text-xs text-[#8C8C8C] text-center' role="note">
                    לאחר ההרשמה, החשבון יועבר לאישור מנהל לפני שתוכל להתחבר
                </p>
            )}

            {/* Submit button */}
            <button type='submit' className='bg-[#1A1A1A] text-white font-medium px-8 py-2 mt-4 cursor-pointer rounded hover:bg-[#C0001A] transition-colors w-full'>
                {isRegister ? 'הרשם' : 'התחבר'}
            </button>

        </form>
    )
}

export default Login