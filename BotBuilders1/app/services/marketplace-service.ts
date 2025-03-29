"use client"

import { useAuth } from "../context/auth-context"

export type Product = {
  id?: string
  name: string
  description: string
  price: number // Price in Indian Rupees (₹)
  imageUrl: string
  category: string
  stock: number
  manufacturer: string
  featured?: boolean
}

export type CartItem = {
  productId: string
  quantity: number
  product: Product
}

export type Order = {
  id?: string
  userId: string
  items: CartItem[]
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered"
  paymentMethod: string
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    pincode: string
    phone: string
  }
  createdAt?: any
  estimatedDelivery?: Date
  currentLocation?: {
    lat: number
    lng: number
  }
}

// Mock products data
const DEMO_PRODUCTS: Product[] = [
  {
    id: "prod1",
    name: "Paracetamol 500mg",
    description: "Pain reliever and fever reducer",
    price: 120,
    imageUrl: "/placeholder.svg",
    category: "Pain Relief",
    stock: 100,
    manufacturer: "MediCorp",
    featured: true,
  },
  {
    id: "prod2",
    name: "Vitamin D3 1000IU",
    description: "Supports bone health and immune function",
    price: 350,
    imageUrl: "/placeholder.svg",
    category: "Vitamins",
    stock: 75,
    manufacturer: "HealthPlus",
    featured: true,
  },
  {
    id: "prod3",
    name: "Blood Pressure Monitor",
    description: "Digital automatic blood pressure monitor",
    price: 1999,
    imageUrl: "/placeholder.svg",
    category: "Devices",
    stock: 25,
    manufacturer: "MediTech",
    featured: false,
  },
  {
    id: "prod4",
    name: "Cetirizine 10mg",
    description: "Antihistamine for allergy relief",
    price: 85,
    imageUrl: "/placeholder.svg",
    category: "Allergy",
    stock: 120,
    manufacturer: "AllerCare",
    featured: false,
  },
  {
    id: "prod5",
    name: "Multivitamin Tablets",
    description: "Complete daily vitamin and mineral supplement",
    price: 450,
    imageUrl: "/placeholder.svg",
    category: "Vitamins",
    stock: 60,
    manufacturer: "VitaLife",
    featured: true,
  },
  {
    id: "prod6",
    name: "Digital Thermometer",
    description: "Fast reading digital thermometer",
    price: 299,
    imageUrl: "/placeholder.svg",
    category: "Devices",
    stock: 40,
    manufacturer: "MediTech",
    featured: false,
  },
]

// Mock orders data
const DEMO_ORDERS: Order[] = [
  {
    id: "order1",
    userId: "demo-user-123",
    items: [
      {
        productId: "prod1",
        quantity: 2,
        product: DEMO_PRODUCTS[0],
      },
      {
        productId: "prod2",
        quantity: 1,
        product: DEMO_PRODUCTS[1],
      },
    ],
    totalAmount: 590,
    status: "shipped",
    paymentMethod: "cod",
    shippingAddress: {
      name: "Demo User",
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
    userId: "demo-user-123",
    items: [
      {
        productId: "prod3",
        quantity: 1,
        product: DEMO_PRODUCTS[2],
      },
    ],
    totalAmount: 2049,
    status: "delivered",
    paymentMethod: "card",
    shippingAddress: {
      name: "Demo User",
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
]

export const useMarketplaceService = () => {
  const { user } = useAuth()

  const getProducts = async () => {
    // Simulate fetching products
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [...DEMO_PRODUCTS]
  }

  const getFeaturedProducts = async () => {
    // Simulate fetching featured products
    await new Promise((resolve) => setTimeout(resolve, 500))
    return DEMO_PRODUCTS.filter((product) => product.featured)
  }

  const getProduct = async (id: string) => {
    // Simulate fetching a product
    await new Promise((resolve) => setTimeout(resolve, 300))
    const product = DEMO_PRODUCTS.find((p) => p.id === id)
    if (product) {
      return product
    }
    throw new Error("Product not found")
  }

  const createOrder = async (order: Omit<Order, "id" | "userId" | "createdAt" | "status">) => {
    if (!user) throw new Error("User not authenticated")

    // Simulate creating an order
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newId = `order${Date.now()}`

    // Calculate estimated delivery date (3 days from now)
    const estimatedDelivery = new Date()
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3)

    // Set initial tracking location (warehouse)
    const currentLocation = {
      lat: 12.9716, // Example coordinates for Bangalore
      lng: 77.5946,
    }

    const newOrder = {
      ...order,
      id: newId,
      userId: user.uid,
      status: "pending" as const,
      createdAt: { seconds: Date.now() / 1000 },
      estimatedDelivery,
      currentLocation,
    }

    DEMO_ORDERS.push(newOrder)
    return newId
  }

  const getUserOrders = async () => {
    if (!user) throw new Error("User not authenticated")

    // Simulate fetching user orders
    await new Promise((resolve) => setTimeout(resolve, 500))
    return DEMO_ORDERS.filter((order) => order.userId === user.uid)
  }

  const getOrder = async (id: string) => {
    // Simulate fetching an order
    await new Promise((resolve) => setTimeout(resolve, 300))
    const order = DEMO_ORDERS.find((o) => o.id === id)
    if (order) {
      return order
    }
    throw new Error("Order not found")
  }

  const updateOrderStatus = async (id: string, status: Order["status"]) => {
    // Simulate updating order status
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = DEMO_ORDERS.findIndex((o) => o.id === id)
    if (index !== -1) {
      DEMO_ORDERS[index].status = status
    }
  }

  const updateOrderLocation = async (id: string, location: { lat: number; lng: number }) => {
    // Simulate updating order location
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = DEMO_ORDERS.findIndex((o) => o.id === id)
    if (index !== -1) {
      DEMO_ORDERS[index].currentLocation = location
    }
  }

  return {
    getProducts,
    getFeaturedProducts,
    getProduct,
    createOrder,
    getUserOrders,
    getOrder,
    updateOrderStatus,
    updateOrderLocation,
  }
}

