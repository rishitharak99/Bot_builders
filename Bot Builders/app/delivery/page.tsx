"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, CreditCard, MapPin, Package, Search, ShoppingCart, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DeliveryPage() {
  const [activeTab, setActiveTab] = useState("order")

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Medicine Delivery</h1>
      </header>

      <Tabs defaultValue="order" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="order">Order</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="order" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Order Medications</CardTitle>
              <CardDescription>Order from your prescriptions or search for medications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search medications..." className="pl-10" />
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Your Prescriptions</h3>
                <PrescriptionItem name="Lisinopril" dosage="10mg" quantity="30 tablets" refills={2} />
                <PrescriptionItem name="Metformin" dosage="500mg" quantity="60 tablets" refills={3} />
                <PrescriptionItem name="Atorvastatin" dosage="20mg" quantity="30 tablets" refills={1} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Active Orders</CardTitle>
              <CardDescription>Track your current medication orders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <OrderCard
                orderNumber="ORD-12345"
                date="Mar 25, 2025"
                status="In Transit"
                items={["Lisinopril 10mg (30 tablets)", "Metformin 500mg (60 tablets)"]}
                eta="Today, 2:00 PM - 4:00 PM"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4 space-y-4">
          <div className="mb-4">
            <Input placeholder="Search orders..." />
          </div>

          <OrderHistoryCard
            orderNumber="ORD-12344"
            date="Mar 15, 2025"
            status="Delivered"
            items={["Atorvastatin 20mg (30 tablets)"]}
          />

          <OrderHistoryCard
            orderNumber="ORD-12343"
            date="Feb 28, 2025"
            status="Delivered"
            items={["Lisinopril 10mg (30 tablets)", "Metformin 500mg (60 tablets)"]}
          />

          <OrderHistoryCard
            orderNumber="ORD-12342"
            date="Feb 10, 2025"
            status="Delivered"
            items={["Metformin 500mg (60 tablets)"]}
          />
        </TabsContent>
      </Tabs>

      {activeTab === "order" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Delivery Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Input id="address" defaultValue="123 Main Street, Anytown, USA" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery-time">Delivery Time</Label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="today">
                  <SelectTrigger id="delivery-time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today (2-4 hours)</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow (Morning)</SelectItem>
                    <SelectItem value="tomorrow-afternoon">Tomorrow (Afternoon)</SelectItem>
                    <SelectItem value="scheduled">Schedule for Later</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment">Payment Method</Label>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="card1">
                  <SelectTrigger id="payment">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card1">Visa ending in 4242</SelectItem>
                    <SelectItem value="card2">Mastercard ending in 5555</SelectItem>
                    <SelectItem value="new">Add New Payment Method</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function PrescriptionItem({
  name,
  dosage,
  quantity,
  refills,
}: {
  name: string
  dosage: string
  quantity: string
  refills: number
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
      <div>
        <div className="font-medium">
          {name} {dosage}
        </div>
        <div className="text-sm text-muted-foreground">
          {quantity} • {refills} refills left
        </div>
      </div>
      <Button variant="outline" size="sm">
        Add
      </Button>
    </div>
  )
}

function OrderCard({
  orderNumber,
  date,
  status,
  items,
  eta,
}: {
  orderNumber: string
  date: string
  status: string
  items: string[]
  eta: string
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium">{orderNumber}</h3>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
          <Badge variant={status === "In Transit" ? "default" : "outline"}>{status}</Badge>
        </div>

        <div className="space-y-2 mb-3">
          <h4 className="text-sm font-medium">Items:</h4>
          <ul className="text-sm space-y-1">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <Package className="h-3 w-3 text-muted-foreground" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-4 w-4 text-primary" />
          <span>Estimated delivery: {eta}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0 px-4 pb-4">
        <Button variant="outline" className="w-full">
          Track Order
        </Button>
      </CardFooter>
    </Card>
  )
}

function OrderHistoryCard({
  orderNumber,
  date,
  status,
  items,
}: {
  orderNumber: string
  date: string
  status: string
  items: string[]
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium">{orderNumber}</h3>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
          <Badge variant="outline">{status}</Badge>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Items:</h4>
          <ul className="text-sm space-y-1">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <Package className="h-3 w-3 text-muted-foreground" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="pt-0 px-4 pb-4">
        <Button variant="outline" className="w-full" size="sm">
          Reorder
        </Button>
      </CardFooter>
    </Card>
  )
}

