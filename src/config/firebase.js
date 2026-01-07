import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// TODO: Replace with your actual config values or use environment variables
const firebaseConfig = {
    apiKey: "AIzaSyA9zpMXYhN82wBiny75T3Rf32U7l55CEu0",
    authDomain: "deebee-shop.firebaseapp.com",
    projectId: "deebee-shop",
    storageBucket: "deebee-shop.appspot.com",
    messagingSenderId: "388424027848",
    appId: "1:388424027848:web:16a9062a542dd2d0101ffd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
