import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkW4tdJfX4vq0Sr0Xwm5ftiHhDCP439Uk",
  authDomain: "memory-capsule-f1aff.firebaseapp.com",
  projectId: "memory-capsule-f1aff",
  storageBucket: "memory-capsule-f1aff.appspot.com",
  messagingSenderId: "577514233980",
  appId: "1:577514233980:web:d5d4be992129a57778e9f9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
