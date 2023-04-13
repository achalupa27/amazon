import Header from '../components/Header';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/cartSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key as string);

const Checkout = () => {
    const { data: session } = useSession();
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        const checkoutSession = await axios.post(`/api/create-checkout-session`, {
            items,
            email: session?.user?.email,
        });

        const result = await stripe?.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });

        if (result?.error) {
            alert(result.error);
        }
    };

    return (
        <div className='bg-gray-100'>
            <Header />
            <main className='mx-auto max-w-screen-2xl lg:flex'>
                <div className='m-5 flex-grow shadow-sm'>
                    <Image src='https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png' width={1020} height={250} style={{ objectFit: 'contain' }} alt='' />
                    <div className='flex flex-col space-y-10 bg-white p-5'>
                        <h1 className='border-b pb-4 text-3xl'>{items.length === 0 ? 'Your Cart is empty.' : 'Your Cart'}</h1>
                        {items.map((item: Product) => (
                            <CheckoutProduct key={item.id} product={item} />
                        ))}
                    </div>
                </div>
                {items.length > 0 && (
                    <div className='flex flex-col bg-white p-10 shadow-md'>
                        <>
                            <h2 className='whitespace-nowrap'>
                                Subtotal ({items.length} items): <span className='font-bold'>${total}</span>
                            </h2>
                            <button role='link' onClick={createCheckoutSession} className={`button mt-2 ${!session && 'cursor-not-allowed bg-gray-300 text-gray-500'}`}>
                                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                            </button>
                        </>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Checkout;
