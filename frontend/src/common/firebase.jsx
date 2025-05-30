// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw3t6DZe3rWddhbrJcDHvEwVAlLf-01_k",
  authDomain: "blogging-website-ae86c.firebaseapp.com",
  projectId: "blogging-website-ae86c",
  storageBucket: "blogging-website-ae86c.firebasestorage.app",
  messagingSenderId: "522485306173",
  appId: "1:522485306173:web:157565faf1fb9ab27d2b54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // ✅ return the user object
  } catch (err) {
    console.error("Google auth error:", err);
    throw err; // rethrow the error so caller can catch it
  }
};


