// import firebase from "firebase/app";
// import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyALgJNMITGUO12YSBbgPvOrdihvXW0-3L4",
  authDomain: "stockmarket09.firebaseapp.com",
  databaseURL: "https://stockmarket09-default-rtdb.firebaseio.com",
  projectId: "stockmarket09",
  storageBucket: "stockmarket09.appspot.com",
  messagingSenderId: "406396332810",
  appId: "1:406396332810:web:c384836f3470c32a80a8f3"

};

// Initialize Firebase

// export default firebaseConfig;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

