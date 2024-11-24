import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBh3Ea7J8kr5CYpA3qep4_eEGwl7s8xUO8",
  authDomain: "reactlinksv1.firebaseapp.com",
  projectId: "reactlinksv1",
  storageBucket: "reactlinksv1.firebasestorage.app",
  messagingSenderId: "587630792848",
  appId: "1:587630792848:web:da539772507889889bc815"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db}
