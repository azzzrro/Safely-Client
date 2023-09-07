// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: import.meta.env.VITE_HDOMAIN,
  projectId: import.meta.env.VITE_JECTID,
  storageBucket: import.meta.env.VITE_RAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_SAGING_SENDER_ID,
  appId: import.meta.env.VITE_ID
};

const Firebase = initializeApp(firebaseConfig)
const auth = getAuth(Firebase)
// Initialize Firebase
export {Firebase,auth}