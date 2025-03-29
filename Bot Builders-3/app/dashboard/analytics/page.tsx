"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { Activity, Calendar, Heart, TrendingUp } from "lucide-react"

export default function AnalyticsPage() {
  // Sample data for charts
  const healthTrendsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Blood Pressure (Systolic)",
        data: [125, 128, 120, 118, 116, 115],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
      {
        label: "Blood Pressure (Diastolic)",
        data: [85, 83, 80, 78, 76, 75],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
      },
    ],
  }

  const medicationAdherenceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Adherence Rate",
        data: [100, 100, 85, 100, 90, 100, 95],
        backgroundColor: "rgb(59, 130, 246)",
      },
    ],
  }

  const healthMetricsData = {
    labels: ["Blood Pressure", "Blood Glucose", "Cholesterol", "Heart Rate", "Weight"],
    datasets: [
      {
        label: "Current vs Target",
        data: [85, 90, 75, 95, 80],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(99, 102, 241, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(248, 113, 113, 0.8)",
        ],
      },
    ],
  }

  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger />
        <div className="font-semibold">Analytics</div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Health Analytics</h1>
            <p className="text-muted-foreground">Track and analyze your health metrics over time</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">115/75</div>
                <p className="text-xs text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Improved 8% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blood Glucose</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">110 mg/dL</div>
                <p className="text-xs text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Stable within target range
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Medication Adherence</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-amber-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  5% increase from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72 bpm</div>
                <p className="text-xs text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Within normal range
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="trends">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trends">Health Trends</TabsTrigger>
              <TabsTrigger value="adherence">Medication Adherence</TabsTrigger>
              <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Pressure Trends</CardTitle>
                  <CardDescription>Your blood pressure readings over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <LineChart
                    data={healthTrendsData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: false,
                          min: 60,
                          max: 140,
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="adherence">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Medication Adherence</CardTitle>
                  <CardDescription>Your medication adherence rate for the past week</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <BarChart
                    data={medicationAdherenceData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics">
              <Card>
                <CardHeader>
                  <CardTitle>Health Metrics Overview</CardTitle>
                  <CardDescription>Your current health metrics compared to target values</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <PieChart
                    data={healthMetricsData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Health Insights</CardTitle>
                <CardDescription>Personalized insights based on your health data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                    <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Blood Pressure Improvement</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Your blood pressure has shown consistent improvement over the past 3 months. Keep up with your
                      current medication and exercise routine.
                    </p>
                  </div>

                  <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                    <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Medication Effectiveness</h3>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Your current medication regimen appears to be effective. Your health metrics have stabilized
                      within target ranges.
                    </p>
                  </div>

                  <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
                    <h3 className="font-medium text-amber-700 dark:text-amber-300 mb-2">Recommendation</h3>
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                      Consider increasing your daily water intake to improve your overall hydration levels, which may
                      help with medication absorption.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Goals</CardTitle>
                <CardDescription>Track your progress towards your health goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Lower Blood Pressure</p>
                      <p className="text-sm font-medium">80%</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-blue-100">
                      <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Target: 110/70 by June 2025</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Maintain Blood Glucose</p>
                      <p className="text-sm font-medium">90%</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-green-100">
                      <div className="h-2 w-[90%] rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Target: 70-130 mg/dL before meals</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Medication Adherence</p>
                      <p className="text-sm font-medium">95%</p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-purple-100">
                      <div className="h-2 w-[95%] rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Target: 100% adherence to medication schedule</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

