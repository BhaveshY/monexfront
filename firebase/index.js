// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKaLiGVkcybAK4K9rznwrSsk2tiuk9jsc",
    authDomain: "expense-tracker---v1.firebaseapp.com",
    projectId: "expense-tracker---v1",
    storageBucket: "expense-tracker---v1.appspot.com",
    messagingSenderId: "896819904949",
    appId: "1:896819904949:web:47481b7a6ac45c389bd9fc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export  {auth,db}
