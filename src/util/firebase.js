// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your we app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDRjLuTfjjBWAmUn8YmG0IE48VfCBHJm54',
    authDomain: 'otp-chat-45f02.firebaseapp.com',
    projectId: 'otp-chat-45f02',
    storageBucket: 'otp-chat-45f02.appspot.com',
    messagingSenderId: '445148443097',
    appId: '1:445148443097:web:d9dd87417bd459ac5729c8',
    measurementId: 'G-EVDW3LDZJG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
