import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDajgv7IOSMUugIUXzmAHwA8QibV8HM9Go",
  authDomain: "manzil-drive-232e3.firebaseapp.com",
  projectId: "manzil-drive-232e3",
  storageBucket: "manzil-drive-232e3.appspot.com", // ✅ correct domain
  messagingSenderId: "869549658301",
  appId: "1:869549658301:web:3d9aff5ac8cdc5f516a7d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Setup Firebase Auth and Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Export both for use in Login.js
export { auth, googleProvider };
