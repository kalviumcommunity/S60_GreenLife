import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI5NxfTy0zoy1M3-r_lex8o-cQ8ynD2-c",
  authDomain: "greenlife-c4290.firebaseapp.com",
  projectId: "greenlife-c4290",
  storageBucket: "greenlife-c4290.appspot.com",
  messagingSenderId: "372610261079",
  appId: "1:372610261079:web:ff4ec5e23b756bdfe94312",
  measurementId: "G-BXTLR5RMSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export default app;
// const analytics = getAnalytics(app);