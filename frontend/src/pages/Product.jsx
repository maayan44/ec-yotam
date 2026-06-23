import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, formatPrice, addToCart, token, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [quantity, setQuantity] = useState(1)

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
    setQuantity(1)
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      <button
        onClick={() => navigate('/collection')}
        className='mb-6 flex items-center gap-2 text-sm text-[#8C8C8C] hover:text-[#C0001A] transition-colors'
      >
        <span>←</span>
        <span>חזרה לקטלוג</span>
      </button>

      <div className='flex gap-12 flex-col sm:flex-row'>

        {/* Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border hover:border-[#C0001A] transition-colors'
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          {token
            ? <p className='mt-5 text-3xl font-medium text-[#C0001A]'>{formatPrice(productData.price)}</p>
            : <p className='mt-5 text-lg text-[#8C8C8C]'>התחבר לצפייה במחיר</p>
          }
          <p className='mt-5 text-[#8C8C8C] md:w-4/5 leading-relaxed'>{productData.description}</p>

          <hr className='mt-8 sm:w-4/5 border-[#F5F5F0]' />

          {/* Quantity + Add to cart */}
          <div className='mt-6 flex items-center gap-0' dir="rtl">
            <button
              onClick={() => {
                if (!token) {
                  toast.error('יש להתחבר כדי להוסיף מוצרים לסל')
                  navigate('/login')
                  return
                }
                addToCart(productData._id, 'default', quantity)
              }}
              className='h-11 bg-[#1A1A1A] text-white text-sm font-medium rounded-r-full hover:bg-[#333] transition-colors cursor-pointer px-8'
              style={{ fontFamily: 'Heebo, sans-serif' }}
            >
              הוסף לסל
            </button>

            <div className='group relative flex items-center justify-center h-11 w-20 bg-white border border-[#1A1A1A] rounded-l-full cursor-default select-none overflow-hidden'>
              <div className='flex items-center gap-1'>
                <span className='text-sm font-medium text-[#1A1A1A]'>{quantity}</span>
                <div className='flex flex-col opacity-0 group-hover:opacity-100 transition-opacity'>
                  <button
                    onMouseDown={(e) => { e.preventDefault(); setQuantity(prev => prev + 1) }}
                    className='flex items-center justify-center w-5 h-5 text-[10px] text-[#1A1A1A] hover:text-[#C0001A] transition-colors leading-none cursor-pointer'
                    style={{ lineHeight: 1 }}
                  >
                    ▲
                  </button>
                  <button
                    onMouseDown={(e) => { e.preventDefault(); setQuantity(prev => Math.max(1, prev - 1)) }}
                    className='flex items-center justify-center w-5 h-5 text-[10px] text-[#1A1A1A] hover:text-[#C0001A] transition-colors leading-none cursor-pointer'
                    style={{ lineHeight: 1 }}
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className='text-sm text-[#8C8C8C] mt-6 flex flex-col gap-2'>
            <p>✅ מוצר מקורי ומקצועי</p>
            <p>🚚 משלוח מהיר לכל הארץ</p>
            <p>📞 תמיכה מקצועית לכל שאלה</p>
          </div>
        </div>
      </div>

      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm bg-[#1A1A1A] text-white'>תיאור המוצר</b>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-[#8C8C8C] leading-relaxed'>
          <p>{productData.description}</p>
        </div>
      </div>

      <RelatedProducts category={productData.category} currentProductId={productId} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product