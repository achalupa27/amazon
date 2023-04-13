import Image from 'next/image';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { selectItems } from '../slices/cartSlice';
import { useSelector } from 'react-redux';

const Header = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);
    const handleSignIn = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        await signIn();
    };
    const handleSignOut = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        await signOut();
    };
    return (
        <header>
            <div className='flex flex-grow items-center bg-amazon_blue p-1 py-2'>
                <div className='link mt-2 flex flex-grow items-center sm:flex-grow-0 '>
                    <Image className='mr-2 cursor-pointer' src='https://www.nicepng.com/png/full/16-167642_amazon-logo-amazon-logo-white-text.png' width={150} height={40} style={{ objectFit: 'contain' }} alt='amazon logo' onClick={() => router.push('/')} />
                </div>
                <div className='hidden h-10 flex-grow cursor-pointer items-center rounded-md bg-yellow-400 hover:bg-yellow-500 sm:flex'>
                    <input className='h-full w-6 flex-shrink flex-grow rounded-l-md p-2 px-4 focus:outline-2' type='text'></input>
                    <MagnifyingGlassIcon className='h-12 p-4 ' />
                </div>
                <div className='mx-6 flex items-center space-x-6 whitespace-nowrap text-xs text-white'>
                    <div className='flex items-center'>
                        <p>USA</p>
                        <p className='font-bold md:text-sm'>EN</p>
                    </div>
                    <div onClick={!session ? handleSignIn : handleSignOut} className='link'>
                        {session ? `Hello, ${session?.user?.name}` : 'Hello, sign in'}
                        <p className='font-bold md:text-sm'>Account & lists</p>
                    </div>
                    <div className='link' onClick={() => router.push('/orders')}>
                        <p>Returns</p>
                        <p className='font-bold md:text-sm'>& Orders</p>
                    </div>
                    <div className='link relative flex items-end' onClick={() => router.push('/checkout')}>
                        <span className='absolute -top-1 -right-1 text-center text-lg font-bold leading-none text-orange-500 md:right-6'>{items.length}</span>
                        <ShoppingCartIcon className='h-8 md:h-10' />
                        <p className='hidden font-bold md:inline md:text-sm'>Cart</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center space-x-3 bg-amazon_blue-light p-2 pl-6 text-sm text-white'>
                <p className='link flex items-center font-bold'>
                    <Bars3Icon className='h-6' />
                    All
                </p>
                <p className='link'>Today's Deals</p>
                <p className='link'>Customer Service</p>
                <p className='link'>Registry</p>
                <p className='link'>Gift Cards</p>
                <p className='link'>Sell</p>
            </div>
        </header>
    );
};

export default Header;
