import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, Star } from "lucide-react"

export default function PharmacyPage() {
  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger />
        <div className="font-semibold">Online Pharmacy</div>
        <div className="relative ml-auto flex items-center">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Online Pharmacy</h1>
              <p className="text-muted-foreground">Purchase medications and health products online</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-9 w-full sm:w-[300px]" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Medication"
                  className="h-48 w-full object-cover rounded-md"
                />
                <CardTitle className="mt-4">Lisinopril 10mg</CardTitle>
                <div className="flex items-center">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">(42 reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Generic prescription medication for high blood pressure</p>
                <p className="mt-2 text-lg font-bold">$12.99</p>
                <p className="text-xs text-muted-foreground">30 tablets</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Medication"
                  className="h-48 w-full object-cover rounded-md"
                />
                <CardTitle className="mt-4">Multivitamin Daily</CardTitle>
                <div className="flex items-center">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">(78 reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Complete daily multivitamin with minerals</p>
                <p className="mt-2 text-lg font-bold">$15.99</p>
                <p className="text-xs text-muted-foreground">90 tablets</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Medication"
                  className="h-48 w-full object-cover rounded-md"
                />
                <CardTitle className="mt-4">Digital Blood Pressure Monitor</CardTitle>
                <div className="flex items-center">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">(36 reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Automatic digital blood pressure monitor for home use</p>
                <p className="mt-2 text-lg font-bold">$49.99</p>
                <p className="text-xs text-muted-foreground">Includes batteries</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Medication"
                  className="h-48 w-full object-cover rounded-md"
                />
                <CardTitle className="mt-4">Metformin 500mg</CardTitle>
                <div className="flex items-center">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">(51 reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Generic prescription medication for type 2 diabetes</p>
                <p className="mt-2 text-lg font-bold">$9.99</p>
                <p className="text-xs text-muted-foreground">60 tablets</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Medication"
                  className="h-48 w-full object-cover rounded-md"
                />
                <CardTitle className="mt-4">First Aid Kit</CardTitle>
                <div className="flex items-center">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">(92 reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Complete first aid kit for home and travel</p>
                <p className="mt-2 text-lg font-bold">$24.99</p>
                <p className="text-xs text-muted-foreground">215 pieces</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Medication"
                  className="h-48 w-full object-cover rounded-md"
                />
                <CardTitle className="mt-4">Vitamin D3 5000 IU</CardTitle>
                <div className="flex items-center">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">(63 reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">High-potency vitamin D3 supplement</p>
                <p className="mt-2 text-lg font-bold">$18.99</p>
                <p className="text-xs text-muted-foreground">120 softgels</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" className="mx-2">
              Previous
            </Button>
            <Button variant="outline" className="mx-2">
              1
            </Button>
            <Button className="mx-2">2</Button>
            <Button variant="outline" className="mx-2">
              3
            </Button>
            <Button variant="outline" className="mx-2">
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

