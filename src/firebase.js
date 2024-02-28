import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1r2whW2-LGxA-p6KxTr3Im4iYtJZLryA",
  authDomain: "disney-plus-clone-2b26c.firebaseapp.com",
  projectId: "disney-plus-clone-2b26c",
  storageBucket: "disney-plus-clone-2b26c.appspot.com",
  messagingSenderId: "529339614563",
  appId: "1:529339614563:web:7792fc182377d3bcebff56",
  measurementId: "G-04S1Y04RSF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
