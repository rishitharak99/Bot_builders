"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/auth-context"
import { useMarketplaceService, type Order } from "../services/marketplace-service"
import Navbar from "../components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Package, Truck } from "lucide-react"

export default function Orders() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { getUserOrders } = useMarketplaceService()

  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user && !loading) {
      router.push("/")
      return
    }

    const fetchOrders = async () => {
      try {
        const data = await getUserOrders()
        setOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user, loading, router])

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

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Mock orders if none are returned from Firebase
  if (orders.length === 0) {
    const mockOrders: Order[] = [
      {
        id: "order1",
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
      },
      {
        id: "order2",
        userId: user!.uid,
        items: [
          {
            productId: "3",
            quantity: 1,
            product: {
              id: "3",
              name: "Blood Pressure Monitor",
              description: "Digital automatic blood pressure monitor",
              price: 1999,
              imageUrl: "/placeholder.svg",
              category: "Devices",
              stock: 25,
              manufacturer: "MediTech",
            },
          },
        ],
        totalAmount: 2049,
        status: "delivered",
        paymentMethod: "card",
        shippingAddress: {
          name: "John Doe",
          address: "123 Main St",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          phone: "9876543210",
        },
        createdAt: { seconds: (Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000 },
        estimatedDelivery: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        currentLocation: {
          lat: 19.076,
          lng: 72.8777,
        },
      },
      {
        id: "order3",
        userId: user!.uid,
        items: [
          {
            productId: "4",
            quantity: 3,
            product: {
              id: "4",
              name: "Cetirizine 10mg",
              description: "Antihistamine for allergy relief",
              price: 85,
              imageUrl: "/placeholder.svg",
              category: "Allergy",
              stock: 120,
              manufacturer: "AllerCare",
            },
          },
        ],
        totalAmount: 305,
        status: "processing",
        paymentMethod: "upi",
        shippingAddress: {
          name: "John Doe",
          address: "123 Main St",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          phone: "9876543210",
        },
        createdAt: { seconds: (Date.now() - 1 * 24 * 60 * 60 * 1000) / 1000 },
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        currentLocation: {
          lat: 19.076,
          lng: 72.8777,
        },
      },
    ]

    setOrders(mockOrders)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:pl-64">
        <div className="p-4 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Your Orders</h1>
            <p className="text-gray-500">Track and manage your orders</p>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 pb-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <CardTitle className="text-base md:text-lg">Order #{order.id?.substring(0, 8)}</CardTitle>
                    <div className="flex items-center mt-2 md:mt-0">
                      <p className="text-sm text-gray-500 mr-3">
                        {format(
                          order.createdAt instanceof Date ? order.createdAt : new Date(order.createdAt.seconds * 1000),
                          "MMM d, yyyy",
                        )}
                      </p>
                      <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="font-medium text-sm mb-2">Items</h3>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.productId} className="flex justify-between">
                              <div>
                                <span>{item.product.name}</span>
                                <span className="text-gray-500 ml-1">x{item.quantity}</span>
                              </div>
                              <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between font-medium pt-2 border-t">
                            <span>Total</span>
                            <span>₹{order.totalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm mb-2">Shipping Details</h3>
                        <div className="text-sm">
                          <p className="font-medium">{order.shippingAddress.name}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                            {order.shippingAddress.pincode}
                          </p>
                          <p>Phone: {order.shippingAddress.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-4 border-t">
                      <div className="flex items-center text-sm text-gray-500 mb-3 md:mb-0">
                        <Truck className="h-4 w-4 mr-2" />
                        {order.status === "delivered" ? (
                          <span>
                            Delivered on{" "}
                            {format(
                              order.estimatedDelivery instanceof Date
                                ? order.estimatedDelivery
                                : new Date(order.estimatedDelivery.seconds * 1000),
                              "MMM d, yyyy",
                            )}
                          </span>
                        ) : (
                          <span>
                            Estimated delivery:{" "}
                            {format(
                              order.estimatedDelivery instanceof Date
                                ? order.estimatedDelivery
                                : new Date(order.estimatedDelivery.seconds * 1000),
                              "MMM d, yyyy",
                            )}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => router.push(`/orders/${order.id}`)}>
                          <Package className="mr-2 h-4 w-4" />
                          Track Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

