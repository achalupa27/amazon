const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req: any, res: any) => {
    const { items, email } = req.body;

    const transformedItems = items.map((item: Product) => ({
        quantity: 1,
        price_data: {
            currency: 'usd',
            unit_amount: item.price * 100,
            product_data: {
                description: item.description,
                name: item.title,
                images: [item.image],
            },
        },
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_options: [{ shipping_rate: 'shr_1Mldv4LaX5vJi9FbxzrD9SaK' }],
        shipping_address_collection: {
            allowed_countries: ['CA', 'US'],
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item: Product) => item.image)),
        },
    });

    res.status(200).json({ id: session.id });
};
