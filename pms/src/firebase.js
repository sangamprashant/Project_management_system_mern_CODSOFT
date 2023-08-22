// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDl1XaCoaQx6rPTVPDowC4_xeIm-_XBXu0",
    authDomain: "projectmanagementsystem-98896.firebaseapp.com",
    projectId: "projectmanagementsystem-98896",
    storageBucket: "projectmanagementsystem-98896.appspot.com",
    messagingSenderId: "680085509989",
    appId: "1:680085509989:web:b9e4a04435c3accbd6738c"
  };  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const storage =getStorage(app);