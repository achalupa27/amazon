import { getSession, GetSessionParams, useSession } from 'next-auth/react';
import Header from '../components/Header';
import Order from '../components/Order';
import db from '../firebase';

const Orders = ({ orders }: { orders: any }) => {
    const { data: session } = useSession();

    console.log('orders: ', orders);

    return (
        <div>
            <Header />
            <main className='mx-auto max-w-screen-lg p-10'>
                <h1 className='mb-2 border-b border-yellow-400 pb-1 text-3xl'>Your Orders</h1>

                {session ? <h2>{orders.length} Orders</h2> : <h2>Please sign in to see your orders.</h2>}
                <div className='mt-5 space-y-4'>
                    {orders?.map((order: any) => (
                        <Order key={order.id} order={order} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Orders;

export async function getServerSideProps(context: GetSessionParams | undefined) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const session = await getSession(context);

    if (!session || !session.user) {
        return {
            props: {},
        };
    }

    const stripeOrders = await db
        .collection('users')
        .doc(session.user.email as string | undefined)
        .collection('orders')
        .get();

    const orders = await Promise.all(
        stripeOrders.docs.map(async (order: any) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            items: (await stripe.checkout.sessions.listLineItems(order.id, { limit: 100 })).data,
        }))
    );

    return {
        props: {
            orders,
        },
    };
}
