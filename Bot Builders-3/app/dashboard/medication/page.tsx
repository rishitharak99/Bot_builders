import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pill, Clock, Bell, Plus } from "lucide-react"

export default function MedicationPage() {
  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger />
        <div className="font-semibold">Medication Tracker</div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Your Medications</h1>
              <p className="text-muted-foreground">Track and manage your prescriptions</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Plus className="mr-2 h-4 w-4" /> Add Medication
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                <div className="flex items-center justify-between">
                  <CardTitle>Lisinopril</CardTitle>
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-800">
                    <Pill className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  </div>
                </div>
                <CardDescription>10mg tablet</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">8:00 AM, 8:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Reminders enabled</span>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-medium">Refill in 12 days</div>
                    <div className="mt-1 h-2 w-full rounded-full bg-blue-100">
                      <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Refill
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                <div className="flex items-center justify-between">
                  <CardTitle>Metformin</CardTitle>
                  <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-800">
                    <Pill className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                  </div>
                </div>
                <CardDescription>500mg tablet</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">With breakfast and dinner</span>
                  </div>
                  <div className="flex items-center">
                    <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Reminders enabled</span>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-medium">Refill in 5 days</div>
                    <div className="mt-1 h-2 w-full rounded-full bg-purple-100">
                      <div className="h-2 w-1/4 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Refill
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                <div className="flex items-center justify-between">
                  <CardTitle>Atorvastatin</CardTitle>
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-800">
                    <Pill className="h-4 w-4 text-green-600 dark:text-green-300" />
                  </div>
                </div>
                <CardDescription>20mg tablet</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">9:00 PM daily</span>
                  </div>
                  <div className="flex items-center">
                    <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Reminders enabled</span>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-medium">Refill in 20 days</div>
                    <div className="mt-1 h-2 w-full rounded-full bg-green-100">
                      <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Refill
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Medication Schedule</CardTitle>
              <CardDescription>Your medication schedule for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Pill className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Lisinopril 10mg</p>
                      <p className="text-sm text-muted-foreground">1 tablet</p>
                    </div>
                  </div>
                  <div className="text-sm">8:00 AM</div>
                  <Button size="sm" variant="outline" className="ml-4">
                    Taken
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-purple-100 p-2">
                      <Pill className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Metformin 500mg</p>
                      <p className="text-sm text-muted-foreground">1 tablet</p>
                    </div>
                  </div>
                  <div className="text-sm">8:00 AM</div>
                  <Button size="sm" variant="outline" className="ml-4">
                    Taken
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-purple-100 p-2">
                      <Pill className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Metformin 500mg</p>
                      <p className="text-sm text-muted-foreground">1 tablet</p>
                    </div>
                  </div>
                  <div className="text-sm">6:00 PM</div>
                  <Button size="sm" className="ml-4">
                    Take
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Pill className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Lisinopril 10mg</p>
                      <p className="text-sm text-muted-foreground">1 tablet</p>
                    </div>
                  </div>
                  <div className="text-sm">8:00 PM</div>
                  <Button size="sm" className="ml-4">
                    Take
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-green-100 p-2">
                      <Pill className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Atorvastatin 20mg</p>
                      <p className="text-sm text-muted-foreground">1 tablet</p>
                    </div>
                  </div>
                  <div className="text-sm">9:00 PM</div>
                  <Button size="sm" className="ml-4">
                    Take
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

