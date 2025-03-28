"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Box, Check, MapPin, Package, Truck } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function TrackPage() {
  const [progress, setProgress] = useState(65)
  const [currentLocation, setCurrentLocation] = useState({ lat: 40.7128, lng: -74.006 })

  useEffect(() => {
    // Simulate movement
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })

      // Simulate location change
      setCurrentLocation((prev) => ({
        lat: prev.lat + 0.001,
        lng: prev.lng + 0.001,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Track Orders</h1>
      </header>

      <Tabs defaultValue="active" className="mb-6">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Order #12345</CardTitle>
                <Badge>In Transit</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Estimated delivery: Today, 4:00 PM</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Order Placed</span>
                  <span>Out for Delivery</span>
                  <span>Delivered</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="bg-muted/50 rounded-lg p-4 relative">
                <div className="h-40 w-full bg-muted rounded-lg flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary animate-pulse" />
                  <span className="sr-only">Map showing delivery location</span>
                </div>
                <div className="absolute top-8 left-1/4 text-primary">
                  <Truck className="h-6 w-6" />
                </div>
                <div className="absolute bottom-8 right-1/4 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Order Status</h3>
                <TrackingStep
                  icon={<Check className="h-5 w-5" />}
                  title="Order Confirmed"
                  time="Mar 28, 10:30 AM"
                  completed={true}
                />
                <TrackingStep
                  icon={<Box className="h-5 w-5" />}
                  title="Order Processed"
                  time="Mar 28, 11:45 AM"
                  completed={true}
                />
                <TrackingStep
                  icon={<Truck className="h-5 w-5" />}
                  title="Out for Delivery"
                  time="Mar 28, 1:15 PM"
                  completed={true}
                  active={true}
                />
                <TrackingStep
                  icon={<Package className="h-5 w-5" />}
                  title="Delivered"
                  time="Estimated: Mar 28, 4:00 PM"
                  completed={false}
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Items in this order</h3>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Monthly Refill</p>
                        <p className="text-xs text-muted-foreground">3 medications</p>
                      </div>
                    </div>
                    <p className="font-medium">$42.99</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivered" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Order #12344</CardTitle>
                <Badge variant="outline">Delivered</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Delivered: Mar 15, 2025</p>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Order #12343</CardTitle>
                <Badge variant="outline">Delivered</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Delivered: Feb 28, 2025</p>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TrackingStep({
  icon,
  title,
  time,
  completed,
  active = false,
}: {
  icon: React.ReactNode
  title: string
  time: string
  completed: boolean
  active?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          completed
            ? "bg-green-100 text-green-600"
            : active
              ? "bg-primary/10 text-primary animate-pulse"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className={`font-medium ${active ? "text-primary" : ""}`}>{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}

