// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgErrBl_9jW3DhfG4Zy-hvMIPCBfx9l4c",
  authDomain: "teuxflowy.firebaseapp.com",
  databaseURL: "https://teuxflowy-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "teuxflowy",
  storageBucket: "teuxflowy.appspot.com",
  messagingSenderId: "288150461545",
  appId: "1:288150461545:web:6c3bdd0191c96b80c3d6f8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

