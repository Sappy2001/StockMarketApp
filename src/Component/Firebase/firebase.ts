// import firebase from "firebase/app";
// import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDyeoQyHcqawni5Q6uUJPR1pXIiyu1PEX8",
	authDomain: "fir-noteproject-d5a99.firebaseapp.com",
	projectId: "fir-noteproject-d5a99",
	storageBucket: "fir-noteproject-d5a99.firebasestorage.app",
	messagingSenderId: "832892069960",
	appId: "1:832892069960:web:ebf17c170b6ca4d2e9507d",
	measurementId: "G-XLSJL3VNVR",
};
// Initialize Firebase

// export default firebaseConfig;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
