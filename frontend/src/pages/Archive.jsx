import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets/assets.js'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Archive = () => {
  const { products, search, showSearch, productsLoading } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant')

  // Read category from URL param on load
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setCategory([decodeURIComponent(categoryParam)])
    }
  }, [searchParams])

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    setFilterProducts(productsCopy)
  }

  const sortProducts = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)))
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)))
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products])

  useEffect(() => {
    sortProducts();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-t-[#A3A5A1]'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          סינון
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-[#A3A5A1] pr-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium pr-5'>קטגוריות</p>
          <div className='flex flex-col gap-2 text-sm font-light text-[#535551] pr-5'>
            {['אביזרי עזר', 'חומרי עזר', 'נוזלי ניקוי', 'מוצרי ריח', 'אביזרים למכשירים'].map((cat) => (
              <p key={cat} className='flex gap-2 items-center'>
                <input
                  className='w-3'
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                />
                {cat}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'כל'} text2={'המוצרים'} />

          {/* Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-[#A3A5A1] text-sm px-2'>
            <option value="relevant">מיון: רלוונטי</option>
            <option value="low-high">מחיר: נמוך לגבוה</option>
            <option value="high-low">מחיר: גבוה לנמוך</option>
          </select>
        </div>

        {/* Map Products */}
        {productsLoading ? (
          <div className='col-span-full flex flex-col items-center justify-center py-24 gap-4'>
            <div
              className='w-10 h-10 rounded-full border-2 border-[#F5F5F0] border-t-[#C0001A]'
              style={{ animation: 'spin 0.75s linear infinite' }}
            />
            <p className='text-sm text-[#8C8C8C]' style={{ fontFamily: 'Heebo, sans-serif' }}>
              טוען מוצרים...
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filterProducts.map((item) => (
              <ProductItem key={item._id} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Archive