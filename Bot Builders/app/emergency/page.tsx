"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Ambulance, Phone, MapPin } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function EmergencyPage() {
  const [location, setLocation] = useState("Searching for your location...")

  // Simulate getting location
  setTimeout(() => {
    setLocation("123 Main Street, Anytown, USA")
  }, 2000)

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Emergency Services</h1>
      </header>

      <Tabs defaultValue="emergency" className="mb-6">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
          <TabsTrigger value="nearby">Nearby Services</TabsTrigger>
        </TabsList>

        <TabsContent value="emergency" className="mt-4 space-y-4">
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-700">Emergency Services</CardTitle>
              <CardDescription>Call for immediate medical assistance</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <p className="text-sm">{location}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                <Phone className="h-5 w-5 mr-2" />
                Call Emergency (911)
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Request Ambulance</CardTitle>
              <CardDescription>Book an ambulance to your location</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                  <p className="text-sm">{location}</p>
                </div>
                <Input placeholder="Additional location details (optional)" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                <Ambulance className="h-5 w-5 mr-2" />
                Request Ambulance
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>Your pre-configured emergency contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <EmergencyContact name="Dr. Sarah Johnson" relation="Primary Doctor" phone="+1 (555) 123-4567" />
                <EmergencyContact name="Michael Smith" relation="Family Member" phone="+1 (555) 987-6543" />
                <EmergencyContact name="City Hospital" relation="Healthcare Provider" phone="+1 (555) 789-0123" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Add Emergency Contact
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="nearby" className="mt-4 space-y-4">
          <div className="mb-4">
            <Input placeholder="Search for nearby services..." />
          </div>

          <NearbyServiceCard
            name="City General Hospital"
            type="Hospital"
            distance="1.2 miles"
            address="456 Hospital Ave, Anytown"
            phone="+1 (555) 234-5678"
          />

          <NearbyServiceCard
            name="Westside Urgent Care"
            type="Urgent Care"
            distance="0.8 miles"
            address="789 Health St, Anytown"
            phone="+1 (555) 345-6789"
          />

          <NearbyServiceCard
            name="Community Pharmacy"
            type="Pharmacy"
            distance="0.5 miles"
            address="321 Medicine Rd, Anytown"
            phone="+1 (555) 456-7890"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EmergencyContact({
  name,
  relation,
  phone,
}: {
  name: string
  relation: string
  phone: string
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-muted-foreground">{relation}</div>
      </div>
      <Button variant="ghost" size="sm" className="h-8">
        <Phone className="h-4 w-4 mr-2" />
        Call
      </Button>
    </div>
  )
}

function NearbyServiceCard({
  name,
  type,
  distance,
  address,
  phone,
}: {
  name: string
  type: string
  distance: string
  address: string
  phone: string
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {type} • {distance}
            </p>
          </div>
          <Button variant="outline" size="sm" className="h-8">
            <MapPin className="h-4 w-4 mr-1" />
            Map
          </Button>
        </div>
        <p className="text-sm mb-1">{address}</p>
        <p className="text-sm text-primary">{phone}</p>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0 px-4 pb-4">
        <Button variant="outline" className="w-full" size="sm">
          <Phone className="h-4 w-4 mr-2" />
          Call
        </Button>
        <Button className="w-full" size="sm">
          <Ambulance className="h-4 w-4 mr-2" />
          Request
        </Button>
      </CardFooter>
    </Card>
  )
}

