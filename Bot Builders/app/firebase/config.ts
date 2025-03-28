// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBFZAxO03UGRaSlOIPOdPKRr_Kqt2aym10",
  authDomain: "builders-b2238.firebaseapp.com",
  projectId: "builders-b2238",
  storageBucket: "builders-b2238.firebasestorage.app",
  messagingSenderId: "322161732972",
  appId: "1:322161732972:web:bbfe494a502afafa64d749",
}

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app

