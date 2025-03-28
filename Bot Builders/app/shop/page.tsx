"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Filter, Heart, Search, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function ShopPage() {
  const [cartCount, setCartCount] = useState(0)

  const addToCart = () => {
    setCartCount(cartCount + 1)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Medicine Shop</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search medications..." className="pl-10 rounded-full" />
        </div>
        <Button variant="outline" size="icon" className="rounded-full">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="prescription">Rx</TabsTrigger>
          <TabsTrigger value="otc">OTC</TabsTrigger>
          <TabsTrigger value="supplements">Supplements</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <ProductCard
              name="Lisinopril"
              image="/placeholder.svg?height=100&width=100"
              price={12.99}
              prescription={true}
              onAddToCart={addToCart}
            />
            <ProductCard
              name="Metformin"
              image="/placeholder.svg?height=100&width=100"
              price={15.5}
              prescription={true}
              onAddToCart={addToCart}
            />
            <ProductCard
              name="Ibuprofen"
              image="/placeholder.svg?height=100&width=100"
              price={8.25}
              prescription={false}
              onAddToCart={addToCart}
            />
            <ProductCard
              name="Vitamin D3"
              image="/placeholder.svg?height=100&width=100"
              price={14.99}
              prescription={false}
              onAddToCart={addToCart}
            />
            <ProductCard
              name="Multivitamin"
              image="/placeholder.svg?height=100&width=100"
              price={19.99}
              prescription={false}
              onAddToCart={addToCart}
            />
          </div>
        </TabsContent>

        <TabsContent value="prescription" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <ProductCard
              name="Lisinopril"
              image="/placeholder.svg?height=100&width=100"
              price={12.99}
              prescription={true}
              onAddToCart={addToCart}
            />
            <ProductCard
              name="Metformin"
              image="/placeholder.svg?height=100&width=100"
              price={15.5}
              prescription={true}
              onAddToCart={addToCart}
            />
            <ProductCard
              name="Atorvastatin"
              image="/placeholder.svg?height=100&width=100"
              price={18.75}
              prescription={true}
              onAddToCart={addToCart}
            />
          </div>
        </TabsContent>

        <TabsContent value="otc" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <ProductCard
              name="Ibuprofen"
              image="/placeholder.svg?height=100&width=100"
              price={8.25}
              prescription={false}
              onAddToCart={addToCart}
            />
            <ProductCard
              name="Acetaminophen"
              image="/placeholder.svg?height=100&width=100"
              price={7.99}
              prescription={false}
              onAddToCart={addToCart}
            />
          </div>
        </TabsContent>

        <TabsContent value="supplements" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <ProductCard
              name="Vitamin D3"
              image="/placeholder.svg?height=100&width=100"
              price={14.99}
              prescription={false}
              onAddToCart={addToCart}
            />
            <ProductCard
              name="Multivitamin"
              image="/placeholder.svg?height=100&width=100"
              price={19.99}
              prescription={false}
              onAddToCart={addToCart}
            />
            <ProductCard
              name="Fish Oil"
              image="/placeholder.svg?height=100&width=100"
              price={16.5}
              prescription={false}
              onAddToCart={addToCart}
            />
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3">Featured Products</h2>
        <div className="grid grid-cols-1 gap-4">
          <FeaturedProductCard
            name="Monthly Medication Bundle"
            description="Save 15% when you bundle your regular medications"
            image="/placeholder.svg?height=150&width=300"
            price={89.99}
            discount={15}
            onAddToCart={addToCart}
          />
          <FeaturedProductCard
            name="Wellness Essentials Pack"
            description="Complete vitamin and supplement package"
            image="/placeholder.svg?height=150&width=300"
            price={49.99}
            discount={10}
            onAddToCart={addToCart}
          />
        </div>
      </section>
    </div>
  )
}

function ProductCard({
  name,
  image,
  price,
  prescription,
  onAddToCart,
}: {
  name: string
  image: string
  price: number
  prescription: boolean
  onAddToCart: () => void
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={100}
          height={100}
          className="w-full h-32 object-contain p-2"
        />
        <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7 rounded-full bg-background/80">
          <Heart className="h-4 w-4" />
        </Button>
        {prescription && <Badge className="absolute top-1 left-1 bg-blue-500">Rx</Badge>}
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium text-sm line-clamp-1">{name}</h3>
        <p className="font-bold">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button variant="outline" size="sm" className="w-full rounded-full text-xs" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

function FeaturedProductCard({
  name,
  description,
  image,
  price,
  discount,
  onAddToCart,
}: {
  name: string
  description: string
  image: string
  price: number
  discount: number
  onAddToCart: () => void
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={300}
          height={150}
          className="w-full h-40 object-cover"
        />
        {discount > 0 && <Badge className="absolute top-2 right-2 bg-red-500">Save {discount}%</Badge>}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <div className="flex items-center gap-2">
          <p className="font-bold">${price.toFixed(2)}</p>
          {discount > 0 && (
            <p className="text-sm line-through text-muted-foreground">${(price / (1 - discount / 100)).toFixed(2)}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full rounded-full" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

