import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyD1r2whW2-LGxA-p6KxTr3Im4iYtJZLryA",
  authDomain: "disney-plus-clone-2b26c.firebaseapp.com",
  databaseURL: "https://disney-plus-clone-2b26c-default-rtdb.firebaseio.com",
  projectId: "disney-plus-clone-2b26c",
  storageBucket: "disney-plus-clone-2b26c.appspot.com",
  messagingSenderId: "529339614563",
  appId: "1:529339614563:web:7792fc182377d3bcebff56",
  measurementId: "G-04S1Y04RSF"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
console.log(process.env.REACT_APP_FIREBASE_API_KEY);


export { auth, provider};
export default db;
