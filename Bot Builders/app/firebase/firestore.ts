"use client"

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./config"

// User profile functions
export const createUserProfile = async (userId: string, userData: any) => {
  try {
    await addDoc(collection(db, "users"), {
      userId,
      ...userData,
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error creating user profile:", error)
    throw error
  }
}

export const getUserProfile = async (userId: string) => {
  try {
    const q = query(collection(db, "users"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() }
    }

    return null
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}

// Medication functions
export const addMedication = async (userId: string, medicationData: any) => {
  try {
    return await addDoc(collection(db, "medications"), {
      userId,
      ...medicationData,
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error adding medication:", error)
    throw error
  }
}

export const getUserMedications = async (userId: string) => {
  try {
    const q = query(collection(db, "medications"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting medications:", error)
    throw error
  }
}

export const updateMedication = async (medicationId: string, medicationData: any) => {
  try {
    const medicationRef = doc(db, "medications", medicationId)
    await updateDoc(medicationRef, {
      ...medicationData,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating medication:", error)
    throw error
  }
}

export const deleteMedication = async (medicationId: string) => {
  try {
    const medicationRef = doc(db, "medications", medicationId)
    await deleteDoc(medicationRef)
  } catch (error) {
    console.error("Error deleting medication:", error)
    throw error
  }
}

// Order functions
export const createOrder = async (userId: string, orderData: any) => {
  try {
    return await addDoc(collection(db, "orders"), {
      userId,
      ...orderData,
      status: "pending",
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export const getUserOrders = async (userId: string) => {
  try {
    const q = query(collection(db, "orders"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting orders:", error)
    throw error
  }
}

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const orderRef = doc(db, "orders", orderId)
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating order status:", error)
    throw error
  }
}

// Adherence tracking functions
export const recordMedicationTaken = async (userId: string, medicationId: string) => {
  try {
    return await addDoc(collection(db, "adherence"), {
      userId,
      medicationId,
      takenAt: serverTimestamp(),
      status: "taken",
    })
  } catch (error) {
    console.error("Error recording medication taken:", error)
    throw error
  }
}

export const getUserAdherenceData = async (userId: string, startDate: Date, endDate: Date) => {
  try {
    const q = query(
      collection(db, "adherence"),
      where("userId", "==", userId),
      where("takenAt", ">=", Timestamp.fromDate(startDate)),
      where("takenAt", "<=", Timestamp.fromDate(endDate)),
    )

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting adherence data:", error)
    throw error
  }
}

