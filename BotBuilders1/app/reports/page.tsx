"use client"

import { Badge } from "@/components/ui/badge"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/auth-context"
import { useAdherenceService, type AdherenceStats, type AdherenceRecord } from "../services/adherence-service"
import Navbar from "../components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import { Activity, Calendar, Check, Download, Pill, X } from "lucide-react"

export default function Reports() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { getUserAdherenceRecords, getAdherenceStats } = useAdherenceService()

  const [adherenceRecords, setAdherenceRecords] = useState<AdherenceRecord[]>([])
  const [adherenceStats, setAdherenceStats] = useState<AdherenceStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("week")

  useEffect(() => {
    if (!user && !loading) {
      router.push("/")
      return
    }

    const fetchData = async () => {
      try {
        const days = timeframe === "week" ? 7 : timeframe === "month" ? 30 : 90
        const [records, stats] = await Promise.all([getUserAdherenceRecords(days), getAdherenceStats()])

        setAdherenceRecords(records)
        setAdherenceStats(stats)
      } catch (error) {
        console.error("Error fetching adherence data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchData()
    }
  }, [user, loading, router, timeframe])

  const downloadReport = () => {
    // In a real app, this would generate and download a PDF or CSV report
    alert("Report download functionality would be implemented here")
  }

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Mock data if none is returned from Firebase
  if (!adherenceStats) {
    const mockStats: AdherenceStats = {
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

    setAdherenceStats(mockStats)
  }

  if (adherenceRecords.length === 0) {
    const mockRecords: AdherenceRecord[] = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)

      return {
        id: `record-${i}`,
        userId: user!.uid,
        medicationId: `med-${(i % 3) + 1}`,
        medicationName: ["Paracetamol", "Vitamin D", "Cetirizine"][i % 3],
        scheduled: date,
        taken: Math.random() > 0.1 ? date : null,
        status: Math.random() > 0.1 ? "taken" : "missed",
        createdAt: { seconds: date.getTime() / 1000 },
      }
    })

    setAdherenceRecords(mockRecords)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:pl-64">
        <div className="p-4 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Adherence Reports</h1>
              <p className="text-gray-500">Track your medication adherence</p>
            </div>
            <Button onClick={downloadReport}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>

          <div className="mb-6">
            <Tabs value={timeframe} onValueChange={setTimeframe}>
              <TabsList>
                <TabsTrigger value="week">Last 7 Days</TabsTrigger>
                <TabsTrigger value="month">Last 30 Days</TabsTrigger>
                <TabsTrigger value="quarter">Last 90 Days</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Adherence Rate</CardTitle>
                <CardDescription>Overall medication adherence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <span className="text-4xl font-bold">{adherenceStats?.adherenceRate.toFixed(0)}%</span>
                  <Progress value={adherenceStats?.adherenceRate} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Doses</CardTitle>
                <CardDescription>Scheduled medication doses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <span className="text-4xl font-bold">{adherenceStats?.totalDoses}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Taken Doses</CardTitle>
                <CardDescription>Successfully taken medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <span className="text-4xl font-bold text-green-500">{adherenceStats?.takenDoses}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Missed Doses</CardTitle>
                <CardDescription>Missed medication doses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <span className="text-4xl font-bold text-red-500">{adherenceStats?.missedDoses}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-primary" />
                  Weekly Adherence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adherenceStats?.weeklyAdherence.map((day) => (
                    <div key={day.day} className="flex items-center">
                      <div className="w-16 text-sm">{day.day.substring(0, 3)}</div>
                      <div className="flex-1">
                        <Progress value={day.rate} className="h-2" />
                      </div>
                      <div className="w-12 text-right text-sm font-medium">{day.rate}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Medication Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div key={i} className="font-medium">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 28 }, (_, i) => {
                    const date = new Date()
                    date.setDate(date.getDate() - 27 + i)
                    const record = adherenceRecords.find((r) => {
                      const recordDate =
                        r.scheduled instanceof Date ? r.scheduled : new Date(r.scheduled.seconds * 1000)
                      return recordDate.toDateString() === date.toDateString()
                    })

                    return (
                      <div key={i} className="relative">
                        <div
                          className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                            record?.status === "taken"
                              ? "bg-green-100 text-green-800"
                              : record?.status === "missed"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100"
                          }`}
                        >
                          {date.getDate()}
                        </div>
                        {record?.status === "taken" && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3 flex items-center justify-center">
                            <Check className="h-2 w-2 text-white" />
                          </div>
                        )}
                        {record?.status === "missed" && (
                          <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3 flex items-center justify-center">
                            <X className="h-2 w-2 text-white" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="mr-2 h-5 w-5 text-primary" />
                Medication History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adherenceRecords.slice(0, 10).map((record, index) => {
                  const date =
                    record.scheduled instanceof Date ? record.scheduled : new Date(record.scheduled.seconds * 1000)

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            record.status === "taken" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {record.status === "taken" ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                        </div>
                        <div>
                          <h3 className="font-medium">{record.medicationName}</h3>
                          <p className="text-sm text-gray-500">{format(date, "MMM d, yyyy 'at' h:mm a")}</p>
                        </div>
                      </div>
                      <Badge
                        className={
                          record.status === "taken" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }
                      >
                        {record.status === "taken" ? "Taken" : "Missed"}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

