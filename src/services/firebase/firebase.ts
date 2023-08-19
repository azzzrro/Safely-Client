// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2TauaY5bkGAiZmG6k8RL2maiVn-GhYIU",
  authDomain: "safely-35bb0.firebaseapp.com",
  projectId: "safely-35bb0",
  storageBucket: "safely-35bb0.appspot.com",
  messagingSenderId: "588261848664",
  appId: "1:588261848664:web:12d5f401f02eceb8343c2d"
};

const Firebase = initializeApp(firebaseConfig)
const auth = getAuth(Firebase)
// Initialize Firebase
export {Firebase,auth}