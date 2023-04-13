import type { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import ProductFeed from '../components/ProductFeed';

const Home: NextPage<{ products: Product[] }> = ({ products }) => {
    console.log('products home:', products);
    return (
        <div className='h-screen bg-gray-100'>
            <Head>
                <title>Amazon</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header />

            <main className='mx-auto max-w-screen-2xl'>
                <Banner />

                <ProductFeed products={products} />
            </main>
        </div>
    );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);
    const products = await fetch('https://fakestoreapi.com/products').then((res) => res.json());
    return { props: { products, session } };
}
