// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const register = async (email, password) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        return user
    } catch (error){
        console.log(error.message)
    }
}

export const login = async (email, password) => {
 try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
 } catch (error){
    console.log(error.message);
 }
}

export const logout = async () => {
    try {
       await signOut(auth)
       return true
    } catch (error){
       console.log(error.message);
    }
}

export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const roomsRef = collection(firebaseDB, "rooms");
export default app;