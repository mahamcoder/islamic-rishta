import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyByhfeLjUesu7vbu9RelkEqdWcAkijoTCM",
    authDomain: "onlinenikkah-482ea.firebaseapp.com",
    projectId: "onlinenikkah-482ea",
    storageBucket: "onlinenikkah-482ea.appspot.com", // <-- FIXED HERE
    messagingSenderId: "448227251970",
    appId: "1:448227251970:web:db2315079d1505dfdf141b"
  };


  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  