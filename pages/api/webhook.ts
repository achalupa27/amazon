import { buffer } from 'micro';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
// const serviceAccount = require('../../permissions.json');
admin.initializeApp({
    credential: admin.credential.cert({
        type: 'service_account',
        project_id: 'fir-aca17',
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID, // need to replace with values when deploying since on server
        private_key: process.env.FIREBASE_PRIVATE_KEY, // need to replace with values when deploying since on server
        client_email: 'firebase-adminsdk-qk3sl@fir-aca17.iam.gserviceaccount.com',
        client_id: '115425424742947257512',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qk3sl%40fir-aca17.iam.gserviceaccount.com',
    } as ServiceAccount),
});

const fulfillOrder = async (session: any) => {
    console.log('Fulfilling order', session);

    return admin
        .firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection('orders')
        .doc(session.id)
        .set({ amount: session.amount_total / 100, amount_shipping: session.total_details.amount_shipping / 100, images: JSON.parse(session.metadata.images) })
        .then(() => {
            console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
        });
};

// Establish connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async (req: any, res: any) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const signature = req.headers['stripe-signature'];

        let event;

        // Verify that the event came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
        } catch (err: any) {
            console.log('ERROR', err.message);
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        // Handle the checkout session completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            return fulfillOrder(session)
                .then(() => res.status(200))
                .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
        }
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};
