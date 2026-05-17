import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Archive from './pages/Archive'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PromoBanner from './components/PromoBanner'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <div className='w-full min-h-screen'>
      <ScrollToTop />
      <PromoBanner />
      <Navbar />
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-[140px]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Archive />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
