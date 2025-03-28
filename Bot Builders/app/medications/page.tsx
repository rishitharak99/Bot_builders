import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MedicationsPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">My Medications</h1>
        <Button size="icon" className="ml-auto rounded-full" asChild>
          <Link href="/medications/add">
            <Plus className="h-5 w-5" />
            <span className="sr-only">Add Medication</span>
          </Link>
        </Button>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search medications..." className="pl-10 rounded-full" />
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-4">
          <MedicationCard
            name="Lisinopril"
            dosage="10mg"
            frequency="Once daily"
            time="8:00 AM"
            instructions="Take with food"
            color="bg-blue-100"
            icon="💊"
            price={12.99}
          />
          <MedicationCard
            name="Metformin"
            dosage="500mg"
            frequency="Twice daily"
            time="8:00 AM, 8:00 PM"
            instructions="Take with meals"
            color="bg-purple-100"
            icon="💊"
            price={15.5}
          />
          <MedicationCard
            name="Atorvastatin"
            dosage="20mg"
            frequency="Once daily"
            time="8:00 PM"
            instructions="Take in the evening"
            color="bg-amber-100"
            icon="💊"
            price={18.75}
          />
          <MedicationCard
            name="Aspirin"
            dosage="81mg"
            frequency="Once daily"
            time="8:00 AM"
            instructions="Take with food"
            color="bg-green-100"
            icon="💊"
            price={8.25}
            status="inactive"
          />
        </TabsContent>
        <TabsContent value="active" className="mt-4 space-y-4">
          <MedicationCard
            name="Lisinopril"
            dosage="10mg"
            frequency="Once daily"
            time="8:00 AM"
            instructions="Take with food"
            color="bg-blue-100"
            icon="💊"
            price={12.99}
          />
          <MedicationCard
            name="Metformin"
            dosage="500mg"
            frequency="Twice daily"
            time="8:00 AM, 8:00 PM"
            instructions="Take with meals"
            color="bg-purple-100"
            icon="💊"
            price={15.5}
          />
          <MedicationCard
            name="Atorvastatin"
            dosage="20mg"
            frequency="Once daily"
            time="8:00 PM"
            instructions="Take in the evening"
            color="bg-amber-100"
            icon="💊"
            price={18.75}
          />
        </TabsContent>
        <TabsContent value="inactive" className="mt-4 space-y-4">
          <MedicationCard
            name="Aspirin"
            dosage="81mg"
            frequency="Once daily"
            time="8:00 AM"
            instructions="Take with food"
            color="bg-green-100"
            icon="💊"
            price={8.25}
            status="inactive"
          />
        </TabsContent>
      </Tabs>

      <Button className="w-full rounded-full" asChild>
        <Link href="/medications/add">Add New Medication</Link>
      </Button>
    </div>
  )
}

function MedicationCard({
  name,
  dosage,
  frequency,
  time,
  instructions,
  color,
  icon,
  price,
  status = "active",
}: {
  name: string
  dosage: string
  frequency: string
  time: string
  instructions: string
  color: string
  icon: string
  price: number
  status?: "active" | "inactive"
}) {
  return (
    <Link href={`/medications/${name.toLowerCase()}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex">
          <div className={`${color} w-12 h-full flex items-center justify-center`}>
            <span className="text-xl">{icon}</span>
          </div>
          <CardContent className="p-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-lg">{name}</h3>
                  {status === "inactive" && (
                    <Badge variant="outline" className="text-muted-foreground">
                      Inactive
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{dosage}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">${price.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{frequency}</p>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-xs text-muted-foreground">{instructions}</p>
              <p className="text-xs text-muted-foreground">{time}</p>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}

