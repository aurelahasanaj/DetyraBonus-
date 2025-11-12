
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAedu2b3YAPUovGbvrYF20YTGDH5EfVR7Q",
  authDomain: "findlostthings-bonus.firebaseapp.com",
  projectId: "findlostthings-bonus",
  storageBucket: "findlostthings-bonus.firebasestorage.app",
  messagingSenderId: "483733675535",
  appId: "1:483733675535:web:7027069acfbd1d74084d7a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
