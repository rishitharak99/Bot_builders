import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, Pill, User } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger />
        <div className="font-semibold">Profile</div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="John Doe" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold">John Doe</h1>
                    <p className="text-muted-foreground">Patient ID: P-12345678</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        Male
                      </span>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        45 years old
                      </span>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        Blood Type: O+
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="medical" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Medical History</span>
              </TabsTrigger>
              <TabsTrigger value="medications" className="flex items-center gap-2">
                <Pill className="h-4 w-4" />
                <span>Medications</span>
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Appointments</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your basic personal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <dt className="font-medium">Full Name</dt>
                        <dd className="text-muted-foreground">John Doe</dd>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <dt className="font-medium">Date of Birth</dt>
                        <dd className="text-muted-foreground">January 15, 1980</dd>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <dt className="font-medium">Gender</dt>
                        <dd className="text-muted-foreground">Male</dd>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <dt className="font-medium">Email</dt>
                        <dd className="text-muted-foreground">john.doe@example.com</dd>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <dt className="font-medium">Phone</dt>
                        <dd className="text-muted-foreground">(555) 123-4567</dd>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <dt className="font-medium">Address</dt>
                        <dd className="text-muted-foreground">123 Main St, Anytown, CA 12345</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                    <CardDescription>Your emergency contact information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <dt className="font-medium">Name</dt>
                        <dd className="text-muted-foreground">Jane Doe</dd>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <dt className="font-medium">Relationship</dt>
                        <dd className="text-muted-foreground">Spouse</dd>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <dt className="font-medium">Phone</dt>
                        <dd className="text-muted-foreground">(555) 987-6543</dd>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <dt className="font-medium">Email</dt>
                        <dd className="text-muted-foreground">jane.doe@example.com</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="medical">
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                  <CardDescription>Your medical history and conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Chronic Conditions</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Hypertension (diagnosed 2018)</li>
                        <li>Type 2 Diabetes (diagnosed 2019)</li>
                        <li>High Cholesterol (diagnosed 2018)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Allergies</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Penicillin - Severe reaction</li>
                        <li>Peanuts - Mild reaction</li>
                        <li>Dust mites - Seasonal allergies</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Surgeries</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Appendectomy (2010)</li>
                        <li>Knee arthroscopy (2015)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Family Medical History</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Father: Hypertension, Heart Disease</li>
                        <li>Mother: Type 2 Diabetes</li>
                        <li>Sibling: No significant conditions</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Immunizations</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Influenza - Yearly (Last: Oct 2024)</li>
                        <li>Tetanus - Every 10 years (Last: 2020)</li>
                        <li>COVID-19 - Complete series + booster (Last: 2024)</li>
                        <li>Pneumonia - Once (2022)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medications">
              <Card>
                <CardHeader>
                  <CardTitle>Current Medications</CardTitle>
                  <CardDescription>Your prescribed medications and supplements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Lisinopril 10mg</h3>
                          <p className="text-sm text-muted-foreground">For hypertension</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">1 tablet daily</p>
                          <p className="text-xs text-muted-foreground">Morning with food</p>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <p>Prescribed by: Dr. Sarah Smith</p>
                        <p>Started: January 2023</p>
                        <p>Refills remaining: 3</p>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Metformin 500mg</h3>
                          <p className="text-sm text-muted-foreground">For type 2 diabetes</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">1 tablet twice daily</p>
                          <p className="text-xs text-muted-foreground">With breakfast and dinner</p>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <p>Prescribed by: Dr. Michael Chen</p>
                        <p>Started: March 2023</p>
                        <p>Refills remaining: 2</p>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Atorvastatin 20mg</h3>
                          <p className="text-sm text-muted-foreground">For high cholesterol</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">1 tablet daily</p>
                          <p className="text-xs text-muted-foreground">Evening</p>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <p>Prescribed by: Dr. Sarah Smith</p>
                        <p>Started: February 2023</p>
                        <p>Refills remaining: 1</p>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Multivitamin</h3>
                          <p className="text-sm text-muted-foreground">Supplement</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">1 tablet daily</p>
                          <p className="text-xs text-muted-foreground">Morning with food</p>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <p>Recommended by: Dr. Sarah Smith</p>
                        <p>Started: January 2023</p>
                        <p>Over-the-counter</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment History</CardTitle>
                  <CardDescription>Your past and upcoming appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Upcoming Appointments</h3>
                      <div className="space-y-3">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Dr. Sarah Smith</h4>
                              <p className="text-sm text-muted-foreground">Primary Care Physician</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">March 31, 2025</p>
                              <p className="text-xs text-muted-foreground">2:30 PM - 3:00 PM</p>
                            </div>
                          </div>
                          <p className="mt-2 text-sm">Annual Check-up</p>
                          <div className="mt-2 flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                            <Button size="sm" variant="outline">
                              Cancel
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Dr. Michael Chen</h4>
                              <p className="text-sm text-muted-foreground">Cardiologist</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">April 3, 2025</p>
                              <p className="text-xs text-muted-foreground">10:00 AM - 10:45 AM</p>
                            </div>
                          </div>
                          <p className="mt-2 text-sm">Follow-up Consultation</p>
                          <div className="mt-2 flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                            <Button size="sm" variant="outline">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Past Appointments</h3>
                      <div className="space-y-3">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Dr. Sarah Smith</h4>
                              <p className="text-sm text-muted-foreground">Primary Care Physician</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">January 15, 2025</p>
                              <p className="text-xs text-muted-foreground">9:00 AM - 9:30 AM</p>
                            </div>
                          </div>
                          <p className="mt-2 text-sm">Quarterly Check-up</p>
                          <div className="mt-2 flex justify-end">
                            <Button size="sm" variant="outline">
                              View Summary
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Dr. Anita Patel</h4>
                              <p className="text-sm text-muted-foreground">Endocrinologist</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">December 10, 2024</p>
                              <p className="text-xs text-muted-foreground">1:15 PM - 2:00 PM</p>
                            </div>
                          </div>
                          <p className="mt-2 text-sm">Diabetes Management</p>
                          <div className="mt-2 flex justify-end">
                            <Button size="sm" variant="outline">
                              View Summary
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

