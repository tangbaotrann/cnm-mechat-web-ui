// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your we app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyATBlQ5dQJmtOtSI5_jB11zOJLdZzZd2d4',
    authDomain: 'chat-app-authen.firebaseapp.com',
    projectId: 'chat-app-authen',
    storageBucket: 'chat-app-authen.appspot.com',
    messagingSenderId: '956414253014',
    appId: '1:956414253014:web:67f39f3601c277d91a3677',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
