// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your we app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAc5R48XRDx2jxyGscKmfCZUqcdpnnmWCw',
    authDomain: 'chat-app-50a48.firebaseapp.com',
    projectId: 'chat-app-50a48',
    storageBucket: 'chat-app-50a48.appspot.com',
    messagingSenderId: '294060158276',
    appId: '1:294060158276:web:078b5bdf1d9c232c56bb11',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
