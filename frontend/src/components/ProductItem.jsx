import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {

    const { formatPrice } = useContext(ShopContext);

  return (
    <Link className='text-[#1A1A1A] cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden'>
          <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
        </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium text-[#C0001A]'>{formatPrice(price)}</p>
    </Link>
  )
}

export default ProductItem