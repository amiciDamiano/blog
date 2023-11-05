// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcqB4jQ6vV9onOZoRi3AWSYjTvXwfRIIg",
  authDomain: "blog-6386c.firebaseapp.com",
  projectId: "blog-6386c",
  storageBucket: "blog-6386c.appspot.com",
  messagingSenderId: "337396573694",
  appId: "1:337396573694:web:4b22821a350623aa950caf",
  measurementId: "G-HEVRCR624V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const authentication = getAuth(app);