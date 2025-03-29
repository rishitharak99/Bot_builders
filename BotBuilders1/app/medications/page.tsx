"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/auth-context"
import { useMedicationService, type Medication } from "../services/medication-service"
import Navbar from "../components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Check, Clock, Edit, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"

export default function Medications() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { getUserMedications, addMedication, updateMedication, deleteMedication, recordMedicationTaken } =
    useMedicationService()

  const [medications, setMedications] = useState<Medication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null)

  // Form state
  const [name, setName] = useState("")
  const [dosage, setDosage] = useState("")
  const [frequency, setFrequency] = useState("")
  const [time, setTime] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (!user && !loading) {
      router.push("/")
      return
    }

    const fetchMedications = async () => {
      try {
        const data = await getUserMedications()
        setMedications(data)
      } catch (error) {
        console.error("Error fetching medications:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchMedications()
    }
  }, [user, loading, router])

  const resetForm = () => {
    setName("")
    setDosage("")
    setFrequency("")
    setTime("")
    setStartDate("")
    setEndDate("")
    setNotes("")
    setEditingMedication(null)
  }

  const handleOpenDialog = (medication?: Medication) => {
    if (medication) {
      setEditingMedication(medication)
      setName(medication.name)
      setDosage(medication.dosage)
      setFrequency(medication.frequency)
      setTime(medication.time.join(", "))

      const start =
        medication.startDate instanceof Date ? medication.startDate : new Date(medication.startDate.seconds * 1000)
      setStartDate(format(start, "yyyy-MM-dd"))

      if (medication.endDate) {
        const end =
          medication.endDate instanceof Date ? medication.endDate : new Date(medication.endDate.seconds * 1000)
        setEndDate(format(end, "yyyy-MM-dd"))
      } else {
        setEndDate("")
      }

      setNotes(medication.notes || "")
    } else {
      resetForm()
    }
    setDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const medicationData = {
        name,
        dosage,
        frequency,
        time: time.split(",").map((t) => t.trim()),
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : undefined,
        notes,
      }

      if (editingMedication) {
        await updateMedication(editingMedication.id!, medicationData)

        // Update local state
        setMedications(
          medications.map((med) => (med.id === editingMedication.id ? { ...med, ...medicationData } : med)),
        )
      } else {
        const id = await addMedication(medicationData)

        // Update local state
        setMedications([...medications, { id, ...medicationData, userId: user!.uid }])
      }

      setDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving medication:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMedication(id)

      // Update local state
      setMedications(medications.filter((med) => med.id !== id))
    } catch (error) {
      console.error("Error deleting medication:", error)
    }
  }

  const handleTakeMedication = async (id: string) => {
    try {
      await recordMedicationTaken(id)

      // Update local state
      setMedications(medications.map((med) => (med.id === id ? { ...med, lastTaken: new Date() } : med)))
    } catch (error) {
      console.error("Error recording medication taken:", error)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Group medications by status (active/inactive)
  const activeMedications = medications.filter((med) => {
    const endDate = med.endDate
      ? med.endDate instanceof Date
        ? med.endDate
        : new Date(med.endDate.seconds * 1000)
      : null
    return !endDate || endDate >= new Date()
  })

  const inactiveMedications = medications.filter((med) => {
    const endDate = med.endDate
      ? med.endDate instanceof Date
        ? med.endDate
        : new Date(med.endDate.seconds * 1000)
      : null
    return endDate && endDate < new Date()
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:pl-64">
        <div className="p-4 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Medications</h1>
              <p className="text-gray-500">Manage your medication schedule</p>
            </div>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
          </div>

          <Tabs defaultValue="active">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active ({activeMedications.length})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive ({inactiveMedications.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="m-0">
              {activeMedications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeMedications.map((medication) => (
                    <Card key={medication.id}>
                      <CardHeader className="pb-2">
                        <CardTitle>{medication.name}</CardTitle>
                        <CardDescription>{medication.dosage}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-gray-500" />
                          <span>
                            {medication.time.join(", ")} - {medication.frequency}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                          <span>
                            Started:{" "}
                            {format(
                              medication.startDate instanceof Date
                                ? medication.startDate
                                : new Date(medication.startDate.seconds * 1000),
                              "MMM d, yyyy",
                            )}
                          </span>
                        </div>
                        {medication.notes && <p className="text-sm text-gray-500 mt-2">{medication.notes}</p>}
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleOpenDialog(medication)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive"
                            onClick={() => handleDelete(medication.id!)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button size="sm" onClick={() => handleTakeMedication(medication.id!)}>
                          <Check className="mr-1 h-4 w-4" />
                          Take Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">You don't have any active medications</p>
                  <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Medication
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="inactive" className="m-0">
              {inactiveMedications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {inactiveMedications.map((medication) => (
                    <Card key={medication.id} className="opacity-70">
                      <CardHeader className="pb-2">
                        <CardTitle>{medication.name}</CardTitle>
                        <CardDescription>{medication.dosage}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-gray-500" />
                          <span>
                            {medication.time.join(", ")} - {medication.frequency}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                          <span>
                            Ended:{" "}
                            {format(
                              medication.endDate instanceof Date
                                ? medication.endDate
                                : new Date(medication.endDate!.seconds * 1000),
                              "MMM d, yyyy",
                            )}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button size="sm" variant="outline" onClick={() => handleOpenDialog(medication)}>
                          <Edit className="mr-1 h-4 w-4" />
                          Edit
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">You don't have any inactive medications</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingMedication ? "Edit Medication" : "Add New Medication"}</DialogTitle>
                <DialogDescription>
                  {editingMedication
                    ? "Update your medication details below"
                    : "Enter the details of your medication below"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dosage" className="text-right">
                      Dosage
                    </Label>
                    <Input
                      id="dosage"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="frequency" className="text-right">
                      Frequency
                    </Label>
                    <Input
                      id="frequency"
                      value={frequency}
                      placeholder="e.g., Daily, Twice daily"
                      onChange={(e) => setFrequency(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Time
                    </Label>
                    <Input
                      id="time"
                      value={time}
                      placeholder="e.g., 08:00, 20:00"
                      onChange={(e) => setTime(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endDate" className="text-right">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Input id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

