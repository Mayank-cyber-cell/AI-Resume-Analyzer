import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAIdo0nfdoLv63zJymIU2KxbYXAmBSSg7Q",
  authDomain: "ai-resume-analyzer-63e6d.firebaseapp.com",
  projectId: "ai-resume-analyzer-63e6d",
  storageBucket: "ai-resume-analyzer-63e6d.firebasestorage.app",
  messagingSenderId: "475231111875",
  appId: "1:475231111875:web:777e7ee9b89c02117d7076",
  measurementId: "G-CCZ14GBH7V"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};