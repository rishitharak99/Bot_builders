"use client"

import type React from "react"

import { useState } from "react"
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
import { Ambulance, Phone, Building2, AmbulanceIcon as FirstAid, AlertCircle } from "lucide-react"

type EmergencyService = {
  id: string
  name: string
  phone: string
  address?: string
  icon: React.ElementType
  color: string
}

const emergencyServices: EmergencyService[] = [
  {
    id: "ambulance",
    name: "Emergency Ambulance",
    phone: "911",
    icon: Ambulance,
    color: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  },
  {
    id: "hospital-1",
    name: "City General Hospital",
    phone: "555-123-4567",
    address: "123 Medical Center Dr",
    icon: Building2,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  },
  {
    id: "hospital-2",
    name: "Memorial Medical Center",
    phone: "555-987-6543",
    address: "456 Healthcare Ave",
    icon: FirstAid,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  },
]

export function EmergencyServices() {
  const [selectedService, setSelectedService] = useState<EmergencyService | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleEmergencyCall = (service: EmergencyService) => {
    setSelectedService(service)
    setDialogOpen(true)
  }

  const handleCall = () => {
    if (selectedService) {
      // In a real app, this would use the Web Telephony API if available
      window.location.href = `tel:${selectedService.phone}`
    }
    setDialogOpen(false)
  }

  return (
    <>
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader className="bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <CardTitle>Emergency Services</CardTitle>
          </div>
          <CardDescription>Quick access to emergency medical services</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            {emergencyServices.map((service) => (
              <div
                key={service.id}
                className="flex flex-col items-center rounded-lg border p-4 text-center hover:bg-muted/50 transition-colors"
              >
                <div className={`rounded-full p-3 ${service.color}`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-3 font-medium">{service.name}</h3>
                {service.address && <p className="text-sm text-muted-foreground mt-1">{service.address}</p>}
                <p className="text-sm font-semibold mt-2">{service.phone}</p>
                <Button
                  onClick={() => handleEmergencyCall(service)}
                  className="mt-3 w-full"
                  variant={service.id === "ambulance" ? "destructive" : "outline"}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-red-50 dark:bg-red-900/20 text-center text-sm text-muted-foreground">
          For life-threatening emergencies, always call 911 immediately
        </CardFooter>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call {selectedService?.name}</DialogTitle>
            <DialogDescription>
              You are about to call {selectedService?.phone}.
              {selectedService?.id === "ambulance" && " This should only be used for genuine emergencies."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className={`rounded-full p-6 ${selectedService?.color}`}>
              {selectedService?.icon && <selectedService.icon className="h-12 w-12" />}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCall} variant={selectedService?.id === "ambulance" ? "destructive" : "default"}>
              Call {selectedService?.phone}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

