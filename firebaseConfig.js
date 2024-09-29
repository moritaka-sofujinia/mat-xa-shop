import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBLvevoHTMm0dgB4rRbL7ZHO9TsJyvPIXo",
  authDomain: "login-firebase-test-f6d67.firebaseapp.com",
  projectId: "login-firebase-test-f6d67",
  storageBucket: "login-firebase-test-f6d67.appspot.com",
  messagingSenderId: "1023326676331",
  appId: "1:1023326676331:web:4d525e0afec4365d5f582e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
// Initialize Firestore
export const db = getFirestore(app);
export { analytics };