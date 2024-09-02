// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: import {getStorage} from "firebase/storage"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_m2YWZkeugPgx-xgO5BPtk1KvEBNsSIk",
  authDomain: "byte-master.firebaseapp.com",
  projectId: "byte-master",
  storageBucket: "byte-master.appspot.com",
  messagingSenderId: "718780610384",
  appId: "1:718780610384:web:152065799ae7025d5ede55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
// al final export const storage = getStorage(app)