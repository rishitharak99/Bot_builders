"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera, Clock, Plus } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function AddMedicationPage() {
  const [selectedDays, setSelectedDays] = useState<string[]>(["mon", "tue", "wed", "thu", "fri", "sat", "sun"])
  const [reminderTimes, setReminderTimes] = useState<string[]>(["08:00"])

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day))
    } else {
      setSelectedDays([...selectedDays, day])
    }
  }

  const addReminderTime = () => {
    setReminderTimes([...reminderTimes, ""])
  }

  const updateReminderTime = (index: number, value: string) => {
    const newTimes = [...reminderTimes]
    newTimes[index] = value
    setReminderTimes(newTimes)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/medications">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Add Medication</h1>
      </header>

      <form>
        <Card className="mb-6 shadow-sm">
          <CardHeader>
            <CardTitle>Medication Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Medication Name</Label>
              <Input id="name" placeholder="Enter medication name" className="rounded-lg" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input id="dosage" placeholder="e.g. 10mg" className="rounded-lg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="form">Form</Label>
                <Select>
                  <SelectTrigger id="form" className="rounded-lg">
                    <SelectValue placeholder="Select form" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="capsule">Capsule</SelectItem>
                    <SelectItem value="liquid">Liquid</SelectItem>
                    <SelectItem value="injection">Injection</SelectItem>
                    <SelectItem value="inhaler">Inhaler</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea id="instructions" placeholder="e.g. Take with food" className="rounded-lg" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price per Unit</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                <Input id="price" type="number" step="0.01" placeholder="0.00" className="pl-8 rounded-lg" />
              </div>
              <p className="text-xs text-muted-foreground">This will be used for cost tracking and reordering</p>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="photo" className="cursor-pointer flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Add Photo
              </Label>
              <Input id="photo" type="file" accept="image/*" className="hidden" />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-sm">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Days</Label>
              <div className="flex justify-between">
                {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
                  <Button
                    key={day}
                    type="button"
                    variant={selectedDays.includes(day) ? "default" : "outline"}
                    className="w-9 h-9 p-0 rounded-full"
                    onClick={() => toggleDay(day)}
                  >
                    {day.charAt(0).toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Reminder Times</Label>
              {reminderTimes.map((time, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => updateReminderTime(index, e.target.value)}
                    className="rounded-lg"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full mt-2 rounded-lg"
                onClick={addReminderTime}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Time
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="refill-reminder">Refill Reminder</Label>
                <Switch id="refill-reminder" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auto-reorder">Auto Reorder</Label>
                <Switch id="auto-reorder" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="caregiver-notify">Notify Caregiver</Label>
                <Switch id="caregiver-notify" />
              </div>
            </div>
          </CardContent>
        </Card>

        <CardFooter className="flex justify-between px-0">
          <Button variant="outline" asChild className="rounded-lg">
            <Link href="/medications">Cancel</Link>
          </Button>
          <Button type="submit" className="rounded-lg">
            Save Medication
          </Button>
        </CardFooter>
      </form>
    </div>
  )
}

