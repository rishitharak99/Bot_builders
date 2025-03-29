"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/auth-context"
import { useMarketplaceService, type Product, type CartItem } from "../services/marketplace-service"
import Navbar from "../components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Minus, Plus, Search, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function Marketplace() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { getProducts } = useMarketplaceService()

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    if (!user && !loading) {
      router.push("/")
      return
    }

    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchProducts()
    }
  }, [user, loading, router])

  useEffect(() => {
    // Filter products based on search query and category
    let filtered = products

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, products])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === product.id)

      if (existingItem) {
        return prevCart.map((item) => (item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { productId: product.id!, quantity: 1, product }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId)

      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prevCart.filter((item) => item.productId !== productId)
      }
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  // Get unique categories
  const categories = ["all", ...new Set(products.map((product) => product.category))]

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Mock products if none are returned from Firebase
  if (products.length === 0) {
    const mockProducts: Product[] = [
      {
        id: "1",
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
        id: "2",
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
        id: "3",
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
        id: "4",
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
        id: "5",
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
        id: "6",
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

    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:pl-64">
        <div className="p-4 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Marketplace</h1>
              <p className="text-gray-500">Browse and purchase medications</p>
            </div>
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Cart
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                  <SheetDescription>{getTotalItems()} items in your cart</SheetDescription>
                </SheetHeader>
                <div className="mt-6 flex-1 overflow-y-auto">
                  {cart.length > 0 ? (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.productId} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                              <ShoppingCart className="h-6 w-6 text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-500">₹{item.product.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeFromCart(item.productId)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => addToCart(item.product)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  )}
                </div>
                {cart.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Subtotal</span>
                        <span>₹{getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Shipping</span>
                        <span>₹50.00</span>
                      </div>
                      <div className="flex items-center justify-between font-bold">
                        <span>Total</span>
                        <span>₹{(getTotalPrice() + 50).toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}
                <SheetFooter className="mt-6">
                  <div className="grid w-full gap-2">
                    <Button disabled={cart.length === 0} onClick={handleCheckout}>
                      Checkout
                    </Button>
                    {cart.length > 0 && (
                      <Button variant="outline" onClick={clearCart}>
                        Clear Cart
                      </Button>
                    )}
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                <TabsList>
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="capitalize">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <ShoppingCart className="h-12 w-12 text-gray-300" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 h-10">{product.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <p className="font-bold text-lg">₹{product.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">By {product.manufacturer}</p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {product.category}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" onClick={() => addToCart(product)}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No products found matching your search</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  )
}

