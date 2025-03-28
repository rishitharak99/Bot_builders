"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bell, Clock, CreditCard, Home, MapPin, Pill, Settings, ShoppingBag, TrendingUp, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false)

  useEffect(() => {
    // Check if Firebase is properly initialized
    try {
      // Import Firebase config dynamically to avoid SSR issues
      import("./firebase/config")
        .then(() => {
          setIsFirebaseLoaded(true)
        })
        .catch((err) => {
          console.error("Firebase initialization error:", err)
        })
    } catch (error) {
      console.error("Firebase loading error:", error)
    }

    // Animate progress on load
    const timer = setTimeout(() => setProgress(87), 500)

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => {
      clearTimeout(timer)
      clearInterval(timeInterval)
    }
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-6 max-w-md flex-1">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">Hi, John</h1>
              <p className="text-sm text-muted-foreground">{currentTime.toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/notifications">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>
          </div>
        </header>

        {!isFirebaseLoaded && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <p className="text-amber-600">
                Firebase configuration is loading or not properly set up. Some features may be limited.
              </p>
            </CardContent>
          </Card>
        )}

        <section className="mb-6">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Today's Progress</span>
                <span className="text-primary">{progress}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="h-2 mb-4" />
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">2/3</div>
                  <div className="text-xs text-muted-foreground">Taken</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs text-muted-foreground">Upcoming</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">0</div>
                  <div className="text-xs text-muted-foreground">Missed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Upcoming Medications</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/medications">View All</Link>
            </Button>
          </div>
          <div className="space-y-3">
            <MedicationItem
              name="Lisinopril"
              dosage="10mg"
              time="8:00 AM"
              status="taken"
              color="bg-blue-100"
              icon="💊"
            />
            <MedicationItem
              name="Metformin"
              dosage="500mg"
              time="1:00 PM"
              status="taken"
              color="bg-purple-100"
              icon="💊"
            />
            <MedicationItem
              name="Atorvastatin"
              dosage="20mg"
              time="8:00 PM"
              status="upcoming"
              color="bg-amber-100"
              icon="💊"
              isNext={true}
            />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3">
            <QuickActionButton icon={<Pill className="h-5 w-5" />} label="Add Med" href="/medications/add" />
            <QuickActionButton icon={<ShoppingBag className="h-5 w-5" />} label="Shop" href="/shop" />
            <QuickActionButton icon={<TrendingUp className="h-5 w-5" />} label="Reports" href="/reports" />
            <QuickActionButton icon={<MapPin className="h-5 w-5" />} label="Track" href="/track" />
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Recent Orders</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/orders">View All</Link>
            </Button>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Monthly Refill</h3>
                    <p className="text-xs text-muted-foreground">3 medications</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                  In Transit
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>$42.99</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Arriving today</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/track/order-123">Track Order</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>

      <nav className="sticky bottom-0 bg-background border-t py-2 px-4 flex justify-around">
        <NavButton icon={<Home className="h-5 w-5" />} label="Home" href="/" active />
        <NavButton icon={<Pill className="h-5 w-5" />} label="Meds" href="/medications" />
        <NavButton icon={<ShoppingBag className="h-5 w-5" />} label="Shop" href="/shop" />
        <NavButton icon={<User className="h-5 w-5" />} label="Profile" href="/profile" />
      </nav>
    </div>
  )
}

function MedicationItem({
  name,
  dosage,
  time,
  status,
  color,
  icon,
  isNext = false,
}: {
  name: string
  dosage: string
  time: string
  status: "taken" | "missed" | "upcoming"
  color: string
  icon: string
  isNext?: boolean
}) {
  return (
    <Card className={`${isNext ? "border-primary border-2" : ""} overflow-hidden`}>
      <div className="flex items-center">
        <div className={`${color} w-12 h-full flex items-center justify-center`}>
          <span className="text-xl">{icon}</span>
        </div>
        <CardContent className="p-3 flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-xs text-muted-foreground">{dosage}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{time}</div>
              <div className="flex items-center gap-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status === "taken" ? "bg-green-500" : status === "missed" ? "bg-red-500" : "bg-amber-500"
                  }`}
                />
                <span className="text-xs capitalize text-muted-foreground">{status}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
      {isNext && (
        <div className="bg-primary/10 p-2 flex justify-between items-center">
          <span className="text-xs font-medium">Next dose in 2 hours</span>
          <Button size="sm" variant="default">
            Take Now
          </Button>
        </div>
      )}
    </Card>
  )
}

function QuickActionButton({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode
  label: string
  href: string
}) {
  return (
    <Link href={href} className="text-center">
      <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl mb-1">
        {icon}
      </Button>
      <span className="text-xs">{label}</span>
    </Link>
  )
}

function NavButton({
  icon,
  label,
  href,
  active = false,
}: {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}) {
  return (
    <Link href={href} className="flex flex-col items-center">
      <div className={`p-1 ${active ? "text-primary" : "text-muted-foreground"}`}>{icon}</div>
      <span className={`text-xs ${active ? "font-medium text-primary" : "text-muted-foreground"}`}>{label}</span>
    </Link>
  )
}

