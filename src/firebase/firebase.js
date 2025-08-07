import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyByhfeLjUesu7vbu9RelkEqdWcAkijoTCM",
//   authDomain: "onlinenikkah-482ea.firebaseapp.com",
//   projectId: "onlinenikkah-482ea",
//   storageBucket: "onlinenikkah-482ea.appspot.com",
//   messagingSenderId: "448227251970",
//   appId: "1:448227251970:web:db2315079d1505dfdf141b"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDG_DtphXlB4MSu4CEQ7bK66z9njz8861A",
  authDomain: "islamic-rishta.firebaseapp.com",
  projectId: "islamic-rishta",
  storageBucket: "islamic-rishta.firebasestorage.app",
  messagingSenderId: "353899960988",
  appId: "1:353899960988:web:722b38e24d648d46822b59",
  measurementId: "G-0ER2KZYCFS"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
