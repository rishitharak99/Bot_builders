"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "../../context/auth-context"
import { useMarketplaceService, type Order } from "../../services/marketplace-service"
import Navbar from "../../components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ArrowLeft, Box, Check, MapPin, Package, Truck } from "lucide-react"

export default function OrderDetail() {
  const router = useRouter()
  const params = useParams()
  const { user, loading } = useAuth()
  const { getOrder } = useMarketplaceService()

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user && !loading) {
      router.push("/")
      return
    }

    const fetchOrder = async () => {
      try {
        const orderId = params.id as string
        const data = await getOrder(orderId)
        setOrder(data)
      } catch (error) {
        console.error("Error fetching order:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchOrder()
    }
  }, [user, loading, router, params.id])

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "processing":
        return "Processing"
      case "shipped":
        return "Shipped"
      case "delivered":
        return "Delivered"
      default:
        return status
    }
  }

  const getTrackingSteps = () => {
    const steps = [
      { id: "ordered", label: "Order Placed", icon: Package, completed: true },
      {
        id: "processing",
        label: "Processing",
        icon: Box,
        completed: ["processing", "shipped", "delivered"].includes(order?.status || ""),
      },
      {
        id: "shipped",
        label: "Shipped",
        icon: Truck,
        completed: ["shipped", "delivered"].includes(order?.status || ""),
      },
      { id: "delivered", label: "Delivered", icon: Check, completed: ["delivered"].includes(order?.status || "") },
    ]

    return steps
  }

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Mock order if none is returned from Firebase
  if (!order) {
    const mockOrder: Order = {
      id: params.id as string,
      userId: user!.uid,
      items: [
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
      ],
      totalAmount: 590,
      status: "shipped",
      paymentMethod: "cod",
      shippingAddress: {
        name: "John Doe",
        address: "123 Main St",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        phone: "9876543210",
      },
      createdAt: { seconds: Date.now() / 1000 },
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      currentLocation: {
        lat: 19.076,
        lng: 72.8777,
      },
    }

    setOrder(mockOrder)
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:pl-64">
        <div className="p-4 md:p-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" onClick={() => router.push("/orders")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Order #{order.id?.substring(0, 8)}</h1>
              <p className="text-gray-500">
                Placed on{" "}
                {format(
                  order.createdAt instanceof Date ? order.createdAt : new Date(order.createdAt.seconds * 1000),
                  "MMMM d, yyyy",
                )}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Order Status</span>
                    <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                    <div className="space-y-8 relative z-10">
                      {getTrackingSteps().map((step, index) => (
                        <div key={step.id} className="flex items-start">
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-full ${
                              step.completed ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            <step.icon className="h-6 w-6" />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium">{step.label}</h3>
                            {step.id === "ordered" && (
                              <p className="text-sm text-gray-500">
                                {format(
                                  order.createdAt instanceof Date
                                    ? order.createdAt
                                    : new Date(order.createdAt.seconds * 1000),
                                  "MMM d, yyyy 'at' h:mm a",
                                )}
                              </p>
                            )}
                            {step.id === "processing" && step.completed && (
                              <p className="text-sm text-gray-500">Your order is being processed</p>
                            )}
                            {step.id === "shipped" && step.completed && (
                              <p className="text-sm text-gray-500">Your order has been shipped and is on its way</p>
                            )}
                            {step.id === "delivered" && step.completed && (
                              <p className="text-sm text-gray-500">Your order has been delivered</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center">
                          <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                            <Package className="h-8 w-8 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{item.product.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    Delivery Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center mb-4">
                    <p className="text-gray-500">Map View</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Location</p>
                      <p className="text-sm text-gray-500">Your package is currently in transit</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal</span>
                      <span>₹{(order.totalAmount - 50).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping</span>
                      <span>₹50.00</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total</span>
                      <span>₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Address</h3>
                      <p className="font-medium">{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.address}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                      </p>
                      <p>Phone: {order.shippingAddress.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Delivery Method</h3>
                      <p>Standard Delivery</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                      <p className="capitalize">
                        {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Payment Status</h3>
                      <Badge variant="outline" className="capitalize">
                        {order.status === "delivered" && order.paymentMethod === "cod"
                          ? "Paid"
                          : order.paymentMethod === "cod"
                            ? "Pay on delivery"
                            : "Paid"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full">
                <Truck className="mr-2 h-4 w-4" />
                Track Package
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

