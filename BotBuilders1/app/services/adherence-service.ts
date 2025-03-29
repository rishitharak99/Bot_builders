"use client"

import { useAuth } from "../context/auth-context"

export type AdherenceRecord = {
  id?: string
  userId: string
  medicationId: string
  medicationName: string
  scheduled: Date
  taken: Date | null
  status: "taken" | "missed" | "pending"
  createdAt?: any
}

export type AdherenceStats = {
  totalDoses: number
  takenDoses: number
  missedDoses: number
  adherenceRate: number
  weeklyAdherence: {
    day: string
    rate: number
  }[]
}

// Mock adherence records
const DEMO_ADHERENCE_RECORDS: AdherenceRecord[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - i)

  return {
    id: `record-${i}`,
    userId: "demo-user-123",
    medicationId: `med-${(i % 3) + 1}`,
    medicationName: ["Paracetamol", "Vitamin D", "Cetirizine"][i % 3],
    scheduled: date,
    taken: Math.random() > 0.1 ? date : null,
    status: Math.random() > 0.1 ? "taken" : "missed",
    createdAt: { seconds: date.getTime() / 1000 },
  }
})

// Mock adherence stats
const DEMO_ADHERENCE_STATS: AdherenceStats = {
  totalDoses: 60,
  takenDoses: 54,
  missedDoses: 6,
  adherenceRate: 90,
  weeklyAdherence: [
    { day: "Sunday", rate: 100 },
    { day: "Monday", rate: 100 },
    { day: "Tuesday", rate: 75 },
    { day: "Wednesday", rate: 100 },
    { day: "Thursday", rate: 100 },
    { day: "Friday", rate: 75 },
    { day: "Saturday", rate: 80 },
  ],
}

export const useAdherenceService = () => {
  const { user } = useAuth()

  const recordAdherence = async (record: Omit<AdherenceRecord, "id" | "userId" | "createdAt">) => {
    if (!user) throw new Error("User not authenticated")

    // Simulate recording adherence
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newId = `record-${Date.now()}`
    const newRecord = {
      ...record,
      id: newId,
      userId: user.uid,
      createdAt: { seconds: Date.now() / 1000 },
    }
    DEMO_ADHERENCE_RECORDS.push(newRecord)
    return newId
  }

  const getUserAdherenceRecords = async (days = 30) => {
    if (!user) throw new Error("User not authenticated")

    // Simulate fetching adherence records
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Filter records from the last X days
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    return DEMO_ADHERENCE_RECORDS.filter((record) => record.userId === user.uid && record.scheduled >= startDate)
  }

  const getAdherenceStats = async () => {
    if (!user) throw new Error("User not authenticated")

    // Simulate fetching adherence stats
    await new Promise((resolve) => setTimeout(resolve, 700))
    return { ...DEMO_ADHERENCE_STATS }
  }

  return {
    recordAdherence,
    getUserAdherenceRecords,
    getAdherenceStats,
  }
}

