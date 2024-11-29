import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCBr50aP5VAjHUcV9zzbre74g6Lb7zBMXY",
  authDomain: "webcarros-784f0.firebaseapp.com",
  projectId: "webcarros-784f0",
  storageBucket: "webcarros-784f0.firebasestorage.app",
  messagingSenderId: "763338640351",
  appId: "1:763338640351:web:5e26d7da1b5612950ad26a"
};

const app = initializeApp(firebaseConfig);

const db= getFirestore(app)
const auth= getAuth(app)
const storage = getStorage(app)


export {db,auth,storage}

