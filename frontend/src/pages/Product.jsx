import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, formatPrice, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const navigate = useNavigate();

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
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Back button */}
      <button
        onClick={() => navigate('/collection')}
        className='mb-6 flex items-center gap-2 text-sm text-[#8C8C8C] hover:text-[#C0001A] transition-colors'
      >
        <span>←</span>
        <span>חזרה לקטלוג</span>
      </button>

      {/* Product Data */}
      <div className='flex gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
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
          <p className='mt-5 text-3xl font-medium text-[#C0001A]'>{formatPrice(productData.price)}</p>
          <p className='mt-5 text-[#8C8C8C] md:w-4/5 leading-relaxed'>{productData.description}</p>

          <button
            onClick={() => addToCart(productData._id, 'default')}
            className='mt-8 bg-[#1A1A1A] text-white px-8 py-3 text-sm hover:bg-[#C0001A] transition-colors cursor-pointer rounded'
          >
            הוסף לסל
          </button>

          <hr className='mt-8 sm:w-4/5 border-[#F5F5F0]' />

          <div className='text-sm text-[#8C8C8C] mt-5 flex flex-col gap-2'>
            <p>✅ מוצר מקורי ומקצועי</p>
            <p>🚚 משלוח מהיר לכל הארץ</p>
            <p>📞 תמיכה מקצועית לכל שאלה</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm bg-[#1A1A1A] text-white'>תיאור המוצר</b>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-[#8C8C8C] leading-relaxed'>
          <p>{productData.description}</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product