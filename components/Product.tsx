import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const Product = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();

    const [hasPrime, setHasPrime] = useState<boolean>();
    useEffect(() => {
        setHasPrime(Math.random() > 0.5);
    });

    const addItemToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className='relative z-30 m-5 flex flex-col bg-white p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{product.category}</p>
            <Image className='mx-auto' src={product.image} height={200} width={200} style={{ objectFit: 'contain' }} alt='' />
            <h4 className='my-3'>{product.title}</h4>
            <div className='flex'>
                {Array.from({ length: Math.round(product.rating.rate) }).map((_, i) => (
                    <StarIcon key={i} className='h-5 text-yellow-500' />
                ))}
            </div>

            <p className='my-2 text-xs line-clamp-2'>{product.description}</p>
            <div className='mb-5'>${product.price}</div>

            {hasPrime && (
                <div className='-mt-5 flex items-center space-x-2'>
                    <img className='w-12' src='https://whitebox.com/wp-content/uploads/2020/05/Prime-tag-.png' alt='' />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}
            <button onClick={addItemToCart} className='button mt-auto'>
                Add to Cart
            </button>
        </div>
    );
};

export default Product;
