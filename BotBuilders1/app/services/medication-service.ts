"use client"

import { useAuth } from "../context/auth-context"

export type Medication = {
  id?: string
  name: string
  dosage: string
  frequency: string
  time: string[]
  startDate: Date
  endDate?: Date
  notes?: string
  userId: string
  createdAt?: any
  lastTaken?: Date
  adherenceRate?: number
}

// Mock medications data
const DEMO_MEDICATIONS: Medication[] = [
  {
    id: "med1",
    name: "Paracetamol",
    dosage: "500mg",
    frequency: "Twice daily",
    time: ["08:00", "20:00"],
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    userId: "demo-user-123",
    adherenceRate: 95,
    lastTaken: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: "med2",
    name: "Vitamin D3",
    dosage: "1000 IU",
    frequency: "Once daily",
    time: ["09:00"],
    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    userId: "demo-user-123",
    adherenceRate: 88,
    lastTaken: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "med3",
    name: "Cetirizine",
    dosage: "10mg",
    frequency: "Once daily",
    time: ["22:00"],
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    userId: "demo-user-123",
    adherenceRate: 100,
    lastTaken: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    notes: "Take only when needed for allergies",
  },
]

export const useMedicationService = () => {
  const { user } = useAuth()

  const addMedication = async (medication: Omit<Medication, "id" | "userId" | "createdAt">) => {
    if (!user) throw new Error("User not authenticated")

    // Simulate adding medication
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newId = `med${Date.now()}`
    const newMedication = {
      ...medication,
      id: newId,
      userId: user.uid,
      createdAt: { seconds: Date.now() / 1000 },
      adherenceRate: 100,
    }
    DEMO_MEDICATIONS.push(newMedication)
    return newId
  }

  const getUserMedications = async () => {
    if (!user) throw new Error("User not authenticated")

    // Simulate fetching medications
    await new Promise((resolve) => setTimeout(resolve, 500))
    return DEMO_MEDICATIONS.filter((med) => med.userId === user.uid)
  }

  const getMedication = async (id: string) => {
    // Simulate fetching a medication
    await new Promise((resolve) => setTimeout(resolve, 300))
    const medication = DEMO_MEDICATIONS.find((med) => med.id === id)
    if (medication) {
      return medication
    }
    throw new Error("Medication not found")
  }

  const updateMedication = async (id: string, medication: Partial<Medication>) => {
    // Simulate updating a medication
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = DEMO_MEDICATIONS.findIndex((med) => med.id === id)
    if (index !== -1) {
      DEMO_MEDICATIONS[index] = { ...DEMO_MEDICATIONS[index], ...medication }
    }
  }

  const deleteMedication = async (id: string) => {
    // Simulate deleting a medication
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = DEMO_MEDICATIONS.findIndex((med) => med.id === id)
    if (index !== -1) {
      DEMO_MEDICATIONS.splice(index, 1)
    }
  }

  const recordMedicationTaken = async (id: string) => {
    // Simulate recording medication taken
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = DEMO_MEDICATIONS.findIndex((med) => med.id === id)
    if (index !== -1) {
      DEMO_MEDICATIONS[index].lastTaken = new Date()
    }
  }

  return {
    addMedication,
    getUserMedications,
    getMedication,
    updateMedication,
    deleteMedication,
    recordMedicationTaken,
  }
}

