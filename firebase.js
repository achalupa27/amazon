import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'fir-aca17.firebaseapp.com',
    projectId: 'fir-aca17',
    storageBucket: 'fir-aca17.appspot.com',
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
