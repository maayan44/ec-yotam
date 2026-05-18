import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, currentProductId }) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => item.category === category);
            productsCopy = productsCopy.filter((item) => item._id !== currentProductId);
            setRelated(productsCopy.slice(0, 5));
        }
    }, [products, category, currentProductId])

    return (
        related.length > 0 ? (
            <div className='my-24'>
                <div className='text-center text-3xl py-2'>
                    <Title text1={'מוצרים'} text2={'דומים'} />
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 gap-y-6 justify-center justify-items-center'>
                    {related.map((item, index) => (
                        <div key={index} className='max-w-[180px] mx-auto'>
                            <ProductItem
                                id={item._id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        ) : null
    )
}

export default RelatedProducts