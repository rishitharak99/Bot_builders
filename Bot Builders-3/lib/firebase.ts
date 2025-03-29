// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore"

// Your web app's Firebase configuration
// For demonstration purposes only - in production, use environment variables
const firebaseConfig = {
  apiKey: "AIzaSyBFZAxO03UGRaSlOIPOdPKRr_Kqt2aym10",
  authDomain: "builders-b2238.firebaseapp.com",
  projectId: "builders-b2238",
  storageBucket: "builders-b2238.firebasestorage.app",
  messagingSenderId: "322161732972",
  appId: "1:322161732972:web:bbfe494a502afafa64d749",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// User management functions
export async function registerUser(email: string, password: string, userData: any) {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with display name
    if (userData.firstName && userData.lastName) {
      await updateProfile(user, {
        displayName: `${userData.firstName} ${userData.lastName}`,
      })
    }

    // Store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return { success: true, user }
  } catch (error) {
    return { success: false, error }
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    return { success: false, error }
  }
}

export async function getUserData(userId: string) {
  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() }
    } else {
      return { success: false, error: "No user data found" }
    }
  } catch (error) {
    return { success: false, error }
  }
}

export async function updateUserData(userId: string, userData: any) {
  try {
    const docRef = doc(db, "users", userId)
    await updateDoc(docRef, {
      ...userData,
      updatedAt: new Date(),
    })

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export { auth, db }

