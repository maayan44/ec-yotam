import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

  const { products, productsLoading } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <div className='my-10 w-full'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'הנמכרים'} text2={'ביותר'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#8C8C8C]'>
          מוצרי טיפוח לרכב לכל צורך
        </p>
      </div>
      {productsLoading ? (
        <div className='flex flex-col items-center justify-center py-16 gap-4'>
          <div
            className='w-10 h-10 rounded-full border-2 border-[#F5F5F0] border-t-[#C0001A]'
            style={{ animation: 'spin 0.75s linear infinite' }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 gap-y-6'>
          {bestSeller.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BestSeller