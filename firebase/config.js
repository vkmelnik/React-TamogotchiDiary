// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyW_hdS7-hjkFGVOIxa1RuC5HT92v-wQ0",
    authDomain: "tamogotchidiary.firebaseapp.com",
    projectId: "tamogotchidiary",
    storageBucket: "tamogotchidiary.appspot.com",
    messagingSenderId: "602971183345",
    appId: "1:602971183345:web:5af22784719c36d9dd3150"
  };

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const auth = firebase.auth();
const db = getFirestore(app);

export {auth, app, db, getFirestore, doc, setDoc, getDoc};
