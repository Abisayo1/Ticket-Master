// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa-7VRdjyCOzZlShYlVO-gwzQhT2rqN3A",
  authDomain: "ticket-master-d673c.firebaseapp.com",
  projectId: "ticket-master-d673c",
  storageBucket: "ticket-master-d673c.firebasestorage.app",
  messagingSenderId: "536512157183",
  appId: "1:536512157183:web:b122c9a32e6fbe900643ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);