import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDsnGA1w0j9gfgtiHXCAZY9Te4LQDT4tvs",
  authDomain: "messenger-app-84ff4.firebaseapp.com",
  projectId: "messenger-app-84ff4",
  storageBucket: "messenger-app-84ff4.appspot.com",
  messagingSenderId: "505908968825",
  appId: "1:505908968825:web:7821ea143b1c71d8e1c3a8",
  measurementId: "G-VKDWS20PMX",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
