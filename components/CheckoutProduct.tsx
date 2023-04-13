import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CheckoutProduct = ({ product }: { product: Product }) => {
    const [hasPrime, setHasPrime] = useState<boolean>();
    useEffect(() => {
        setHasPrime(Math.random() > 0.5);
    });

    const dispatch = useDispatch();
    const addItemToCart = () => {
        dispatch(addToCart(product));
    };
    const removeItemFromCart = () => {
        dispatch(removeFromCart(product.id));
    };

    return (
        <div className='grid grid-cols-5'>
            <Image src={product.image} height={200} width={200} style={{ objectFit: 'contain' }} alt='' />
            <div className='col-span-3 mx-5'>
                <p>{product.title}</p>
                <div className='flex'>
                    {Array.from({ length: Math.round(product.rating.rate) }).map((_, i) => (
                        <StarIcon key={i} className='h-5 text-yellow-500' />
                    ))}
                </div>
                <p className='my-2 text-xs line-clamp-3'>{product.description}</p>
                <p>${product.price}</p>

                {hasPrime && (
                    <div className='flex items-center space-x-2'>
                        <img className='w-12' src='https://whitebox.com/wp-content/uploads/2020/05/Prime-tag-.png' alt='' />
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )}
            </div>
            <div className='my-auto flex flex-col space-y-2 justify-self-end'>
                <button className='button' onClick={addItemToCart}>
                    Add to Basket
                </button>
                <button className='button' onClick={removeItemFromCart}>
                    Remove from Basket
                </button>
            </div>
        </div>
    );
};

export default CheckoutProduct;
