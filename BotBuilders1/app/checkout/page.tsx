"use client"   

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/auth-context"
import { useMarketplaceService, type CartItem, type Order } from "../services/marketplace-service"
import Navbar from "../components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, MapPin, ShoppingCart, Truck } from "lucide-react"

export default function Checkout() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { createOrder } = useMarketplaceService()

  // Form state
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  const [phone, setPhone] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock cart items (in a real app, this would come from a cart context or state)
  const [cart, setCart] = useState<CartItem[]>([
    {
      productId: "1",
      quantity: 2,
      product: {
        id: "1",
        name: "Paracetamol 500mg",
        description: "Pain reliever and fever reducer",
        price: 120,
        imageUrl: "/placeholder.svg",
        category: "Pain Relief",
        stock: 100,
        manufacturer: "MediCorp",
      },
    },
    {
      productId: "2",
      quantity: 1,
      product: {
        id: "2",
        name: "Vitamin D3 1000IU",
        description: "Supports bone health and immune function",
        price: 350,
        imageUrl: "/placeholder.svg",
        category: "Vitamins",
        stock: 75,
        manufacturer: "HealthPlus",
      },
    },
  ])

  useEffect(() => {
    if (!user && !loading) {
      router.push("/")
      return
    }
  }, [user, loading, router])

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const getShippingCost = () => {
    return 50 // Fixed shipping cost of ₹50
  }

  const getTotalPrice = () => {
    return getSubtotal() + getShippingCost()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const orderData: Omit<Order, "id" | "userId" | "createdAt" | "status"> = {
        items: cart,
        totalAmount: getTotalPrice(),
        paymentMethod,
        shippingAddress: {
          name,
          address,
          city,
          state,
          pincode,
          phone,
        },
      }

      const orderId = await createOrder(orderData)

      // Clear cart and redirect to order confirmation
      setCart([])
      router.push(`/orders/${orderId}`)
    } catch (error) {
      console.error("Error creating order:", error)
      setIsProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:pl-64">
        <div className="p-4 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Checkout</h1>
            <p className="text-gray-500">Complete your order</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit}>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-primary" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" value={state} onChange={(e) => setState(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-primary" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 border rounded-md p-3 mb-3">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex-1 cursor-pointer">
                          Cash on Delivery
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3 mb-3">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex-1 cursor-pointer">
                          UPI
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5 text-primary" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.productId} className="flex justify-between">
                        <div>
                          <span className="font-medium">{item.product.name}</span>
                          <span className="text-gray-500 ml-1">x{item.quantity}</span>
                        </div>
                        <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal ({getTotalItems()} items)</span>
                      <span>₹{getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping</span>
                      <span>₹{getShippingCost().toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 rounded-b-lg">
                  <div className="w-full text-sm text-gray-500 flex items-center">
                    <Truck className="h-4 w-4 mr-2" />
                    Estimated delivery: 2-3 business days
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

