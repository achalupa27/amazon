import Header from '../components/Header';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

const Success = () => {
    const router = useRouter();

    return (
        <div className='h-screen bg-gray-100'>
            <Header />

            <main className='mx-auto max-w-screen-2xl'>
                <div className='flex flex-col bg-white p-10'>
                    <div className='mb-5 flex items-center space-x-2'>
                        <CheckCircleIcon className='h-10 text-green-600' />
                        <h1 className='text-3xl'>Thank you, your order has been placed.</h1>
                    </div>
                    <p>Thank you for placng your order. We'll send you a confirmation email once your order has shipped. If you would like to see your orders, please press the button below.</p>
                    <button className='button mt-8' onClick={() => router.push('/orders')}>
                        Go to my orders
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Success;
