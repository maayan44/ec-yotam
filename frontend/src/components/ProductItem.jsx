import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {

    const { formatPrice, token } = useContext(ShopContext);

  return (
    <Link className='text-[#1A1A1A] cursor-pointer block w-full' to={`/product/${id}`} aria-label={`${name}${token ? `, ${formatPrice(price)}` : ''}`}>
        <div className='overflow-hidden w-full'>
          <img className='w-full h-auto hover:scale-110 transition ease-in-out' src={image[0]} alt={name} />
        </div>
      <p className='pt-3 pb-1 text-sm' aria-hidden="true">{name}</p>
      {token
        ? <p className='text-sm font-medium text-[#C0001A]' aria-hidden="true">{formatPrice(price)}</p>
        : <p className='text-sm text-[#8C8C8C]' aria-hidden="true">התחבר לצפייה במחיר</p>
      }
    </Link>
  )
}

export default ProductItem