"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/auth-context"
import { useMedicationService, type Medication } from "../services/medication-service"
import { useMarketplaceService, type Product } from "../services/marketplace-service"
import { useAdherenceService } from "../services/adherence-service"
import Navbar from "../components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Bell, Calendar, Check, Clock, Package, Pill, ShoppingCart } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const { user, loading, isDemo } = useAuth()
  const { getUserMedications } = useMedicationService()
  const { getFeaturedProducts } = useMarketplaceService()
  const { getAdherenceStats } = useAdherenceService()

  const [medications, setMedications] = useState<Medication[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [adherenceRate, setAdherenceRate] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user && !loading) {
      router.push("/")
      return
    }

    const fetchData = async () => {
      try {
        const [medsData, productsData, statsData] = await Promise.all([
          getUserMedications(),
          getFeaturedProducts(),
          getAdherenceStats(),
        ])

        setMedications(medsData)
        setFeaturedProducts(productsData)
        setAdherenceRate(statsData.adherenceRate)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchData()
    }
  }, [user, loading, router])

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Get today's medications
  const today = new Date()
  const todayMedications = medications.filter((med) => {
    const startDate = med.startDate instanceof Date ? med.startDate : new Date(med.startDate.seconds * 1000)
    const endDate = med.endDate
      ? med.endDate instanceof Date
        ? med.endDate
        : new Date(med.endDate.seconds * 1000)
      : null

    return startDate <= today && (!endDate || endDate >= today)
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:pl-64">
        <div className="p-4 md:p-8">
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-600">Demo Application</AlertTitle>
            <AlertDescription>
              You're viewing a demo application with mock data. All actions are simulated and no real data is being
              stored.
            </AlertDescription>
          </Alert>

          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome, {user?.displayName || "User"}</h1>
            <p className="text-gray-500">Here's your health overview for today</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Pill className="mr-2 h-5 w-5 text-primary" />
                  Today's Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayMedications.length > 0 ? (
                    todayMedications.slice(0, 3).map((med) => (
                      <div key={med.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-gray-500">
                            {med.dosage} - {med.frequency}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className="flex items-center">
                          <Check className="mr-1 h-4 w-4" />
                          Take
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No medications scheduled for today</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => router.push("/medications")}>
                  View All Medications
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Upcoming Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayMedications.length > 0 ? (
                    todayMedications.slice(0, 3).map((med) => (
                      <div key={med.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="mr-1 h-3 w-3" />
                            {med.time[0]}
                          </div>
                        </div>
                        <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                          {new Date().getHours() < Number.parseInt(med.time[0].split(":")[0]) ? "Upcoming" : "Due"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No reminders for today</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => router.push("/medications")}>
                  Manage Reminders
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Adherence Rate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold">{adherenceRate.toFixed(0)}%</span>
                  <Progress value={adherenceRate} className="h-2 mt-2" />
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <span>{day}</span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                          i === new Date().getDay() ? "bg-primary text-white" : "bg-gray-100"
                        }`}
                      >
                        {i === new Date().getDay() && <Check className="h-3 w-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => router.push("/reports")}>
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="featured">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Marketplace</h2>
                <TabsList>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="featured" className="m-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {featuredProducts.length > 0 ? (
                    featuredProducts.slice(0, 4).map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <div className="h-40 bg-gray-100 flex items-center justify-center">
                          <ShoppingCart className="h-10 w-10 text-gray-300" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-bold text-lg">₹{product.price.toFixed(2)}</span>
                            <Button size="sm" variant="outline">
                              <ShoppingCart className="mr-1 h-4 w-4" />
                              Add
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-4">No featured products available</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="recommended" className="m-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {medications.length > 0 ? (
                    medications.slice(0, 4).map((med, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="h-40 bg-gray-100 flex items-center justify-center">
                          <Pill className="h-10 w-10 text-gray-300" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">{med.name} (Generic)</h3>
                          <p className="text-sm text-gray-500 line-clamp-2">Generic alternative for {med.name}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-bold text-lg">₹{(Math.random() * 500 + 100).toFixed(2)}</span>
                            <Button size="sm" variant="outline">
                              <ShoppingCart className="mr-1 h-4 w-4" />
                              Add
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-4">Add medications to see recommendations</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <Button variant="outline" size="sm" onClick={() => router.push("/orders")}>
                View All
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Order #{Math.floor(Math.random() * 10000)}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 text-right">
                          <p className="font-medium">₹{(Math.random() * 1000 + 200).toFixed(2)}</p>
                          <p className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full inline-block">
                            {["Processing", "Shipped", "Delivered"][index]}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-2">
                          Track
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

